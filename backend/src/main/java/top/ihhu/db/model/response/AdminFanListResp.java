package top.ihhu.db.model.response;

import lombok.Data;
import top.ihhu.db.entity.Fan;

/**
 * @author: 卢利栋
 * @date: 2022/12/16 14:26
 */
@Data
public class AdminFanListResp extends Fan {
    Boolean created;
}
