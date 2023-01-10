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
 * @since 2022-12-08
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("view_song_for_band")
@ApiModel(value = "ViewSongForBand对象", description = "VIEW")
public class ViewSongForBand implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("歌曲编号")
    private Integer sid;

    @ApiModelProperty("歌曲名称")
    private String sname;

    @ApiModelProperty("创作者编号")
    private Integer sauthor;

    @ApiModelProperty("所属乐队")
    private String sband;


}
