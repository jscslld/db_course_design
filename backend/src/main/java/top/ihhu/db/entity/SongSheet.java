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
 * 
 * </p>
 *
 * @author 作者
 * @since 2022-12-08
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("song_sheet")
@ApiModel(value = "SongSheet对象", description = "")
public class SongSheet implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("演唱会编号")
    private Integer cid;

    @ApiModelProperty("歌曲编号")
    private Integer sid;

    @ApiModelProperty("顺序")
    private Integer sindex;


}
