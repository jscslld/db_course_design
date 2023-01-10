package top.ihhu.db.model.response;

import lombok.Data;
import top.ihhu.db.model.request.AlbumLikeListResp;

import java.util.List;

/**
 * @author: 卢利栋
 * @date: 2022/12/16 12:36
 */
@Data
public class FanGetSongResp {
    SongLikeListResp info;
    List<ConcertSongListResp> concert;
    List<AlbumLikeListResp> album;
}
