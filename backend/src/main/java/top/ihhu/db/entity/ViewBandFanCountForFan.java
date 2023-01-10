package top.ihhu.db.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

/**
 * <p>
 * VIEW
 * </p>
 *
 * @author 作者
 * @since 2022-12-15
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("view_band_fan_count_for_fan")
@ApiModel(value = "ViewBandFanCountForFan对象", description = "VIEW")
public class ViewBandFanCountForFan implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("乐队编号")
    private String bid;

    private Long cnt;


}
