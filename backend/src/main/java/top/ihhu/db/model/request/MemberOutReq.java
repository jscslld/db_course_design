package top.ihhu.db.model.request;
import lombok.Data;

import javax.validation.constraints.NotEmpty;

/**
 * @author: 卢利栋
 * @date: 2022/12/10 11:10
 */
@Data
public class MemberOutReq {
    @NotEmpty(message="成员编号不能为空")
    Integer mid;
}

