package talent.endorsco.app.whitelist;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WhitelistService {

    private final WhitelistRepository whitelistRepository;

    public WhitelistService(WhitelistRepository whitelistRepository) {
        this.whitelistRepository = whitelistRepository;
    }

    @Transactional
    public Whitelist saveWhitelist(Whitelist whitelist) {
        return whitelistRepository.save(whitelist);
    }

    public List<Whitelist> getAllWhitelists() {
        return whitelistRepository.findAll();
    }
}
