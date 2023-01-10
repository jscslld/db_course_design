package top.ihhu.db.model.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

/**
 * @author: 卢利栋
 * @date: 2022/12/16 12:18
 */
@Data
public class ConcertSongListResp {
    Integer cid;
    String clocation;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime cstart;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime cend;
    Integer climit;
    Integer cnt;
    Boolean liked;
    String bname;
    Integer sindex;
    String bid;
}
