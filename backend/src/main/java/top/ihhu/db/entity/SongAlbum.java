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
 * @since 2022-12-12
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("song_album")
@ApiModel(value = "SongAlbum对象", description = "")
public class SongAlbum implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("歌曲编号")
    private Integer sid;

    @ApiModelProperty("专辑编号")
    private Integer aid;


}
