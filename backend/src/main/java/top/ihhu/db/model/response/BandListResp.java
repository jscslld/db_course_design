package top.ihhu.db.model.response;

import lombok.Data;

import java.time.LocalDate;

/**
 * @author: 卢利栋
 * @date: 2022/12/15 10:39
 */
@Data
public class BandListResp {
    String bid;
    String bname;
    Integer cnt;
    Integer fanCnt;
    Boolean liked;
    LocalDate bestablish;
    String headName;
    Integer headId;
}
