package top.ihhu.db.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
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
@ApiModel(value = "Concert对象", description = "")
public class Concert implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("演唱会编号")
    @TableId(value = "cid", type = IdType.AUTO)
    private Integer cid;

    @ApiModelProperty("开始时间")
    private LocalDateTime cstart;

    @ApiModelProperty("结束时间")
    private LocalDateTime cend;

    @ApiModelProperty("举办地点")
    private String clocation;

    @ApiModelProperty("举办乐队")
    private String cband;

    @ApiModelProperty("人数上限")
    private Integer climit;


}
