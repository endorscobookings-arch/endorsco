package talent.endorsco.app.talent;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.core.type.TypeReference;
import talent.endorsco.app.talent.converter.JsonAttributeConverter;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "talent")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Talent {

    @Id
    private Long id;

    private String slug;
    private String url;
    private String bookingRequestUrl;
    private Instant extractedAt;
    private String firstName;
    private String lastName;
    private String fullName;

    @Column(length = 500)
    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String bio;

    private String headshotUrl;
    private String location;
    private String locationSlug;
    private String sport;
    private Boolean isFeatured;
    private Boolean isActive;
    private Boolean isAvailable;

    @Column(columnDefinition = "LONGTEXT")
    private String feeBookingDetails;

    @Column(columnDefinition = "LONGTEXT")
    private String feeBookingDetailsHtml;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "id", column = @Column(name = "fee_range_ref_id")),
            @AttributeOverride(name = "label", column = @Column(name = "fee_range_embed_label")),
            @AttributeOverride(name = "min", column = @Column(name = "fee_range_min")),
            @AttributeOverride(name = "max", column = @Column(name = "fee_range_max"))
    })
    @JsonDeserialize(using = FeeRangeDeserializer.class)
    private FeeRange feeRange;

    private String feeRangeLabel;
    private Long teamId;

    @Convert(converter = TeamConverter.class)
    @Column(name = "team_json", columnDefinition = "TEXT")
    private Team team;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "id", column = @Column(name = "geo_location_ref_id")),
            @AttributeOverride(name = "name", column = @Column(name = "geo_location_name"))
    })
    private GeographicLocation geographicLocation;

    @Column(length = 500)
    private String metaTitle;

    @Column(length = 1000)
    private String metaDesc;

    private String metaImage;
    private Instant createdAt;
    private Instant updatedAt;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "talent_speaking_category", joinColumns = @JoinColumn(name = "talent_id"))
    @AttributeOverrides({
            @AttributeOverride(name = "id", column = @Column(name = "speaking_category_id")),
            @AttributeOverride(name = "name", column = @Column(name = "speaking_category_name")),
            @AttributeOverride(name = "slug", column = @Column(name = "speaking_category_slug"))
    })
    private List<SpeakingCategory> speakingCategories = new ArrayList<>();

    @Convert(converter = CategoryAssignmentListConverter.class)
    @Column(name = "categories_json", columnDefinition = "TEXT")
    private List<CategoryAssignment> categories = new ArrayList<>();

    @Convert(converter = SectionListConverter.class)
    @Column(name = "sections_json", columnDefinition = "TEXT")
    private List<Section> sections = new ArrayList<>();

    @Convert(converter = StringListConverter.class)
    @Column(name = "achievements_json", columnDefinition = "TEXT")
    private List<String> achievements = new ArrayList<>();

    @Convert(converter = StringListConverter.class)
    @Column(name = "topics_json", columnDefinition = "TEXT")
    private List<String> topics = new ArrayList<>();

    @Convert(converter = VideoListConverter.class)
    @Column(name = "videos_json", columnDefinition = "TEXT")
    private List<Video> videos = new ArrayList<>();

    @Convert(converter = YoutubeVideoListConverter.class)
    @Column(name = "youtube_videos_json", columnDefinition = "TEXT")
    private List<YoutubeVideo> youtubeVideos = new ArrayList<>();

    @Convert(converter = BlogListConverter.class)
    @Column(name = "blogs_json", columnDefinition = "TEXT")
    private List<Blog> blogs = new ArrayList<>();

    @Convert(converter = SpeakerListListConverter.class)
    @Column(name = "lists_json", columnDefinition = "TEXT")
    private List<SpeakerList> lists = new ArrayList<>();

    @Convert(converter = SimilarSpeakerListConverter.class)
    @Column(name = "curated_similar_json", columnDefinition = "TEXT")
    private List<SimilarSpeaker> curatedSimilar = new ArrayList<>();

    @Convert(converter = SimilarSpeakerListConverter.class)
    @Column(name = "similar_speakers_json", columnDefinition = "TEXT")
    private List<SimilarSpeaker> similarSpeakers = new ArrayList<>();

    @Convert(converter = TestimonialListConverter.class)
    @Column(name = "testimonials_json", columnDefinition = "TEXT")
    private List<Testimonial> testimonials = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "talent_faq", joinColumns = @JoinColumn(name = "talent_id"))
    private List<FAQ> faqs = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "talent_available_for", joinColumns = @JoinColumn(name = "talent_id"))
    @Column(name = "available_for")
    private List<String> availableFor = new ArrayList<>();

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "blogs", column = @Column(name = "count_blogs")),
            @AttributeOverride(name = "inquiries", column = @Column(name = "count_inquiries"))
    })
    @JsonProperty("_count")
    private TalentCount count;

    @Embeddable
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class FeeRange {
        private Long id;
        private String label;
        private Long min;
        private Long max;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getLabel() { return label; }
        public void setLabel(String label) { this.label = label; }
        public Long getMin() { return min; }
        public void setMin(Long min) { this.min = min; }
        public Long getMax() { return max; }
        public void setMax(Long max) { this.max = max; }
    }

    @Embeddable
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class GeographicLocation {
        private Long id;
        private String name;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }

    @Embeddable
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class SpeakingCategory {
        private Long id;
        private String name;
        private String slug;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Category {
        private Long id;
        private String name;
        private String slug;

        private String description;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class CategoryAssignment {
        private Long speakerId;
        private Long categoryId;
        private Instant assignedAt;
        private Category category;

        public Long getSpeakerId() { return speakerId; }
        public void setSpeakerId(Long speakerId) { this.speakerId = speakerId; }
        public Long getCategoryId() { return categoryId; }
        public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
        public Instant getAssignedAt() { return assignedAt; }
        public void setAssignedAt(Instant assignedAt) { this.assignedAt = assignedAt; }
        public Category getCategory() { return category; }
        public void setCategory(Category category) { this.category = category; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Section {
        private Long id;
        private String sectionTitle;

        private String sectionContent;

        private Instant createdAt;
        private Instant updatedAt;

        private String sectionContentHtml;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getSectionTitle() { return sectionTitle; }
        public void setSectionTitle(String sectionTitle) { this.sectionTitle = sectionTitle; }
        public String getSectionContent() { return sectionContent; }
        public void setSectionContent(String sectionContent) { this.sectionContent = sectionContent; }
        public Instant getCreatedAt() { return createdAt; }
        public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
        public Instant getUpdatedAt() { return updatedAt; }
        public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
        public String getSectionContentHtml() { return sectionContentHtml; }
        public void setSectionContentHtml(String sectionContentHtml) { this.sectionContentHtml = sectionContentHtml; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Video {
        private Long id;
        private String url;
        private Instant createdAt;
        private Instant updatedAt;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
        public Instant getCreatedAt() { return createdAt; }
        public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
        public Instant getUpdatedAt() { return updatedAt; }
        public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class YoutubeVideo {
        private Long id;
        private String videoId;
        private String youtubeUrl;
        private String title;
        private String iframeSrc;
        private Instant createdAt;
        private Instant updatedAt;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getVideoId() { return videoId; }
        public void setVideoId(String videoId) { this.videoId = videoId; }
        public String getYoutubeUrl() { return youtubeUrl; }
        public void setYoutubeUrl(String youtubeUrl) { this.youtubeUrl = youtubeUrl; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getIframeSrc() { return iframeSrc; }
        public void setIframeSrc(String iframeSrc) { this.iframeSrc = iframeSrc; }
        public Instant getCreatedAt() { return createdAt; }
        public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
        public Instant getUpdatedAt() { return updatedAt; }
        public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Blog {
        private Long id;
        private String title;
        private String slug;
        private String excerpt;
        private String coverImage;
        private Instant publishedAt;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
        public String getExcerpt() { return excerpt; }
        public void setExcerpt(String excerpt) { this.excerpt = excerpt; }
        public String getCoverImage() { return coverImage; }
        public void setCoverImage(String coverImage) { this.coverImage = coverImage; }
        public Instant getPublishedAt() { return publishedAt; }
        public void setPublishedAt(Instant publishedAt) { this.publishedAt = publishedAt; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class SpeakerList {
        private Long id;
        private String name;
        private String slug;

        private String description;

        private String metaTitle;
        private String metaDesc;
        private String metaImage;
        private Boolean isRecommended;
        private String status;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getMetaTitle() { return metaTitle; }
        public void setMetaTitle(String metaTitle) { this.metaTitle = metaTitle; }
        public String getMetaDesc() { return metaDesc; }
        public void setMetaDesc(String metaDesc) { this.metaDesc = metaDesc; }
        public String getMetaImage() { return metaImage; }
        public void setMetaImage(String metaImage) { this.metaImage = metaImage; }
        public Boolean getIsRecommended() { return isRecommended; }
        public void setIsRecommended(Boolean isRecommended) { this.isRecommended = isRecommended; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class SimilarSpeaker {
        private Long id;
        private String slug;
        private String url;
        private String firstName;
        private String lastName;
        private String title;

        private String bio;

        private String headshotUrl;
        private String location;
        private FeeRange feeRange;
        private String feeRangeLabel;
        private List<SpeakingCategory> speakingCategories = new ArrayList<>();

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getBio() { return bio; }
        public void setBio(String bio) { this.bio = bio; }
        public String getHeadshotUrl() { return headshotUrl; }
        public void setHeadshotUrl(String headshotUrl) { this.headshotUrl = headshotUrl; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public FeeRange getFeeRange() { return feeRange; }
        public void setFeeRange(FeeRange feeRange) { this.feeRange = feeRange; }
        public String getFeeRangeLabel() { return feeRangeLabel; }
        public void setFeeRangeLabel(String feeRangeLabel) { this.feeRangeLabel = feeRangeLabel; }
        public List<SpeakingCategory> getSpeakingCategories() { return speakingCategories; }
        public void setSpeakingCategories(List<SpeakingCategory> speakingCategories) { this.speakingCategories = speakingCategories; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Testimonial {
        private Long id;
        private String author;
        private String content;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getAuthor() { return author; }
        public void setAuthor(String author) { this.author = author; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
    }

    @Embeddable
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class FAQ {
        private String question;

        @Column(columnDefinition = "LONGTEXT")
        private String answer;

        public String getQuestion() { return question; }
        public void setQuestion(String question) { this.question = question; }
        public String getAnswer() { return answer; }
        public void setAnswer(String answer) { this.answer = answer; }
    }

    @Embeddable
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class TalentCount {
        private Integer blogs;
        private Integer inquiries;

        public Integer getBlogs() { return blogs; }
        public void setBlogs(Integer blogs) { this.blogs = blogs; }
        public Integer getInquiries() { return inquiries; }
        public void setInquiries(Integer inquiries) { this.inquiries = inquiries; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Team {
        private Long id;
        private String name;
        private String slug;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
    }

    @Converter
    public static class TeamConverter extends JsonAttributeConverter<Team> {
        public TeamConverter() {
            super(new TypeReference<Team>() {});
        }
    }

    @Converter
    public static class CategoryAssignmentListConverter extends JsonAttributeConverter<List<CategoryAssignment>> {
        public CategoryAssignmentListConverter() {
            super(new TypeReference<List<CategoryAssignment>>() {});
        }
    }

    @Converter
    public static class SectionListConverter extends JsonAttributeConverter<List<Section>> {
        public SectionListConverter() {
            super(new TypeReference<List<Section>>() {});
        }
    }

    @Converter
    public static class StringListConverter extends JsonAttributeConverter<List<String>> {
        public StringListConverter() {
            super(new TypeReference<List<String>>() {});
        }
    }

    @Converter
    public static class VideoListConverter extends JsonAttributeConverter<List<Video>> {
        public VideoListConverter() {
            super(new TypeReference<List<Video>>() {});
        }
    }

    @Converter
    public static class YoutubeVideoListConverter extends JsonAttributeConverter<List<YoutubeVideo>> {
        public YoutubeVideoListConverter() {
            super(new TypeReference<List<YoutubeVideo>>() {});
        }
    }

    @Converter
    public static class BlogListConverter extends JsonAttributeConverter<List<Blog>> {
        public BlogListConverter() {
            super(new TypeReference<List<Blog>>() {});
        }
    }

    @Converter
    public static class SpeakerListListConverter extends JsonAttributeConverter<List<SpeakerList>> {
        public SpeakerListListConverter() {
            super(new TypeReference<List<SpeakerList>>() {});
        }
    }

    @Converter
    public static class SimilarSpeakerListConverter extends JsonAttributeConverter<List<SimilarSpeaker>> {
        public SimilarSpeakerListConverter() {
            super(new TypeReference<List<SimilarSpeaker>>() {});
        }
    }

    @Converter
    public static class TestimonialListConverter extends JsonAttributeConverter<List<Testimonial>> {
        public TestimonialListConverter() {
            super(new TypeReference<List<Testimonial>>() {});
        }
    }

    @PrePersist
    @PreUpdate
    private void syncDerivedFields() {
        if (fullName == null || fullName.isEmpty()) {
            String first = firstName != null ? firstName : "";
            String last = lastName != null ? lastName : "";
            fullName = (first + " " + last).trim();
        }
        if (feeRange != null && (feeRangeLabel == null || feeRangeLabel.isEmpty())) {
            feeRangeLabel = feeRange.getLabel();
        }
    }

    @JsonProperty("feeRangeId")
    public Long getFeeRangeId() {
        return feeRange != null ? feeRange.getId() : null;
    }

    @JsonProperty("feeRangeId")
    public void setFeeRangeId(Long feeRangeId) {
        if (feeRangeId == null) {
            return;
        }
        if (feeRange == null) {
            feeRange = new FeeRange();
        }
        feeRange.setId(feeRangeId);
    }

    @JsonProperty("geographicLocationId")
    public Long getGeographicLocationId() {
        return geographicLocation != null ? geographicLocation.getId() : null;
    }

    @JsonProperty("geographicLocationId")
    public void setGeographicLocationId(Long geographicLocationId) {
        if (geographicLocationId == null) {
            return;
        }
        if (geographicLocation == null) {
            geographicLocation = new GeographicLocation();
        }
        geographicLocation.setId(geographicLocationId);
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getBookingRequestUrl() { return bookingRequestUrl; }
    public void setBookingRequestUrl(String bookingRequestUrl) { this.bookingRequestUrl = bookingRequestUrl; }
    public Instant getExtractedAt() { return extractedAt; }
    public void setExtractedAt(Instant extractedAt) { this.extractedAt = extractedAt; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getHeadshotUrl() { return headshotUrl; }
    public void setHeadshotUrl(String headshotUrl) { this.headshotUrl = headshotUrl; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getLocationSlug() { return locationSlug; }
    public void setLocationSlug(String locationSlug) { this.locationSlug = locationSlug; }
    public String getSport() { return sport; }
    public void setSport(String sport) { this.sport = sport; }
    public Boolean getIsFeatured() { return isFeatured; }
    public void setIsFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }
    public String getFeeBookingDetails() { return feeBookingDetails; }
    public void setFeeBookingDetails(String feeBookingDetails) { this.feeBookingDetails = feeBookingDetails; }
    public String getFeeBookingDetailsHtml() { return feeBookingDetailsHtml; }
    public void setFeeBookingDetailsHtml(String feeBookingDetailsHtml) { this.feeBookingDetailsHtml = feeBookingDetailsHtml; }
    public FeeRange getFeeRange() { return feeRange; }
    public void setFeeRange(FeeRange feeRange) { this.feeRange = feeRange; }
    public String getFeeRangeLabel() { return feeRangeLabel; }
    public void setFeeRangeLabel(String feeRangeLabel) { this.feeRangeLabel = feeRangeLabel; }
    public Long getTeamId() { return teamId; }
    public void setTeamId(Long teamId) { this.teamId = teamId; }
    public Team getTeam() { return team; }
    public void setTeam(Team team) { this.team = team; }
    public GeographicLocation getGeographicLocation() { return geographicLocation; }
    public void setGeographicLocation(GeographicLocation geographicLocation) { this.geographicLocation = geographicLocation; }
    public String getMetaTitle() { return metaTitle; }
    public void setMetaTitle(String metaTitle) { this.metaTitle = metaTitle; }
    public String getMetaDesc() { return metaDesc; }
    public void setMetaDesc(String metaDesc) { this.metaDesc = metaDesc; }
    public String getMetaImage() { return metaImage; }
    public void setMetaImage(String metaImage) { this.metaImage = metaImage; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
    public List<SpeakingCategory> getSpeakingCategories() { return speakingCategories; }
    public void setSpeakingCategories(List<SpeakingCategory> speakingCategories) { this.speakingCategories = speakingCategories; }
    public List<CategoryAssignment> getCategories() { return categories; }
    public void setCategories(List<CategoryAssignment> categories) { this.categories = categories; }
    public List<Section> getSections() { return sections; }
    public void setSections(List<Section> sections) { this.sections = sections; }
    public List<String> getAchievements() { return achievements; }
    public void setAchievements(List<String> achievements) { this.achievements = achievements; }
    public List<String> getTopics() { return topics; }
    public void setTopics(List<String> topics) { this.topics = topics; }
    public List<Video> getVideos() { return videos; }
    public void setVideos(List<Video> videos) { this.videos = videos; }
    public List<YoutubeVideo> getYoutubeVideos() { return youtubeVideos; }
    public void setYoutubeVideos(List<YoutubeVideo> youtubeVideos) { this.youtubeVideos = youtubeVideos; }
    public List<Blog> getBlogs() { return blogs; }
    public void setBlogs(List<Blog> blogs) { this.blogs = blogs; }
    public List<SpeakerList> getLists() { return lists; }
    public void setLists(List<SpeakerList> lists) { this.lists = lists; }
    public List<SimilarSpeaker> getCuratedSimilar() { return curatedSimilar; }
    public void setCuratedSimilar(List<SimilarSpeaker> curatedSimilar) { this.curatedSimilar = curatedSimilar; }
    public List<SimilarSpeaker> getSimilarSpeakers() { return similarSpeakers; }
    public void setSimilarSpeakers(List<SimilarSpeaker> similarSpeakers) { this.similarSpeakers = similarSpeakers; }
    public List<Testimonial> getTestimonials() { return testimonials; }
    public void setTestimonials(List<Testimonial> testimonials) { this.testimonials = testimonials; }
    public List<FAQ> getFaqs() { return faqs; }
    public void setFaqs(List<FAQ> faqs) { this.faqs = faqs; }
    public List<String> getAvailableFor() { return availableFor; }
    public void setAvailableFor(List<String> availableFor) { this.availableFor = availableFor; }
    public TalentCount getCount() { return count; }
    public void setCount(TalentCount count) { this.count = count; }
}
