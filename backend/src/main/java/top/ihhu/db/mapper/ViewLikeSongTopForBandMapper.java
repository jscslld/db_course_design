package top.ihhu.db.mapper;

import top.ihhu.db.entity.ViewLikeSongTopForBand;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.ihhu.db.model.response.SongLikeCountResp;

import java.util.ArrayList;

/**
 * <p>
 * VIEW Mapper 接口
 * </p>
 *
 * @author 作者
 * @since 2022-12-09
 */
@Mapper
public interface ViewLikeSongTopForBandMapper extends BaseMapper<ViewLikeSongTopForBand> {
    ArrayList<SongLikeCountResp> getLikeTop10();
}
