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
@TableName("like_song")
@ApiModel(value = "LikeSong对象", description = "")
public class LikeSong implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("歌迷编号")
    private String fid;

    @ApiModelProperty("歌曲编号")
    private Integer sid;


}
