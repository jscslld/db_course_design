package top.ihhu.db.model.request;

import lombok.Data;

/**
 * @author: 卢利栋
 * @date: 2022/12/15 10:37
 */
@Data
public class BandListReq {
    String bname;
    Boolean liked;
    String headName;
    Integer pageSize;
    Integer current;
}
