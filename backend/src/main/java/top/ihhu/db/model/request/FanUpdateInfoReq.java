package top.ihhu.db.model.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * @author: 卢利栋
 * @date: 2022/12/16 16:36
 */
@Data
public class FanUpdateInfoReq {
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
}
