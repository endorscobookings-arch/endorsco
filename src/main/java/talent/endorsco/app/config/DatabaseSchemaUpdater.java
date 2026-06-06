package talent.endorsco.app.config;

import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * Ensures legacy VARCHAR columns can store long text.
 * Hibernate ddl-auto=update does not always widen existing columns.
 */
@Component
public class DatabaseSchemaUpdater {

    private final JdbcTemplate jdbcTemplate;
    private final DataSourceProperties dataSourceProperties;

    public DatabaseSchemaUpdater(JdbcTemplate jdbcTemplate, DataSourceProperties dataSourceProperties) {
        this.jdbcTemplate = jdbcTemplate;
        this.dataSourceProperties = dataSourceProperties;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void widenTextColumns() {
        widen("talent", "bio");
        widen("talent", "fee_booking_details");
        widen("talent", "fee_booking_details_html");
        widen("talent_faq", "answer");
        widen("blog", "excerpt");
        widen("blog", "body_html");
        widen("blog", "body_text");
        widen("blog", "author_description");
    }

    private void widen(String table, String column) {
        try {
            if (isPostgreSql()) {
                jdbcTemplate.execute(
                        "ALTER TABLE " + table + " ALTER COLUMN " + column + " TYPE TEXT");
            } else {
                jdbcTemplate.execute(
                        "ALTER TABLE " + table + " MODIFY " + column + " LONGTEXT");
            }
        } catch (Exception ignored) {
            // Table/column may not exist yet; Hibernate will create it with LONGTEXT.
        }
    }

    private boolean isPostgreSql() {
        String url = dataSourceProperties.getUrl();
        return url != null && url.toLowerCase().contains("postgresql");
    }
}
