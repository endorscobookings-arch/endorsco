package talent.endorsco.app.booking;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactInquiryService {

    private final ContactInquiryRepository repository;

    public ContactInquiryService(ContactInquiryRepository repository) {
        this.repository = repository;
    }

    public ContactInquiry saveContactInquiry(ContactInquiry inquiry) {
        return repository.save(inquiry);
    }

    public List<ContactInquiry> getAllContactInquiries() {
        return repository.findAll();
    }

    public ContactInquiry getContactInquiryById(Long id) {
        return repository.findById(id).orElse(null);
    }
}
