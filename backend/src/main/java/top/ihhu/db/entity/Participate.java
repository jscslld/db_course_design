package top.ihhu.db.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
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
@ApiModel(value = "Participate对象", description = "")
public class Participate implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("演唱会编号")
    private Integer cid;

    @ApiModelProperty("歌迷编号")
    private String fid;

    @ApiModelProperty("报名时间")
    private LocalDateTime ptime;


}
