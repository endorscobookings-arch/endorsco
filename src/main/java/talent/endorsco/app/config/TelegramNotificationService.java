package talent.endorsco.app.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class TelegramNotificationService {

    private final RestTemplate restTemplate = new RestTemplate();
    
    @Autowired
    private ObjectMapper objectMapper;

    @Value("${telegram.bot-token:}")
    private String botToken;

    @Value("${telegram.chat-id:}")
    private String chatId;

    public void sendMessage(String message) {
        // Log all data to console first
        System.out.println("===== PREPARING TO SEND TELEGRAM MESSAGE =====");
        System.out.println("Message:");
        System.out.println(message);
        System.out.println("============================================");

        // If bot token or chat id are not set, don't send message
        if (botToken == null || botToken.trim().isEmpty() || chatId == null || chatId.trim().isEmpty()) {
            System.out.println("Telegram credentials not set, skipping notification.");
            return;
        }
        
        // Ensure message is never empty
        if (message == null || message.trim().isEmpty()) {
            message = "New notification received!\nNo details were provided.";
        }
        
        try {
            String url = String.format("https://api.telegram.org/bot%s/sendMessage", botToken);

            Map<String, Object> payload = new HashMap<>();
            payload.put("chat_id", chatId);
            payload.put("text", message);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);
            restTemplate.postForObject(url, request, String.class);
            System.out.println("Telegram message sent successfully!");
        } catch (Exception e) {
            System.err.println("Error sending Telegram message:");
            e.printStackTrace();
        }
    }

    public String formatBookingRequestMessage(talent.endorsco.app.booking.BookingRequestDTO dto) {
        // Log the entire DTO as JSON
        try {
            System.out.println("===== BOOKING REQUEST DTO =====");
            System.out.println(objectMapper.writeValueAsString(dto));
            System.out.println("===============================");
        } catch (Exception e) {
            System.err.println("Error logging DTO:");
            e.printStackTrace();
        }

        StringBuilder sb = new StringBuilder();
        sb.append("🎫 New Booking Request\n\n");
        
        boolean hasContent = false;
        String name = dto.getName() != null ? dto.getName() : 
                     (dto.getFirstName() != null || dto.getLastName() != null ? 
                      (dto.getFirstName() != null ? dto.getFirstName() : "") + " " + 
                      (dto.getLastName() != null ? dto.getLastName() : "") : null);
        if (name != null && !name.trim().isEmpty()) {
            sb.append("Name: ").append(name.trim()).append("\n");
            hasContent = true;
        }
        if (dto.getEmail() != null && !dto.getEmail().trim().isEmpty()) {
            sb.append("Email: ").append(dto.getEmail().trim()).append("\n");
            hasContent = true;
        }
        if (dto.getPhone() != null && !dto.getPhone().trim().isEmpty()) {
            sb.append("Phone: ").append(dto.getPhone().trim()).append("\n");
            hasContent = true;
        }
        if (dto.getOrganization() != null && !dto.getOrganization().trim().isEmpty()) {
            sb.append("Organization: ").append(dto.getOrganization().trim()).append("\n");
            hasContent = true;
        }
        String desiredSpeaker = dto.getDesiredSpeaker() != null ? dto.getDesiredSpeaker() : dto.getPreferredSpeakers();
        if (desiredSpeaker != null && !desiredSpeaker.trim().isEmpty()) {
            sb.append("Desired Speaker: ").append(desiredSpeaker.trim()).append("\n");
            hasContent = true;
        }
        if (dto.getEventType() != null && !dto.getEventType().trim().isEmpty()) {
            sb.append("Event Type: ").append(dto.getEventType().trim()).append("\n");
            hasContent = true;
        }
        if (dto.getEventDate() != null && !dto.getEventDate().trim().isEmpty()) {
            sb.append("Event Date: ").append(dto.getEventDate().trim()).append("\n");
            hasContent = true;
        }
        if (dto.getEventLocation() != null && !dto.getEventLocation().trim().isEmpty()) {
            sb.append("Event Location: ").append(dto.getEventLocation().trim()).append("\n");
            hasContent = true;
        }
        if (dto.getBudget() != null && !dto.getBudget().trim().isEmpty()) {
            sb.append("Budget: ").append(dto.getBudget().trim()).append("\n");
            hasContent = true;
        }
        if (dto.getEventDescription() != null && !dto.getEventDescription().trim().isEmpty()) {
            sb.append("\nEvent Description:\n").append(dto.getEventDescription().trim());
            hasContent = true;
        }
        
        // If no content, add fallback
        if (!hasContent) {
            sb.append("A booking request was received, but no details were provided.");
        }
        
        return sb.toString();
    }

    public String formatContactInquiryMessage(talent.endorsco.app.booking.ContactInquiryDTO dto) {
        // Log the entire DTO as JSON
        try {
            System.out.println("===== CONTACT INQUIRY DTO =====");
            System.out.println(objectMapper.writeValueAsString(dto));
            System.out.println("================================");
        } catch (Exception e) {
            System.err.println("Error logging DTO:");
            e.printStackTrace();
        }

        StringBuilder sb = new StringBuilder();
        sb.append("📩 New Contact Inquiry\n\n");
        
        boolean hasContent = false;
        if (dto.getName() != null && !dto.getName().trim().isEmpty()) {
            sb.append("Name: ").append(dto.getName().trim()).append("\n");
            hasContent = true;
        }
        if (dto.getEmail() != null && !dto.getEmail().trim().isEmpty()) {
            sb.append("Email: ").append(dto.getEmail().trim()).append("\n");
            hasContent = true;
        }
        if (dto.getTopic() != null && !dto.getTopic().trim().isEmpty()) {
            sb.append("Topic: ").append(dto.getTopic().trim()).append("\n");
            hasContent = true;
        }
        if (dto.getMessage() != null && !dto.getMessage().trim().isEmpty()) {
            sb.append("\nMessage:\n").append(dto.getMessage().trim());
            hasContent = true;
        }
        
        // If no content, add fallback
        if (!hasContent) {
            sb.append("A contact inquiry was received, but no details were provided.");
        }
        
        return sb.toString();
    }
}
