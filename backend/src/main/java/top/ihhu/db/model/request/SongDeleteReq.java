package top.ihhu.db.model.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * @author: 卢利栋
 * @date: 2022/12/12 21:47
 */
@Data
public class SongDeleteReq {
    @NotNull(message="歌曲编号不能为空")
    Integer sid;
}
