package top.ihhu.db.mapper;

import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.ViewSongSheetForBand;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.ihhu.db.model.response.AlbumSongListReq;

import java.util.List;

/**
 * <p>
 * VIEW Mapper 接口
 * </p>
 *
 * @author 作者
 * @since 2022-12-08
 */
@Mapper
public interface ViewSongSheetForBandMapper extends BaseMapper<ViewSongSheetForBand> {
    List<AlbumSongListReq> listConcertSong(@Param("cid") Integer cid);
}
