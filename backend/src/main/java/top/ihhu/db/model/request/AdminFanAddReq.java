package top.ihhu.db.model.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * @author: 卢利栋
 * @date: 2022/12/16 15:32
 */
@Data
public class AdminFanAddReq {
    @NotEmpty(message = "歌迷编号不能为空")
    @ApiModelProperty("歌迷编号")
    private String fid;

    @ApiModelProperty("姓名")
    @NotEmpty(message = "歌迷姓名不能为空")
    private String fname;

    @ApiModelProperty("性别")
    @NotEmpty(message = "歌迷性别不能为空")
    private String fsex;

    @ApiModelProperty("年龄")
    @NotNull(message = "歌迷年龄不能为空")
    private Integer fage;

    @ApiModelProperty("工作")
    private String fjob;
    @ApiModelProperty("密码")
    @NotEmpty(message = "密码不能为空")
    private String password;
}
