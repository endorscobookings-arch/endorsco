package talent.endorsco.app.whitelist;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import talent.endorsco.app.config.TelegramNotificationService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class WhitelistController {

    private final WhitelistService whitelistService;
    private final TelegramNotificationService telegramNotificationService;

    public WhitelistController(WhitelistService whitelistService, TelegramNotificationService telegramNotificationService) {
        this.whitelistService = whitelistService;
        this.telegramNotificationService = telegramNotificationService;
    }

    @PostMapping("/whitelist")
    public ResponseEntity<Map<String, String>> submitWhitelist(HttpServletRequest request) {
        try {
            String payload = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            
            JsonFactory factory = new JsonFactory();
            JsonParser parser = factory.createParser(payload);
            
            String name = null;
            String email = null;
            String phone = null;
            String locationString = null;
            String locationObject = null;
            
            ObjectMapper mapper = new ObjectMapper();

            while (!parser.isClosed()) {
                JsonToken jsonToken = parser.nextToken();
                if (jsonToken == null) {
                    break;
                }
                if (JsonToken.FIELD_NAME.equals(jsonToken)) {
                    String fieldName = parser.getCurrentName();
                    jsonToken = parser.nextToken(); // move to value
                    
                    if ("name".equals(fieldName)) {
                        if (jsonToken == JsonToken.START_OBJECT || jsonToken == JsonToken.START_ARRAY) {
                            parser.skipChildren();
                        } else {
                            name = parser.getValueAsString();
                        }
                    } else if ("email".equals(fieldName)) {
                        if (jsonToken == JsonToken.START_OBJECT || jsonToken == JsonToken.START_ARRAY) {
                            parser.skipChildren();
                        } else {
                            email = parser.getValueAsString();
                        }
                    } else if ("phone".equals(fieldName)) {
                        if (jsonToken == JsonToken.START_OBJECT || jsonToken == JsonToken.START_ARRAY) {
                            parser.skipChildren();
                        } else {
                            phone = parser.getValueAsString();
                        }
                    } else if ("location".equals(fieldName)) {
                        if (jsonToken == JsonToken.START_OBJECT) {
                            JsonNode node = mapper.readTree(parser);
                            locationObject = node.toString();
                        } else if (jsonToken == JsonToken.START_ARRAY) {
                            parser.skipChildren();
                        } else {
                            locationString = parser.getValueAsString();
                        }
                    } else {
                        // Skip unhandled objects/arrays so we don't break parsing
                        if (jsonToken == JsonToken.START_OBJECT || jsonToken == JsonToken.START_ARRAY) {
                            parser.skipChildren();
                        }
                    }
                }
            }
            
            // Validation
            if (name == null || name.trim().isEmpty() || 
                email == null || email.trim().isEmpty() || 
                phone == null || phone.trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "name, email, and phone are required fields.");
                return ResponseEntity.badRequest().body(error);
            }
            
            if (!email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid email format.");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Save to DB
            Whitelist whitelist = new Whitelist();
            whitelist.setName(name);
            whitelist.setEmail(email);
            whitelist.setPhone(phone);
            whitelist.setLocationString(locationString);
            whitelist.setLocationObject(locationObject);
            
            whitelistService.saveWhitelist(whitelist);
            
            // Send Notification
            sendTelegramNotification(whitelist);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Successfully joined the whitelist");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Internal Server Error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    private void sendTelegramNotification(Whitelist whitelist) {
        StringBuilder sb = new StringBuilder();
        sb.append("🎉 New Birthday Whitelist Application\n\n");
        sb.append("Name: ").append(whitelist.getName()).append("\n");
        sb.append("Email: ").append(whitelist.getEmail()).append("\n");
        sb.append("Phone: ").append(whitelist.getPhone()).append("\n");
        
        if (whitelist.getLocationString() != null) {
            sb.append("Location: ").append(whitelist.getLocationString()).append("\n");
        }
        if (whitelist.getLocationObject() != null) {
            sb.append("Coordinates: ").append(whitelist.getLocationObject()).append("\n");
        }
        
        telegramNotificationService.sendMessage(sb.toString());
    }
}
