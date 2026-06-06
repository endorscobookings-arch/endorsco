package talent.endorsco.app.talent;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/talents")
public class TalentController {

    private final TalentService talentService;
    private final ObjectMapper objectMapper;

    public TalentController(TalentService talentService, ObjectMapper objectMapper) {
        this.talentService = talentService;
        this.objectMapper = objectMapper;
    }

    @GetMapping
    public ResponseEntity<?> getTalents(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int limit,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        if (page <= 0) {
            page = 1;
        }
        if (limit <= 0) {
            limit = 12;
        }
        PaginatedResponse<Talent> response = talentService.getTalentsPaginated(page, limit, category, search);
        return ResponseEntity.ok(response);
    }

    /**
     * Fetch by numeric id (e.g. /api/talents/28670) or slug (e.g. /api/talents/common).
     */
    @GetMapping("/{identifier}")
    public ResponseEntity<Talent> getTalent(@PathVariable String identifier) {
        return resolveTalent(identifier)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<Talent> getTalentBySlug(@PathVariable String slug) {
        return talentService.getTalentBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping(params = "slug")
    public ResponseEntity<Talent> getTalentBySlugQuery(@RequestParam String slug) {
        return talentService.getTalentBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    private Optional<Talent> resolveTalent(String identifier) {
        if (identifier.matches("\\d+")) {
            return talentService.getTalentById(Long.parseLong(identifier));
        }
        return talentService.getTalentBySlug(identifier);
    }

    /**
     * Accepts a single talent object or an array in Speaker Booking Agency format.
     */
    @PostMapping
    public ResponseEntity<?> createTalents(@RequestBody JsonNode body) throws java.io.IOException {
        if (body == null || body.isNull()) {
            return ResponseEntity.badRequest().build();
        }
        if (body.isArray()) {
            List<Talent> talents = objectMapper.readValue(
                    objectMapper.treeAsTokens(body),
                    new TypeReference<List<Talent>>() {});
            return ResponseEntity.ok(talentService.saveMultipleTalents(talents));
        }
        Talent talent = objectMapper.treeToValue(body, Talent.class);
        return ResponseEntity.ok(talentService.saveTalent(talent));
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Talent>> createMultipleTalents(@RequestBody List<Talent> talents) {
        return ResponseEntity.ok(talentService.saveMultipleTalents(talents));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Talent> updateTalent(@PathVariable Long id, @RequestBody Talent talent) {
        return talentService.getTalentById(id)
                .map(existingTalent -> {
                    talent.setId(id);
                    Talent updatedTalent = talentService.saveTalent(talent);
                    return ResponseEntity.ok(updatedTalent);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTalent(@PathVariable Long id) {
        if (talentService.getTalentById(id).isPresent()) {
            talentService.deleteTalent(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Talent>> getFeaturedTalents() {
        List<Talent> talents = talentService.getFeaturedTalents();
        return ResponseEntity.ok(talents);
    }

    @GetMapping("/active")
    public ResponseEntity<List<Talent>> getActiveTalents() {
        List<Talent> talents = talentService.getActiveTalents();
        return ResponseEntity.ok(talents);
    }

    @GetMapping("/available")
    public ResponseEntity<List<Talent>> getAvailableTalents() {
        List<Talent> talents = talentService.getAvailableTalents();
        return ResponseEntity.ok(talents);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Talent>> searchTalents(@RequestParam String keyword) {
        List<Talent> talents = talentService.searchTalents(keyword);
        return ResponseEntity.ok(talents);
    }

    @GetMapping("/price-high-to-low")
    public ResponseEntity<List<Talent>> getTalentsByPriceRangeHighToLow() {
        List<Talent> talents = talentService.getTalentsByPriceRangeHighToLow();
        return ResponseEntity.ok(talents);
    }

    @GetMapping("/top-10-expensive")
    public ResponseEntity<List<Talent>> getTop10MostExpensiveTalents() {
        List<Talent> talents = talentService.getTop10MostExpensiveTalents();
        return ResponseEntity.ok(talents);
    }

    @GetMapping("/locations")
    public ResponseEntity<List<String>> getAllLocations() {
        List<String> locations = talentService.getAllLocations();
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/by-location")
    public ResponseEntity<PaginatedResponse<Talent>> getTalentsByLocation(
            @RequestParam String location,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int limit) {
        if (page <= 0) {
            page = 1;
        }
        if (limit <= 0) {
            limit = 12;
        }
        PaginatedResponse<Talent> response = talentService.getTalentsByLocationPaginated(location, page, limit);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/by-fee")
    public ResponseEntity<PaginatedResponse<Talent>> getTalentsByFeeRange(
            @RequestParam String fee,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int limit) {
        if (page <= 0) {
            page = 1;
        }
        if (limit <= 0) {
            limit = 12;
        }
        PaginatedResponse<Talent> response = talentService.getTalentsByFeeRangePaginated(fee, page, limit);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/by-category")
    public ResponseEntity<PaginatedResponse<Talent>> getTalentsByCategory(
            @RequestParam String category,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int limit) {
        if (page <= 0) {
            page = 1;
        }
        if (limit <= 0) {
            limit = 12;
        }
        PaginatedResponse<Talent> response = talentService.getTalentsByCategoryPaginated(category, page, limit);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Talent.SpeakingCategory>> getAllCategories() {
        List<Talent.SpeakingCategory> categories = talentService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/fees")
    public ResponseEntity<List<String>> getAllFees() {
        List<String> fees = talentService.getAllFees();
        return ResponseEntity.ok(fees);
    }

    @GetMapping("/sort/first-name-asc")
    public ResponseEntity<List<Talent>> getTalentsByFirstNameAsc(@RequestParam(required = false) String category) {
        List<Talent> talents = talentService.getTalentsByFirstNameAsc(category);
        return ResponseEntity.ok(talents);
    }

    @GetMapping("/sort/first-name-desc")
    public ResponseEntity<List<Talent>> getTalentsByFirstNameDesc(@RequestParam(required = false) String category) {
        List<Talent> talents = talentService.getTalentsByFirstNameDesc(category);
        return ResponseEntity.ok(talents);
    }

    @GetMapping("/sort/last-name-asc")
    public ResponseEntity<List<Talent>> getTalentsByLastNameAsc(@RequestParam(required = false) String category) {
        List<Talent> talents = talentService.getTalentsByLastNameAsc(category);
        return ResponseEntity.ok(talents);
    }

    @GetMapping("/sort/last-name-desc")
    public ResponseEntity<List<Talent>> getTalentsByLastNameDesc(@RequestParam(required = false) String category) {
        List<Talent> talents = talentService.getTalentsByLastNameDesc(category);
        return ResponseEntity.ok(talents);
    }

    @GetMapping("/sort/fee-asc")
    public ResponseEntity<List<Talent>> getTalentsByFeeRangeAsc(@RequestParam(required = false) String category) {
        List<Talent> talents = talentService.getTalentsByFeeRangeAsc(category);
        return ResponseEntity.ok(talents);
    }

    @GetMapping("/sort/fee-desc")
    public ResponseEntity<List<Talent>> getTalentsByFeeRangeDesc(@RequestParam(required = false) String category) {
        List<Talent> talents = talentService.getTalentsByFeeRangeDesc(category);
        return ResponseEntity.ok(talents);
    }
}
