package top.ihhu.db.model.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

/**
 * @author: 卢利栋
 * @date: 2022/12/13 19:36
 */
@Data
public class AlbumDeleteReq {
    @NotEmpty(message="专辑编号不能为空")
    Integer aid;
}
