package top.ihhu.db.model.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

/**
 * @author: 卢利栋
 * @date: 2022/12/14 13:13
 */
@Data
public class ConcertUpdateReq {
    @NotNull(message="演唱会编号不能为空")
    Integer cid;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @NotNull(message="开始时间不能为空")
    LocalDateTime cstart;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @NotNull(message="结束时间不能为空")
    LocalDateTime cend;
    @NotEmpty(message = "演唱会地点不能为空")
    String clocation;
    @NotNull(message = "演唱会人数不能为空")
    Integer climit;
}
