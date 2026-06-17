package talent.endorsco.app.whitelist;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import talent.endorsco.app.config.TelegramNotificationService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class WhitelistController {

    private final WhitelistService whitelistService;
    private final TelegramNotificationService telegramNotificationService;
    private final ObjectMapper objectMapper;

    public WhitelistController(WhitelistService whitelistService, TelegramNotificationService telegramNotificationService, ObjectMapper objectMapper) {
        this.whitelistService = whitelistService;
        this.telegramNotificationService = telegramNotificationService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/whitelist")
    public ResponseEntity<Map<String, String>> submitWhitelist(@RequestBody Map<String, Object> requestData) {
        try {
            String name = null;
            String email = null;
            String phone = null;
            String locationString = null;
            String locationObject = null;

            // Helper method to safely get string values
            java.util.function.Function<Object, String> getString = obj -> {
                if (obj == null) return null;
                String str = obj.toString().trim();
                return str.isEmpty() ? null : str;
            };

            name = getString.apply(requestData.get("name"));
            email = getString.apply(requestData.get("email"));
            phone = getString.apply(requestData.get("phone"));

            Object loc = requestData.get("location");
            if (loc != null) {
                if (loc instanceof Map) {
                    locationObject = objectMapper.writeValueAsString(loc);
                } else {
                    locationString = getString.apply(loc);
                }
            }

            // Validation
            if (name == null || email == null || phone == null) {
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
