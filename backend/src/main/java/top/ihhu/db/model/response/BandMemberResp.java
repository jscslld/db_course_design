package top.ihhu.db.model.response;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDate;

/**
 * @author: 卢利栋
 * @date: 2022/12/10 10:52
 */
@Data
public class BandMemberResp {
    private Integer mid;
    private String mname;
    private String msex;
    private Integer mage;
    private String mjob;
    private LocalDate menter;
    private LocalDate mleave;
}
