package top.ihhu.db.model.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;

/**
 * @author: 卢利栋
 * @date: 2022/12/16 16:42
 */
@Data
public class BandUpdateInfoReq {
    @ApiModelProperty("乐队名称")
    @NotEmpty(message = "乐队名称不能为空")
    private String bname;
    @ApiModelProperty("创立时间")
    @NotEmpty(message = "创立时间不能为空")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private LocalDate bestablish;
    @ApiModelProperty("队长ID")
    private Integer bhead;
}
