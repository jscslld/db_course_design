package top.ihhu.db.model.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

/**
 * @author: 卢利栋
 * @date: 2022/12/14 19:17
 */
@Data
public class ConcertParticipateListReq {
        @NotNull(message = "演唱会编号不能为空")
        Integer cid;
        String fname;
        String fsex;
        String fjob;
        Integer pageSize;
        Integer current;
}
