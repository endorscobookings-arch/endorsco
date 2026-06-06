package talent.endorsco.app.booking;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingRequestService {

    private final BookingRequestRepository repository;

    public BookingRequestService(BookingRequestRepository repository) {
        this.repository = repository;
    }

    public BookingRequest saveBookingRequest(BookingRequest request) {
        return repository.save(request);
    }

    public List<BookingRequest> getAllBookingRequests() {
        return repository.findAll();
    }

    public BookingRequest getBookingRequestById(Long id) {
        return repository.findById(id).orElse(null);
    }
}
