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
@TableName("view_like_song_for_fan")
@ApiModel(value = "ViewLikeSongForFan对象", description = "VIEW")
public class ViewLikeSongForFan implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("歌迷编号")
    private String fid;

    @ApiModelProperty("歌曲编号")
    private Integer sid;


}
