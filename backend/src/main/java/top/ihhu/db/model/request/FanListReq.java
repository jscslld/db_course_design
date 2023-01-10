package top.ihhu.db.model.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

/**
 * @author: 卢利栋
 * @date: 2022/12/14 19:47
 */
@Data
public class FanListReq {
        String fname;
        String fsex;
        String fjob;
        Integer pageSize;
        Integer current;
}
