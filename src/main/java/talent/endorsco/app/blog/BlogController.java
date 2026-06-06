package talent.endorsco.app.blog;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    private final BlogService blogService;
    private final ObjectMapper objectMapper;

    public BlogController(BlogService blogService, ObjectMapper objectMapper) {
        this.blogService = blogService;
        this.objectMapper = objectMapper;
    }

    @GetMapping
    public ResponseEntity<List<Blog>> getAllBlogs() {
        List<Blog> blogs = blogService.getAllBlogs();
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("/{identifier}")
    public ResponseEntity<Blog> getBlog(@PathVariable String identifier) {
        return resolveBlog(identifier)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<Blog> getBlogBySlug(@PathVariable String slug) {
        return blogService.getBlogBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping(params = "slug")
    public ResponseEntity<Blog> getBlogBySlugQuery(@RequestParam String slug) {
        return blogService.getBlogBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    private Optional<Blog> resolveBlog(String identifier) {
        if (identifier.matches("\\d+")) {
            return blogService.getBlogById(Long.parseLong(identifier));
        }
        return blogService.getBlogBySlug(identifier);
    }

    @PostMapping
    public ResponseEntity<?> createBlogs(@RequestBody JsonNode body) throws java.io.IOException {
        if (body == null || body.isNull()) {
            return ResponseEntity.badRequest().build();
        }
        if (body.isArray()) {
            List<Blog> blogs = objectMapper.readValue(
                    objectMapper.treeAsTokens(body),
                    new TypeReference<List<Blog>>() {});
            return ResponseEntity.ok(blogService.saveMultipleBlogs(blogs));
        }
        Blog blog = objectMapper.treeToValue(body, Blog.class);
        return ResponseEntity.ok(blogService.saveBlog(blog));
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Blog>> createMultipleBlogs(@RequestBody List<Blog> blogs) {
        return ResponseEntity.ok(blogService.saveMultipleBlogs(blogs));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id, @RequestBody Blog blog) {
        return blogService.getBlogById(id)
                .map(existingBlog -> {
                    blog.setId(id);
                    Blog updatedBlog = blogService.saveBlog(blog);
                    return ResponseEntity.ok(updatedBlog);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        if (blogService.getBlogById(id).isPresent()) {
            blogService.deleteBlog(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Blog>> getFeaturedBlogs() {
        List<Blog> blogs = blogService.getFeaturedBlogs();
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("/trending")
    public ResponseEntity<List<Blog>> getTrendingBlogs() {
        List<Blog> blogs = blogService.getTrendingBlogs();
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("/published")
    public ResponseEntity<List<Blog>> getPublishedBlogs() {
        List<Blog> blogs = blogService.getPublishedBlogs();
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Blog>> searchBlogs(@RequestParam String keyword) {
        List<Blog> blogs = blogService.searchBlogs(keyword);
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<Blog>> getLatest10Blogs() {
        List<Blog> blogs = blogService.getLatest10Blogs();
        return ResponseEntity.ok(blogs);
    }
}
