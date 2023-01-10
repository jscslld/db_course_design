package top.ihhu.db.model.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @author: 卢利栋
 * @date: 2022/12/8 11:21
 */
@Data
public class UserLoginReq {
    @NotBlank(message = "用户名不可以为空")
    @ApiModelProperty("用户名")
    private String username;
    @NotBlank(message = "密码不可以为空")
    @ApiModelProperty("密码")
    private String password;
    @NotBlank(message = "用户类型不可以为空")
    @ApiModelProperty("用户类型")
    private String userType;
}
