package top.ihhu.db.model.response;

import lombok.Data;

import java.util.List;

/**
 * @author: 卢利栋
 * @date: 2022/12/16 10:50
 */
@Data
public class FanGetConcertResp {
    ConcertLikeListResp info;
    List<SongSheetResp> sheet;
}
