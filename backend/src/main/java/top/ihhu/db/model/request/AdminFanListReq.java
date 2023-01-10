package top.ihhu.db.model.request;

import lombok.Data;

/**
 * @author: 卢利栋
 * @date: 2022/12/16 14:27
 */
@Data
public class AdminFanListReq {
    String fid;
    String fname;
    Integer pageSize;
    Integer current;
}
