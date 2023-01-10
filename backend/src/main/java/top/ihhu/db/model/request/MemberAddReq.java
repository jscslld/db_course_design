package top.ihhu.db.model.request;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

/**
 * @author: 卢利栋
 * @date: 2022/12/10 11:10
 */
@Data
public class MemberAddReq {
    @NotEmpty(message="成员姓名不能为空")
    String mname;
    @NotEmpty(message="成员性别不能为空")
    String msex;
    @NotNull(message="成员年龄不能为空")
    Integer mage;
    @NotEmpty(message="成员分工不能为空")
    String mjob;
    @NotNull(message="加入时间不能为空")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate menter;
}

