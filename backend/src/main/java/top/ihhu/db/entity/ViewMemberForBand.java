package top.ihhu.db.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.time.LocalDate;
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
 * @since 2022-12-08
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("view_member_for_band")
@ApiModel(value = "ViewMemberForBand对象", description = "VIEW")
public class ViewMemberForBand implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("成员编号")
    private Integer mid;

    @ApiModelProperty("姓名")
    private String mname;

    @ApiModelProperty("性别")
    private String msex;

    @ApiModelProperty("年龄")
    private Integer mage;

    @ApiModelProperty("分工")
    private String mjob;

    @ApiModelProperty("加入时间")
    private LocalDate menter;

    @ApiModelProperty("离开时间")
    private LocalDate mleave;

    @ApiModelProperty("所属乐队")
    private String mband;


}
