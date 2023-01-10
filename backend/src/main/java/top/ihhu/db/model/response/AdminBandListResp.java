package top.ihhu.db.model.response;

import lombok.Data;
import top.ihhu.db.entity.Band;

/**
 * @author: 卢利栋
 * @date: 2022/12/16 14:17
 */
@Data
public class AdminBandListResp extends Band {
    Boolean created;
}
