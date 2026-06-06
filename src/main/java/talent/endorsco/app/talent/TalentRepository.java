package talent.endorsco.app.talent;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TalentRepository extends JpaRepository<Talent, Long> {

    Optional<Talent> findBySlug(String slug);

    List<Talent> findByIsFeaturedTrue();

    List<Talent> findByIsActiveTrue();

    List<Talent> findByIsAvailableTrue();

    List<Talent> findByIsFeaturedTrueAndIsActiveTrue();

    @Query("SELECT t FROM Talent t WHERE " +
           "LOWER(t.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(t.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(t.fullName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Talent> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT t FROM Talent t WHERE " +
           "LOWER(t.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(t.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(t.fullName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Talent> searchByKeyword(@Param("keyword") String keyword);

    List<Talent> findByLocationContainingIgnoreCase(String location);

    @Query("SELECT t FROM Talent t WHERE LOWER(t.location) LIKE LOWER(CONCAT('%', :location, '%'))")
    Page<Talent> findByLocationContainingIgnoreCase(@Param("location") String location, Pageable pageable);

    List<Talent> findByFeeRangeLabelContainingIgnoreCase(String feeRangeLabel);

    @Query("SELECT t FROM Talent t WHERE LOWER(t.feeRangeLabel) LIKE LOWER(CONCAT('%', :feeRangeLabel, '%'))")
    Page<Talent> findByFeeRangeLabelContainingIgnoreCase(@Param("feeRangeLabel") String feeRangeLabel, Pageable pageable);

    @Query("SELECT t FROM Talent t ORDER BY t.feeRange.min DESC NULLS LAST")
    List<Talent> findAllOrderByFeeRangeDesc();

    @Query("SELECT t FROM Talent t ORDER BY t.feeRange.min ASC NULLS LAST")
    List<Talent> findAllOrderByFeeRangeAsc();

    @Query(value = "SELECT * FROM talent ORDER BY fee_range_min DESC NULLS LAST LIMIT 10", nativeQuery = true)
    List<Talent> findTop10ByOrderByFeeRangeDesc();

    @Query("SELECT t FROM Talent t JOIN t.speakingCategories sc WHERE sc.slug = :categorySlug")
    Page<Talent> findBySpeakingCategorySlug(@Param("categorySlug") String categorySlug, Pageable pageable);

    @Query("SELECT t FROM Talent t JOIN t.speakingCategories sc WHERE sc.slug = :categorySlug")
    List<Talent> findBySpeakingCategorySlug(@Param("categorySlug") String categorySlug);

    @Query("SELECT COUNT(t) FROM Talent t JOIN t.speakingCategories sc WHERE sc.slug = :categorySlug")
    long countBySpeakingCategorySlug(@Param("categorySlug") String categorySlug);

    @Query("SELECT DISTINCT t.location FROM Talent t WHERE t.location IS NOT NULL AND t.location <> '' ORDER BY t.location")
    List<String> findDistinctLocations();

    @Query("SELECT DISTINCT sc FROM Talent t JOIN t.speakingCategories sc ORDER BY sc.name")
    List<Talent.SpeakingCategory> findDistinctSpeakingCategories();

    @Query("SELECT DISTINCT t.feeRangeLabel FROM Talent t WHERE t.feeRangeLabel IS NOT NULL AND t.feeRangeLabel <> '' ORDER BY t.feeRangeLabel")
    List<String> findDistinctFeeRanges();

    // Sort by first name
    @Query("SELECT t FROM Talent t ORDER BY t.firstName ASC")
    List<Talent> findAllOrderByFirstNameAsc();

    @Query("SELECT t FROM Talent t JOIN t.speakingCategories sc WHERE sc.slug = :categorySlug ORDER BY t.firstName ASC")
    List<Talent> findByCategoryOrderByFirstNameAsc(@Param("categorySlug") String categorySlug);

    @Query("SELECT t FROM Talent t ORDER BY t.firstName DESC")
    List<Talent> findAllOrderByFirstNameDesc();

    @Query("SELECT t FROM Talent t JOIN t.speakingCategories sc WHERE sc.slug = :categorySlug ORDER BY t.firstName DESC")
    List<Talent> findByCategoryOrderByFirstNameDesc(@Param("categorySlug") String categorySlug);

    // Sort by last name
    @Query("SELECT t FROM Talent t ORDER BY t.lastName ASC")
    List<Talent> findAllOrderByLastNameAsc();

    @Query("SELECT t FROM Talent t JOIN t.speakingCategories sc WHERE sc.slug = :categorySlug ORDER BY t.lastName ASC")
    List<Talent> findByCategoryOrderByLastNameAsc(@Param("categorySlug") String categorySlug);

    @Query("SELECT t FROM Talent t ORDER BY t.lastName DESC")
    List<Talent> findAllOrderByLastNameDesc();

    @Query("SELECT t FROM Talent t JOIN t.speakingCategories sc WHERE sc.slug = :categorySlug ORDER BY t.lastName DESC")
    List<Talent> findByCategoryOrderByLastNameDesc(@Param("categorySlug") String categorySlug);

    // Sort by fee range
    @Query("SELECT t FROM Talent t JOIN t.speakingCategories sc WHERE sc.slug = :categorySlug ORDER BY t.feeRange.min ASC NULLS LAST")
    List<Talent> findByCategoryOrderByFeeRangeAsc(@Param("categorySlug") String categorySlug);

    @Query("SELECT t FROM Talent t JOIN t.speakingCategories sc WHERE sc.slug = :categorySlug ORDER BY t.feeRange.min DESC NULLS LAST")
    List<Talent> findByCategoryOrderByFeeRangeDesc(@Param("categorySlug") String categorySlug);
}
