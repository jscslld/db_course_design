package top.ihhu.db.model.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

/**
 * @author: 卢利栋
 * @date: 2022/12/12 21:59
 */
@Data
public class SongAddReq {
    @NotEmpty(message="歌曲姓名不能为空")
    String sname;
    @NotEmpty(message="歌曲作者不能为空")
    Integer sauthor;
}
