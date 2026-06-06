package talent.endorsco.app.talent;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;

/**
 * Accepts feeRange as either a string label (legacy) or a full object.
 */
public class FeeRangeDeserializer extends JsonDeserializer<Talent.FeeRange> {

    @Override
    public Talent.FeeRange deserialize(JsonParser parser, DeserializationContext context) throws IOException {
        JsonNode node = parser.getCodec().readTree(parser);
        if (node == null || node.isNull()) {
            return null;
        }
        if (node.isTextual()) {
            Talent.FeeRange feeRange = new Talent.FeeRange();
            feeRange.setLabel(node.asText());
            return feeRange;
        }
        return parser.getCodec().treeToValue(node, Talent.FeeRange.class);
    }
}
