package talent.endorsco.app.booking;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import talent.endorsco.app.config.TelegramNotificationService;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BookingRequestController {

    private final BookingRequestService bookingRequestService;
    private final ContactInquiryService contactInquiryService;
    private final ObjectMapper objectMapper;
    private final TelegramNotificationService telegramService;

    public BookingRequestController(BookingRequestService bookingRequestService,
                                    ContactInquiryService contactInquiryService,
                                    ObjectMapper objectMapper,
                                    TelegramNotificationService telegramService) {
        this.bookingRequestService = bookingRequestService;
        this.contactInquiryService = contactInquiryService;
        this.objectMapper = objectMapper;
        this.telegramService = telegramService;
    }

    // Helper method to convert object to JSON string
    private String toJsonString(Object obj) {
        if (obj == null) return null;
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    // Convert DTO to BookingRequest entity
    private BookingRequest toBookingRequestEntity(BookingRequestDTO dto) {
        BookingRequest entity = new BookingRequest();
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setOrganization(dto.getOrganization());
        entity.setEventLocation(dto.getEventLocation());
        entity.setBudget(dto.getBudget());
        if (dto.getEventDate() != null) {
            entity.setEventDate(LocalDate.parse(dto.getEventDate()));
        }
        entity.setDesiredSpeaker(dto.getDesiredSpeaker() != null ? dto.getDesiredSpeaker() : dto.getPreferredSpeakers());
        entity.setEventDescription(dto.getEventDescription());
        entity.setEventType(dto.getEventType());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setDeviceInfo(toJsonString(dto.getDevice()));
        entity.setLocationInfo(toJsonString(dto.getLocation()));
        entity.setIpAddress(dto.getIp());
        return entity;
    }

    // Convert DTO to ContactInquiry entity
    private ContactInquiry toContactInquiryEntity(ContactInquiryDTO dto) {
        ContactInquiry entity = new ContactInquiry();
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setTopic(dto.getTopic());
        entity.setMessage(dto.getMessage());
        entity.setDeviceInfo(toJsonString(dto.getDevice()));
        entity.setLocationInfo(toJsonString(dto.getLocation()));
        entity.setIpAddress(dto.getIp());
        return entity;
    }

    // Endpoint for Index/Talent Modal Form
    @PostMapping("/booking-requests/modal")
    public ResponseEntity<BookingRequest> submitModalForm(@RequestBody BookingRequestDTO dto) {
        BookingRequest entity = toBookingRequestEntity(dto);
        BookingRequest saved = bookingRequestService.saveBookingRequest(entity);
        telegramService.sendMessage(telegramService.formatBookingRequestMessage(dto));
        return ResponseEntity.ok(saved);
    }

    // Endpoint for Booking Form (booking.html)
    @PostMapping("/booking-requests/booking")
    public ResponseEntity<BookingRequest> submitBookingForm(@RequestBody BookingRequestDTO dto) {
        BookingRequest entity = toBookingRequestEntity(dto);
        BookingRequest saved = bookingRequestService.saveBookingRequest(entity);
        telegramService.sendMessage(telegramService.formatBookingRequestMessage(dto));
        return ResponseEntity.ok(saved);
    }

    // Endpoint for Contact Form (contact.html)
    @PostMapping("/contact-inquiries")
    public ResponseEntity<ContactInquiry> submitContactForm(@RequestBody ContactInquiryDTO dto) {
        ContactInquiry entity = toContactInquiryEntity(dto);
        ContactInquiry saved = contactInquiryService.saveContactInquiry(entity);
        telegramService.sendMessage(telegramService.formatContactInquiryMessage(dto));
        return ResponseEntity.ok(saved);
    }

    // Endpoint for Booking Request Form (booking-request.html)
    @PostMapping("/booking-requests/booking-request")
    public ResponseEntity<BookingRequest> submitBookingRequestForm(@RequestBody BookingRequestDTO dto) {
        BookingRequest entity = toBookingRequestEntity(dto);
        BookingRequest saved = bookingRequestService.saveBookingRequest(entity);
        telegramService.sendMessage(telegramService.formatBookingRequestMessage(dto));
        return ResponseEntity.ok(saved);
    }

    // Get all booking requests
    @GetMapping("/booking-requests")
    public ResponseEntity<List<BookingRequest>> getAllBookingRequests() {
        return ResponseEntity.ok(bookingRequestService.getAllBookingRequests());
    }

    // Get a single booking request by ID
    @GetMapping("/booking-requests/{id}")
    public ResponseEntity<BookingRequest> getBookingRequestById(@PathVariable Long id) {
        BookingRequest request = bookingRequestService.getBookingRequestById(id);
        if (request == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(request);
    }

    // Get all contact inquiries
    @GetMapping("/contact-inquiries")
    public ResponseEntity<List<ContactInquiry>> getAllContactInquiries() {
        return ResponseEntity.ok(contactInquiryService.getAllContactInquiries());
    }

    // Get a single contact inquiry by ID
    @GetMapping("/contact-inquiries/{id}")
    public ResponseEntity<ContactInquiry> getContactInquiryById(@PathVariable Long id) {
        ContactInquiry inquiry = contactInquiryService.getContactInquiryById(id);
        if (inquiry == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(inquiry);
    }

    // Check availability endpoint - sends notification to Telegram
    @PostMapping("/check-availability")
    public ResponseEntity<Map<String, String>> checkAvailability(@RequestBody Map<String, Object> requestData) {
        // Log all data to console first
        try {
            System.out.println("===== AVAILABILITY CHECK REQUEST =====");
            System.out.println(objectMapper.writeValueAsString(requestData));
            System.out.println("======================================");
        } catch (Exception e) {
            System.err.println("Error logging request data:");
            e.printStackTrace();
        }

        StringBuilder message = new StringBuilder();
        message.append("🔍 Availability Check Request\n\n");
        
        // Helper method to safely get string values
        java.util.function.Function<Object, String> getString = obj -> {
            if (obj == null) return null;
            String str = obj.toString().trim();
            return str.isEmpty() ? null : str;
        };
        
        boolean hasContent = false;
        String talentId = getString.apply(requestData.get("talentId"));
        if (talentId != null) {
            message.append("Talent ID: ").append(talentId).append("\n");
            hasContent = true;
        }
        String talentName = getString.apply(requestData.get("talentName"));
        if (talentName != null) {
            message.append("Talent Name: ").append(talentName).append("\n");
            hasContent = true;
        }
        String date = getString.apply(requestData.get("date"));
        if (date != null) {
            message.append("Date: ").append(date).append("\n");
            hasContent = true;
        }
        String location = getString.apply(requestData.get("location"));
        if (location != null) {
            message.append("Location: ").append(location).append("\n");
            hasContent = true;
        }
        String userMessage = getString.apply(requestData.get("message"));
        if (userMessage != null) {
            message.append("\nMessage:\n").append(userMessage);
            hasContent = true;
        }
        String name = getString.apply(requestData.get("name"));
        if (name != null) {
            message.append("\nFrom: ").append(name);
            hasContent = true;
        }
        String email = getString.apply(requestData.get("email"));
        if (email != null) {
            message.append("\nEmail: ").append(email);
            hasContent = true;
        }
        
        if (!hasContent) {
            message.append("An availability check was requested, but no details were provided.");
        }
        
        telegramService.sendMessage(message.toString());
        
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Availability check request sent!");
        
        return ResponseEntity.ok(response);
    }
}
