package talent.endorsco.app.blog;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.type.TypeReference;
import talent.endorsco.app.talent.converter.JsonAttributeConverter;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "blog")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Blog {

    @Id
    private Long id;

    private String slug;
    private String url;
    private Instant extractedAt;
    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String excerpt;

    @Column(columnDefinition = "LONGTEXT")
    private String bodyHtml;

    @Column(columnDefinition = "LONGTEXT")
    private String bodyText;

    private String coverImage;
    private Integer readTime;

    @Convert(converter = StringListConverter.class)
    @Column(name = "keywords_json", columnDefinition = "TEXT")
    private List<String> keywords = new ArrayList<>();

    @Convert(converter = StringListConverter.class)
    @Column(name = "tags_json", columnDefinition = "TEXT")
    private List<String> tags = new ArrayList<>();

    private Boolean isTrending;
    private Boolean isFeatured;
    private String blogType;
    private Long views;
    private String status;
    private String metaTitle;

    @Column(length = 1000)
    private String metaDesc;

    private String metaImage;
    private String canonical;
    private String videoUrl;
    private String youtubeVideoId;
    private String youtubeEmbedUrl;
    private Instant publishedAt;
    private Instant createdAt;
    private Instant updatedAt;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "id", column = @Column(name = "author_id")),
            @AttributeOverride(name = "firstName", column = @Column(name = "author_first_name")),
            @AttributeOverride(name = "lastName", column = @Column(name = "author_last_name")),
            @AttributeOverride(name = "fullName", column = @Column(name = "author_full_name")),
            @AttributeOverride(name = "description", column = @Column(name = "author_description", columnDefinition = "LONGTEXT"))
    })
    private Author author;

    @Convert(converter = FeaturedSpeakerListConverter.class)
    @Column(name = "featured_speakers_json", columnDefinition = "TEXT")
    private List<FeaturedSpeaker> featuredSpeakers = new ArrayList<>();

    @Convert(converter = CategoryAssignmentListConverter.class)
    @Column(name = "categories_json", columnDefinition = "TEXT")
    private List<CategoryAssignment> categories = new ArrayList<>();

    @Convert(converter = CategoryListConverter.class)
    @Column(name = "blog_categories_json", columnDefinition = "TEXT")
    private List<Category> blogCategories = new ArrayList<>();

    @Convert(converter = SpeakerListListConverter.class)
    @Column(name = "speaker_lists_json", columnDefinition = "TEXT")
    private List<SpeakerList> speakerLists = new ArrayList<>();

    @Convert(converter = RelatedPostListConverter.class)
    @Column(name = "related_posts_json", columnDefinition = "TEXT")
    private List<RelatedPost> relatedPosts = new ArrayList<>();

    @Embeddable
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Author {
        private Long id;
        private String firstName;
        private String lastName;
        private String fullName;
        private String description;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class FeaturedSpeaker {
        private Long id;
        private String slug;
        private String url;
        private String firstName;
        private String lastName;
        private String fullName;
        private String headshotUrl;

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
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getHeadshotUrl() { return headshotUrl; }
        public void setHeadshotUrl(String headshotUrl) { this.headshotUrl = headshotUrl; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Category {
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
    public static class CategoryAssignment {
        private Long blogId;
        private Long categoryId;
        private Instant createdAt;
        private Category category;

        public Long getBlogId() { return blogId; }
        public void setBlogId(Long blogId) { this.blogId = blogId; }
        public Long getCategoryId() { return categoryId; }
        public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
        public Instant getCreatedAt() { return createdAt; }
        public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
        public Category getCategory() { return category; }
        public void setCategory(Category category) { this.category = category; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class SpeakerList {
        private Long id;
        private String name;
        private String slug;
        private String url;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class RelatedPost {
        private Long id;
        private String slug;
        private String url;
        private String title;
        private String excerpt;
        private String coverImage;
        private Instant publishedAt;
        private Integer readTime;
        private String blogType;
        private Boolean isFeatured;
        private Boolean isTrending;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getExcerpt() { return excerpt; }
        public void setExcerpt(String excerpt) { this.excerpt = excerpt; }
        public String getCoverImage() { return coverImage; }
        public void setCoverImage(String coverImage) { this.coverImage = coverImage; }
        public Instant getPublishedAt() { return publishedAt; }
        public void setPublishedAt(Instant publishedAt) { this.publishedAt = publishedAt; }
        public Integer getReadTime() { return readTime; }
        public void setReadTime(Integer readTime) { this.readTime = readTime; }
        public String getBlogType() { return blogType; }
        public void setBlogType(String blogType) { this.blogType = blogType; }
        public Boolean getIsFeatured() { return isFeatured; }
        public void setIsFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; }
        public Boolean getIsTrending() { return isTrending; }
        public void setIsTrending(Boolean isTrending) { this.isTrending = isTrending; }
    }

    @Converter
    public static class StringListConverter extends JsonAttributeConverter<List<String>> {
        public StringListConverter() {
            super(new TypeReference<List<String>>() {});
        }
    }

    @Converter
    public static class FeaturedSpeakerListConverter extends JsonAttributeConverter<List<FeaturedSpeaker>> {
        public FeaturedSpeakerListConverter() {
            super(new TypeReference<List<FeaturedSpeaker>>() {});
        }
    }

    @Converter
    public static class CategoryAssignmentListConverter extends JsonAttributeConverter<List<CategoryAssignment>> {
        public CategoryAssignmentListConverter() {
            super(new TypeReference<List<CategoryAssignment>>() {});
        }
    }

    @Converter
    public static class CategoryListConverter extends JsonAttributeConverter<List<Category>> {
        public CategoryListConverter() {
            super(new TypeReference<List<Category>>() {});
        }
    }

    @Converter
    public static class SpeakerListListConverter extends JsonAttributeConverter<List<SpeakerList>> {
        public SpeakerListListConverter() {
            super(new TypeReference<List<SpeakerList>>() {});
        }
    }

    @Converter
    public static class RelatedPostListConverter extends JsonAttributeConverter<List<RelatedPost>> {
        public RelatedPostListConverter() {
            super(new TypeReference<List<RelatedPost>>() {});
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public Instant getExtractedAt() { return extractedAt; }
    public void setExtractedAt(Instant extractedAt) { this.extractedAt = extractedAt; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getExcerpt() { return excerpt; }
    public void setExcerpt(String excerpt) { this.excerpt = excerpt; }
    public String getBodyHtml() { return bodyHtml; }
    public void setBodyHtml(String bodyHtml) { this.bodyHtml = bodyHtml; }
    public String getBodyText() { return bodyText; }
    public void setBodyText(String bodyText) { this.bodyText = bodyText; }
    public String getCoverImage() { return coverImage; }
    public void setCoverImage(String coverImage) { this.coverImage = coverImage; }
    public Integer getReadTime() { return readTime; }
    public void setReadTime(Integer readTime) { this.readTime = readTime; }
    public List<String> getKeywords() { return keywords; }
    public void setKeywords(List<String> keywords) { this.keywords = keywords; }
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    public Boolean getIsTrending() { return isTrending; }
    public void setIsTrending(Boolean isTrending) { this.isTrending = isTrending; }
    public Boolean getIsFeatured() { return isFeatured; }
    public void setIsFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; }
    public String getBlogType() { return blogType; }
    public void setBlogType(String blogType) { this.blogType = blogType; }
    public Long getViews() { return views; }
    public void setViews(Long views) { this.views = views; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getMetaTitle() { return metaTitle; }
    public void setMetaTitle(String metaTitle) { this.metaTitle = metaTitle; }
    public String getMetaDesc() { return metaDesc; }
    public void setMetaDesc(String metaDesc) { this.metaDesc = metaDesc; }
    public String getMetaImage() { return metaImage; }
    public void setMetaImage(String metaImage) { this.metaImage = metaImage; }
    public String getCanonical() { return canonical; }
    public void setCanonical(String canonical) { this.canonical = canonical; }
    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
    public String getYoutubeVideoId() { return youtubeVideoId; }
    public void setYoutubeVideoId(String youtubeVideoId) { this.youtubeVideoId = youtubeVideoId; }
    public String getYoutubeEmbedUrl() { return youtubeEmbedUrl; }
    public void setYoutubeEmbedUrl(String youtubeEmbedUrl) { this.youtubeEmbedUrl = youtubeEmbedUrl; }
    public Instant getPublishedAt() { return publishedAt; }
    public void setPublishedAt(Instant publishedAt) { this.publishedAt = publishedAt; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
    public Author getAuthor() { return author; }
    public void setAuthor(Author author) { this.author = author; }
    public List<FeaturedSpeaker> getFeaturedSpeakers() { return featuredSpeakers; }
    public void setFeaturedSpeakers(List<FeaturedSpeaker> featuredSpeakers) { this.featuredSpeakers = featuredSpeakers; }
    public List<CategoryAssignment> getCategories() { return categories; }
    public void setCategories(List<CategoryAssignment> categories) { this.categories = categories; }
    public List<Category> getBlogCategories() { return blogCategories; }
    public void setBlogCategories(List<Category> blogCategories) { this.blogCategories = blogCategories; }
    public List<SpeakerList> getSpeakerLists() { return speakerLists; }
    public void setSpeakerLists(List<SpeakerList> speakerLists) { this.speakerLists = speakerLists; }
    public List<RelatedPost> getRelatedPosts() { return relatedPosts; }
    public void setRelatedPosts(List<RelatedPost> relatedPosts) { this.relatedPosts = relatedPosts; }
}
