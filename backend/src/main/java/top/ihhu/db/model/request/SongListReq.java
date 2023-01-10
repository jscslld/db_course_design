package top.ihhu.db.model.request;

import lombok.Data;

import java.time.LocalDate;

/**
 * @author: 卢利栋
 * @date: 2022/12/11 16:32
 */
@Data
public class SongListReq {
    String sname;
    String authorName;
    Boolean liked;
    Integer pageSize;
    Integer current;
}
