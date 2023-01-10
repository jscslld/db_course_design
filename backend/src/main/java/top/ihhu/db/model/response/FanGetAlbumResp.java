package top.ihhu.db.model.response;

import lombok.Data;
import top.ihhu.db.model.request.AlbumLikeListResp;

import java.util.List;

/**
 * @author: 卢利栋
 * @date: 2022/12/16 13:04
 */
@Data
public class FanGetAlbumResp {
    AlbumLikeListResp info;
    List<AlbumSongListResp> sheet;
}

