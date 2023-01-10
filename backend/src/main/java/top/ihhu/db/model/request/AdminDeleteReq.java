package top.ihhu.db.model.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

/**
 * @author: 卢利栋
 * @date: 2022/12/16 16:06
*/
@Data
public class AdminDeleteReq {
    @NotEmpty(message = "编号不能为空")
    String id;
}
