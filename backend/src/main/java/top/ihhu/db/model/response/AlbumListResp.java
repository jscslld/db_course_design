package top.ihhu.db.model.response;

import lombok.Data;

import java.time.LocalDate;

/**
 * @author: 卢利栋
 * @date: 2022/12/13 19:09
 */
@Data
public class AlbumListResp {
    Integer aid;
    String aname;
    String acompany;
    LocalDate adate;
    Integer cnt;
}