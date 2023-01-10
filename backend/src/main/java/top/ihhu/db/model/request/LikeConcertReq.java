package top.ihhu.db.model.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * @author: 卢利栋
 * @date: 2022/12/15 20:24
 */
@Data
public class LikeConcertReq {
    @NotNull(message = "演唱会编号不能为空")
    Integer cid;
}
