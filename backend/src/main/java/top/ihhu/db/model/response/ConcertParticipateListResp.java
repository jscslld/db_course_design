package top.ihhu.db.model.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

/**
 * @author: 卢利栋
 * @date: 2022/12/14 19:19
 */
@Data
public class ConcertParticipateListResp {
    String fid;
    String fname;
    String fsex;
    String fjob;
    Integer fage;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime ptime;
}
