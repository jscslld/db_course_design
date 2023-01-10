package top.ihhu.db.model.request;

import lombok.Data;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;

/**
 * @author: 卢利栋
 * @date: 2022/12/10 11:10
 */
@Data
public class MemberListReq {
    Integer mid;
    String mname;
    String msex;
    Integer mageMin;
    Integer mageMax;
    String mjob;
    LocalDate menterMin;
    LocalDate menterMax;
    LocalDate mleave;
    Integer pageSize;
    Integer current;
    String sorter;
}
