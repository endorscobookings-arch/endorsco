package talent.endorsco.app.blog;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    private final BlogRepository blogRepository;

    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }

    public Optional<Blog> getBlogBySlug(String slug) {
        return blogRepository.findBySlug(slug);
    }

    public Blog saveBlog(Blog blog) {
        normalizeBlog(blog);
        return blogRepository.save(blog);
    }

    public List<Blog> saveMultipleBlogs(List<Blog> blogs) {
        List<Blog> saved = new ArrayList<>();
        for (Blog blog : blogs) {
            saved.add(saveBlog(blog));
        }
        return saved;
    }

    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }

    public List<Blog> getFeaturedBlogs() {
        return blogRepository.findByIsFeaturedTrue();
    }

    public List<Blog> getTrendingBlogs() {
        return blogRepository.findByIsTrendingTrue();
    }

    public List<Blog> getPublishedBlogs() {
        return blogRepository.findByStatus("PUBLISHED");
    }

    public List<Blog> searchBlogs(String keyword) {
        return blogRepository.searchByKeyword(keyword);
    }

    public List<Blog> getLatest10Blogs() {
        return blogRepository.findTop10ByOrderByPublishedAtDesc();
    }

    private void normalizeBlog(Blog blog) {
        if (blog.getKeywords() == null) {
            blog.setKeywords(new ArrayList<>());
        }
        if (blog.getTags() == null) {
            blog.setTags(new ArrayList<>());
        }
        if (blog.getFeaturedSpeakers() == null) {
            blog.setFeaturedSpeakers(new ArrayList<>());
        }
        if (blog.getCategories() == null) {
            blog.setCategories(new ArrayList<>());
        }
        if (blog.getBlogCategories() == null) {
            blog.setBlogCategories(new ArrayList<>());
        }
        if (blog.getSpeakerLists() == null) {
            blog.setSpeakerLists(new ArrayList<>());
        }
        if (blog.getRelatedPosts() == null) {
            blog.setRelatedPosts(new ArrayList<>());
        }
    }
}
