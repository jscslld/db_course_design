package top.ihhu.db.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import java.time.LocalDate;
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
@ApiModel(value = "Album对象", description = "")
public class Album implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("专辑编号")
    @TableId(value = "aid", type = IdType.AUTO)
    private Integer aid;

    @ApiModelProperty("专辑名称")
    private String aname;

    @ApiModelProperty("发行公司")
    private String acompany;

    @ApiModelProperty("发表时间")
    private LocalDate adate;

    @ApiModelProperty("发行乐队")
    private String aband;


}
