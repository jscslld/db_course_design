package top.ihhu.db.model.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * @author: 卢利栋
 * @date: 2022/12/14 20:14
 */
@Data
public class FanListSongReq extends FanListReq{
    @NotNull(message = "歌曲编号不能为空")
    Integer sid;
}

