package top.ihhu.db.model.request;

import lombok.Data;

/**
 * @author: 卢利栋
 * @date: 2022/12/16 14:16
 */
@Data
public class AdminBandListReq {
    String bid;
    String bname;
    Integer pageSize;
    Integer current;
}
