package top.ihhu.db.model.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * @author: 卢利栋
 * @date: 2022/12/13 21:37
 */
@Data
public class AlbumSongSetReq {
    @NotNull(message = "专辑ID不能为空")
    Integer aid;
    String sid;
}
