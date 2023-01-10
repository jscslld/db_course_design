package top.ihhu.db.model.request;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;

/**
 * @author: 卢利栋
 * @date: 2022/12/13 19:36
 */
@Data
public class AlbumAddReq {
    @NotEmpty(message = "专辑名称不能为空")
    String aname;
    @NotEmpty(message = "发行公司不能为空")
    String acompany;
    @NotEmpty(message = "发行日期不能为空")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate adate;
}
