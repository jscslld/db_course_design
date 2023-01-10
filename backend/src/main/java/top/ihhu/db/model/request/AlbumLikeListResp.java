package top.ihhu.db.model.request;

import lombok.Data;
import top.ihhu.db.model.response.AlbumListResp;

/**
 * @author: 卢利栋
 * @date: 2022/12/15 14:14
 */
@Data
public class AlbumLikeListResp extends AlbumListResp {
    Integer fanCnt;
    Boolean liked;
    String bname;
    String bid;
}
