package top.ihhu.db.entity;

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
@ApiModel(value = "Band对象", description = "")
public class Band implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("乐队编号")
    private String bid;

    @ApiModelProperty("乐队名称")
    private String bname;

    @ApiModelProperty("创立时间")
    private LocalDate bestablish;

    @ApiModelProperty("队长")
    private Integer bhead;
    @ApiModelProperty("总人数")
    private Integer cnt;


}
