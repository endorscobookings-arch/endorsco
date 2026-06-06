package talent.endorsco.app.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class TelegramNotificationService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${telegram.bot-token:}")
    private String botToken;

    @Value("${telegram.chat-id:}")
    private String chatId;

    public void sendMessage(String message) {
        // If bot token or chat id are not set, don't send message
        if (botToken == null || botToken.trim().isEmpty() || chatId == null || chatId.trim().isEmpty()) {
            System.out.println("Telegram credentials not set, skipping notification: " + message);
            return;
        }
        
        // Ensure message is never empty
        if (message == null || message.trim().isEmpty()) {
            message = "<b>New notification received!</b>\nNo details were provided.";
        }
        
        try {
            // URL encode the message to handle special characters
            String encodedMessage = URLEncoder.encode(message, StandardCharsets.UTF_8.toString());
            
            String url = String.format(
                    "https://api.telegram.org/bot%s/sendMessage?chat_id=%s&parse_mode=HTML&text=%s",
                    botToken,
                    chatId,
                    encodedMessage
            );
            
            restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String escapeHtml(String text) {
        if (text == null) return "";
        return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
    }

    public String formatBookingRequestMessage(talent.endorsco.app.booking.BookingRequestDTO dto) {
        StringBuilder sb = new StringBuilder();
        sb.append("<b>🎫 New Booking Request</b>\n\n");
        
        boolean hasContent = false;
        String name = dto.getName() != null ? dto.getName() : 
                     (dto.getFirstName() != null || dto.getLastName() != null ? 
                      (dto.getFirstName() != null ? dto.getFirstName() : "") + " " + 
                      (dto.getLastName() != null ? dto.getLastName() : "") : null);
        if (name != null && !name.trim().isEmpty()) {
            sb.append("<b>Name:</b> ").append(escapeHtml(name.trim())).append("\n");
            hasContent = true;
        }
        if (dto.getEmail() != null && !dto.getEmail().trim().isEmpty()) {
            sb.append("<b>Email:</b> ").append(escapeHtml(dto.getEmail().trim())).append("\n");
            hasContent = true;
        }
        if (dto.getPhone() != null && !dto.getPhone().trim().isEmpty()) {
            sb.append("<b>Phone:</b> ").append(escapeHtml(dto.getPhone().trim())).append("\n");
            hasContent = true;
        }
        if (dto.getOrganization() != null && !dto.getOrganization().trim().isEmpty()) {
            sb.append("<b>Organization:</b> ").append(escapeHtml(dto.getOrganization().trim())).append("\n");
            hasContent = true;
        }
        String desiredSpeaker = dto.getDesiredSpeaker() != null ? dto.getDesiredSpeaker() : dto.getPreferredSpeakers();
        if (desiredSpeaker != null && !desiredSpeaker.trim().isEmpty()) {
            sb.append("<b>Desired Speaker:</b> ").append(escapeHtml(desiredSpeaker.trim())).append("\n");
            hasContent = true;
        }
        if (dto.getEventType() != null && !dto.getEventType().trim().isEmpty()) {
            sb.append("<b>Event Type:</b> ").append(escapeHtml(dto.getEventType().trim())).append("\n");
            hasContent = true;
        }
        if (dto.getEventDate() != null && !dto.getEventDate().trim().isEmpty()) {
            sb.append("<b>Event Date:</b> ").append(escapeHtml(dto.getEventDate().trim())).append("\n");
            hasContent = true;
        }
        if (dto.getEventLocation() != null && !dto.getEventLocation().trim().isEmpty()) {
            sb.append("<b>Event Location:</b> ").append(escapeHtml(dto.getEventLocation().trim())).append("\n");
            hasContent = true;
        }
        if (dto.getBudget() != null && !dto.getBudget().trim().isEmpty()) {
            sb.append("<b>Budget:</b> ").append(escapeHtml(dto.getBudget().trim())).append("\n");
            hasContent = true;
        }
        if (dto.getEventDescription() != null && !dto.getEventDescription().trim().isEmpty()) {
            sb.append("\n<b>Event Description:</b>\n").append(escapeHtml(dto.getEventDescription().trim()));
            hasContent = true;
        }
        
        // If no content, add fallback
        if (!hasContent) {
            sb.append("A booking request was received, but no details were provided.");
        }
        
        return sb.toString();
    }

    public String formatContactInquiryMessage(talent.endorsco.app.booking.ContactInquiryDTO dto) {
        StringBuilder sb = new StringBuilder();
        sb.append("<b>📩 New Contact Inquiry</b>\n\n");
        
        boolean hasContent = false;
        if (dto.getName() != null && !dto.getName().trim().isEmpty()) {
            sb.append("<b>Name:</b> ").append(escapeHtml(dto.getName().trim())).append("\n");
            hasContent = true;
        }
        if (dto.getEmail() != null && !dto.getEmail().trim().isEmpty()) {
            sb.append("<b>Email:</b> ").append(escapeHtml(dto.getEmail().trim())).append("\n");
            hasContent = true;
        }
        if (dto.getTopic() != null && !dto.getTopic().trim().isEmpty()) {
            sb.append("<b>Topic:</b> ").append(escapeHtml(dto.getTopic().trim())).append("\n");
            hasContent = true;
        }
        if (dto.getMessage() != null && !dto.getMessage().trim().isEmpty()) {
            sb.append("\n<b>Message:</b>\n").append(escapeHtml(dto.getMessage().trim()));
            hasContent = true;
        }
        
        // If no content, add fallback
        if (!hasContent) {
            sb.append("A contact inquiry was received, but no details were provided.");
        }
        
        return sb.toString();
    }
}
