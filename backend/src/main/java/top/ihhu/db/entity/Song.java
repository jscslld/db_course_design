package top.ihhu.db.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
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
@ApiModel(value = "Song对象", description = "")
public class Song implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("歌曲编号")
    @TableId(value = "sid", type = IdType.AUTO)
    private Integer sid;

    @ApiModelProperty("歌曲名称")
    private String sname;

    @ApiModelProperty("创作者编号")
    private Integer sauthor;



}
