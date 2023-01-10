package top.ihhu.db.model.request;

import lombok.Data;

/**
 * @author: 卢利栋
 * @date: 2022/12/13 19:10
 */
@Data
public class AlbumListReq {
    String aname;
    String acompany;
    Boolean liked;
    Integer pageSize;
    Integer current;
}
