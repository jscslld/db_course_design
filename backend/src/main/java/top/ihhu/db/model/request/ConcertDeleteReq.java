package top.ihhu.db.model.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * @author: 卢利栋
 * @date: 2022/12/14 13:09
 */
@Data
public class ConcertDeleteReq {
    @NotNull(message="演唱会编号不能为空")
    Integer cid;
}
