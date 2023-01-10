package top.ihhu.db.model.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * @author: 卢利栋
 * @date: 2022/12/14 13:46
 */
@Data
public class ConcertSongSetReq {

        @NotNull(message = "演唱会ID不能为空")
        Integer cid;
        String sid;
}
