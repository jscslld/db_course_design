package top.ihhu.db.model.request;

import lombok.Data;

/**
 * @author: 卢利栋
 * @date: 2022/12/15 15:19
 */
@Data
public class SongListLikeReq {
    String sname;
    String mname;
    String bname;
    Boolean liked;
    Integer pageSize;
    Integer current;
}
