package talent.endorsco.app.talent;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TalentService {

    private final TalentRepository talentRepository;

    public TalentService(TalentRepository talentRepository) {
        this.talentRepository = talentRepository;
    }

    public List<Talent> getAllTalents() {
        return talentRepository.findAll();
    }

    public Optional<Talent> getTalentById(Long id) {
        return talentRepository.findById(id);
    }

    public Optional<Talent> getTalentBySlug(String slug) {
        return talentRepository.findBySlug(slug);
    }

    public Talent saveTalent(Talent talent) {
        normalizeTalent(talent);
        return talentRepository.save(talent);
    }

    public List<Talent> saveMultipleTalents(List<Talent> talents) {
        List<Talent> saved = new ArrayList<>();
        for (Talent talent : talents) {
            saved.add(saveTalent(talent));
        }
        return saved;
    }

    public void deleteTalent(Long id) {
        talentRepository.deleteById(id);
    }

    public List<Talent> getFeaturedTalents() {
        return talentRepository.findByIsFeaturedTrue();
    }

    public List<Talent> getActiveTalents() {
        return talentRepository.findByIsActiveTrue();
    }

    public List<Talent> getAvailableTalents() {
        return talentRepository.findByIsAvailableTrue();
    }

    public List<Talent> searchTalents(String keyword) {
        return talentRepository.searchByKeyword(keyword);
    }

    public List<Talent> getTalentsByPriceRangeHighToLow() {
        return talentRepository.findAllOrderByFeeRangeDesc();
    }

    public List<Talent> getTop10MostExpensiveTalents() {
        return talentRepository.findTop10ByOrderByFeeRangeDesc();
    }

    public PaginatedResponse<Talent> getTalentsPaginated(int page, int limit, String categorySlug, String searchQuery) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        List<Talent> talents;
        long totalItems;

        if (searchQuery != null && !searchQuery.isEmpty()) {
            Page<Talent> talentPage = talentRepository.searchByKeyword(searchQuery, pageable);
            talents = talentPage.getContent();
            totalItems = talentPage.getTotalElements();
        } else if (categorySlug != null && !categorySlug.isEmpty()) {
            Page<Talent> talentPage = talentRepository.findBySpeakingCategorySlug(categorySlug, pageable);
            talents = talentPage.getContent();
            totalItems = talentPage.getTotalElements();
        } else {
            Page<Talent> talentPage = talentRepository.findAll(pageable);
            talents = talentPage.getContent();
            totalItems = talentPage.getTotalElements();
        }

        return new PaginatedResponse<>(talents, page, limit, totalItems);
    }

    public List<String> getAllLocations() {
        return talentRepository.findDistinctLocations();
    }

    public List<Talent> getTalentsByLocation(String location) {
        return talentRepository.findByLocationContainingIgnoreCase(location);
    }

    public PaginatedResponse<Talent> getTalentsByLocationPaginated(String location, int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Talent> talentPage = talentRepository.findByLocationContainingIgnoreCase(location, pageable);
        return new PaginatedResponse<>(talentPage.getContent(), page, limit, talentPage.getTotalElements());
    }

    public List<Talent> getTalentsByFeeRange(String feeRange) {
        return talentRepository.findByFeeRangeLabelContainingIgnoreCase(feeRange);
    }

    public PaginatedResponse<Talent> getTalentsByFeeRangePaginated(String feeRange, int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Talent> talentPage = talentRepository.findByFeeRangeLabelContainingIgnoreCase(feeRange, pageable);
        return new PaginatedResponse<>(talentPage.getContent(), page, limit, talentPage.getTotalElements());
    }

    public List<Talent> getTalentsByCategory(String categorySlug) {
        return talentRepository.findBySpeakingCategorySlug(categorySlug);
    }

    public PaginatedResponse<Talent> getTalentsByCategoryPaginated(String categorySlug, int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Talent> talentPage = talentRepository.findBySpeakingCategorySlug(categorySlug, pageable);
        return new PaginatedResponse<>(talentPage.getContent(), page, limit, talentPage.getTotalElements());
    }

    public List<Talent.SpeakingCategory> getAllCategories() {
        return talentRepository.findDistinctSpeakingCategories();
    }

    public List<String> getAllFees() {
        return talentRepository.findDistinctFeeRanges();
    }

    // First name sorting
    public List<Talent> getTalentsByFirstNameAsc(String categorySlug) {
        if (categorySlug != null && !categorySlug.isEmpty()) {
            return talentRepository.findByCategoryOrderByFirstNameAsc(categorySlug);
        }
        return talentRepository.findAllOrderByFirstNameAsc();
    }

    public List<Talent> getTalentsByFirstNameDesc(String categorySlug) {
        if (categorySlug != null && !categorySlug.isEmpty()) {
            return talentRepository.findByCategoryOrderByFirstNameDesc(categorySlug);
        }
        return talentRepository.findAllOrderByFirstNameDesc();
    }

    // Last name sorting
    public List<Talent> getTalentsByLastNameAsc(String categorySlug) {
        if (categorySlug != null && !categorySlug.isEmpty()) {
            return talentRepository.findByCategoryOrderByLastNameAsc(categorySlug);
        }
        return talentRepository.findAllOrderByLastNameAsc();
    }

    public List<Talent> getTalentsByLastNameDesc(String categorySlug) {
        if (categorySlug != null && !categorySlug.isEmpty()) {
            return talentRepository.findByCategoryOrderByLastNameDesc(categorySlug);
        }
        return talentRepository.findAllOrderByLastNameDesc();
    }

    // Fee range sorting
    public List<Talent> getTalentsByFeeRangeAsc(String categorySlug) {
        if (categorySlug != null && !categorySlug.isEmpty()) {
            return talentRepository.findByCategoryOrderByFeeRangeAsc(categorySlug);
        }
        return talentRepository.findAllOrderByFeeRangeAsc();
    }

    public List<Talent> getTalentsByFeeRangeDesc(String categorySlug) {
        if (categorySlug != null && !categorySlug.isEmpty()) {
            return talentRepository.findByCategoryOrderByFeeRangeDesc(categorySlug);
        }
        return talentRepository.findAllOrderByFeeRangeDesc();
    }

    private void normalizeTalent(Talent talent) {
        if (talent.getSpeakingCategories() == null) {
            talent.setSpeakingCategories(new ArrayList<>());
        }
        if (talent.getCategories() == null) {
            talent.setCategories(new ArrayList<>());
        }
        if (talent.getSections() == null) {
            talent.setSections(new ArrayList<>());
        }
        if (talent.getAchievements() == null) {
            talent.setAchievements(new ArrayList<>());
        }
        if (talent.getTopics() == null) {
            talent.setTopics(new ArrayList<>());
        }
        if (talent.getVideos() == null) {
            talent.setVideos(new ArrayList<>());
        }
        if (talent.getYoutubeVideos() == null) {
            talent.setYoutubeVideos(new ArrayList<>());
        }
        if (talent.getBlogs() == null) {
            talent.setBlogs(new ArrayList<>());
        }
        if (talent.getLists() == null) {
            talent.setLists(new ArrayList<>());
        }
        if (talent.getCuratedSimilar() == null) {
            talent.setCuratedSimilar(new ArrayList<>());
        }
        if (talent.getSimilarSpeakers() == null) {
            talent.setSimilarSpeakers(new ArrayList<>());
        }
        if (talent.getTestimonials() == null) {
            talent.setTestimonials(new ArrayList<>());
        }
        if (talent.getFaqs() == null) {
            talent.setFaqs(new ArrayList<>());
        }
        if (talent.getAvailableFor() == null) {
            talent.setAvailableFor(new ArrayList<>());
        }
    }
}
