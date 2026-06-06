package talent.endorsco.app.talent;

import java.util.List;

public class PaginatedResponse<T> {
    private List<T> data;
    private Pagination pagination;

    public PaginatedResponse(List<T> data, int page, int limit, long totalItems) {
        this.data = data;
        this.pagination = new Pagination(page, limit, totalItems);
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public Pagination getPagination() {
        return pagination;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }

    public static class Pagination {
        private int page;
        private int limit;
        private long totalItems;
        private int totalPages;

        public Pagination(int page, int limit, long totalItems) {
            this.page = page;
            this.limit = limit;
            this.totalItems = totalItems;
            this.totalPages = (int) Math.ceil((double) totalItems / limit);
        }

        public int getPage() {
            return page;
        }

        public void setPage(int page) {
            this.page = page;
        }

        public int getLimit() {
            return limit;
        }

        public void setLimit(int limit) {
            this.limit = limit;
        }

        public long getTotalItems() {
            return totalItems;
        }

        public void setTotalItems(long totalItems) {
            this.totalItems = totalItems;
        }

        public int getTotalPages() {
            return totalPages;
        }

        public void setTotalPages(int totalPages) {
            this.totalPages = totalPages;
        }
    }
}
