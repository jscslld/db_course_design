package top.ihhu.db.model.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * @author: 卢利栋
 * @date: 2022/12/15 14:13
 */
@Data
public class LikeAlbumReq {
    @NotNull(message = "专辑编号不能为空")
    Integer aid;
}
