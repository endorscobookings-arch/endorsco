package talent.endorsco.app.booking;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BookingRequestDTO {
    private String name;
    private String email;
    private String phone;
    private String organization;
    private String eventLocation;
    private String budget;
    private String eventDate;
    private String preferredSpeakers;
    private String desiredSpeaker;
    private String eventDescription;
    private String eventType;
    private String firstName;
    private String lastName;
    private ContactInquiryDTO.DeviceInfo device;
    private ContactInquiryDTO.LocationInfo location;
    private String ip;

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getOrganization() { return organization; }
    public void setOrganization(String organization) { this.organization = organization; }
    public String getEventLocation() { return eventLocation; }
    public void setEventLocation(String eventLocation) { this.eventLocation = eventLocation; }
    public String getBudget() { return budget; }
    public void setBudget(String budget) { this.budget = budget; }
    public String getEventDate() { return eventDate; }
    public void setEventDate(String eventDate) { this.eventDate = eventDate; }
    public String getPreferredSpeakers() { return preferredSpeakers; }
    public void setPreferredSpeakers(String preferredSpeakers) { this.preferredSpeakers = preferredSpeakers; }
    public String getDesiredSpeaker() { return desiredSpeaker; }
    public void setDesiredSpeaker(String desiredSpeaker) { this.desiredSpeaker = desiredSpeaker; }
    public String getEventDescription() { return eventDescription; }
    public void setEventDescription(String eventDescription) { this.eventDescription = eventDescription; }
    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public ContactInquiryDTO.DeviceInfo getDevice() { return device; }
    public void setDevice(ContactInquiryDTO.DeviceInfo device) { this.device = device; }
    public ContactInquiryDTO.LocationInfo getLocation() { return location; }
    public void setLocation(ContactInquiryDTO.LocationInfo location) { this.location = location; }
    public String getIp() { return ip; }
    public void setIp(String ip) { this.ip = ip; }
}
