package top.ihhu.db.entity;

import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author 作者
 * @since 2022-12-08
 */
@Getter
@Setter
@Accessors(chain = true)
@ApiModel(value = "Fan对象", description = "")
public class Fan implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("歌迷编号")
    private String fid;

    @ApiModelProperty("姓名")
    private String fname;

    @ApiModelProperty("性别")
    private String fsex;

    @ApiModelProperty("年龄")
    private Integer fage;

    @ApiModelProperty("工作")
    private String fjob;


}
