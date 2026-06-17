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
    public ResponseEntity<Map<String, String>> submitWhitelist(@RequestBody WhitelistDTO dto) {
        try {
            // Validation
            if (dto.getName() == null || dto.getEmail() == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "name and email are required fields.");
                return ResponseEntity.badRequest().body(error);
            }

            if (!dto.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid email format.");
                return ResponseEntity.badRequest().body(error);
            }

            // Save to DB
            Whitelist whitelist = new Whitelist();
            whitelist.setName(dto.getName());
            whitelist.setEmail(dto.getEmail());
            whitelist.setPhone(dto.getPhone());
            
            if (dto.getLocation() != null) {
                whitelist.setLocationString(objectMapper.writeValueAsString(dto.getLocation()));
            }

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
