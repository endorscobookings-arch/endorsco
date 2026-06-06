package talent.endorsco.app.booking;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ContactInquiryDTO {
    private String name;
    private String email;
    private String topic;
    private String message;
    private DeviceInfo device;
    private LocationInfo location;
    private String ip;

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public DeviceInfo getDevice() { return device; }
    public void setDevice(DeviceInfo device) { this.device = device; }
    public LocationInfo getLocation() { return location; }
    public void setLocation(LocationInfo location) { this.location = location; }
    public String getIp() { return ip; }
    public void setIp(String ip) { this.ip = ip; }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class DeviceInfo {
        private String userAgent;
        private String platform;
        private String language;

        public String getUserAgent() { return userAgent; }
        public void setUserAgent(String userAgent) { this.userAgent = userAgent; }
        public String getPlatform() { return platform; }
        public void setPlatform(String platform) { this.platform = platform; }
        public String getLanguage() { return language; }
        public void setLanguage(String language) { this.language = language; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class LocationInfo {
        private Double latitude;
        private Double longitude;

        public Double getLatitude() { return latitude; }
        public void setLatitude(Double latitude) { this.latitude = latitude; }
        public Double getLongitude() { return longitude; }
        public void setLongitude(Double longitude) { this.longitude = longitude; }
    }
}
