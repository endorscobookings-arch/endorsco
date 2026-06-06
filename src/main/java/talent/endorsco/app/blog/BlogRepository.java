package talent.endorsco.app.blog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

    Optional<Blog> findBySlug(String slug);

    List<Blog> findByIsFeaturedTrue();

    List<Blog> findByIsTrendingTrue();

    List<Blog> findByStatus(String status);

    @Query("SELECT b FROM Blog b WHERE " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(b.excerpt) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(b.bodyText) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Blog> searchByKeyword(@Param("keyword") String keyword);

    List<Blog> findTop10ByOrderByPublishedAtDesc();
}
