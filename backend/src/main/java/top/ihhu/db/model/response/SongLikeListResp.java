package top.ihhu.db.model.response;
import lombok.Data;

/**
 * @author: 卢利栋
 * @date: 2022/12/15 15:13
 */
@Data
public class SongLikeListResp{
    Integer sid;
    String sname;
    String mname;
    Integer mid;
    Integer fanCnt;
    Boolean liked;
    String bname;
    String bid;
}
