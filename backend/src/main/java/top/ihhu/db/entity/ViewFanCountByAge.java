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
 * @since 2022-12-09
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("view_fan_count_by_age")
@ApiModel(value = "ViewFanCountByAge对象", description = "VIEW")
public class ViewFanCountByAge implements Serializable {

    private static final long serialVersionUID = 1L;

    private String ageScope;

    private Long cnt;


}
