package top.ihhu.db.model.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

/**
 * @author: 卢利栋
 * @date: 2022/12/9 12:32
 */
@Data
public class UserInfoBandResp {
    String bid;
    String bname;
    String role;
    Integer bhead;
    Integer bcnt;
    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate bestablish;
}
