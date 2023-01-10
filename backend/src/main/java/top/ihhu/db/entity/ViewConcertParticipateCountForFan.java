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
@TableName("view_concert_participate_count_for_fan")
@ApiModel(value = "ViewConcertParticipateCountForFan对象", description = "VIEW")
public class ViewConcertParticipateCountForFan implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("演唱会编号")
    private Integer cid;

    private Long cnt;


}
