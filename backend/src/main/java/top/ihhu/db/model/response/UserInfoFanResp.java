package top.ihhu.db.model.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

/**
 * @author: 卢利栋
 * @date: 2022/12/15 10:04
 */
@Data
public class UserInfoFanResp {
    String fid;
    String fname;
    String role;
    String fjob;
    String fsex;
    Integer fage;
}

