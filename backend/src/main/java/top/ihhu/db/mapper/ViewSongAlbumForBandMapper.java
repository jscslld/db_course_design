package top.ihhu.db.mapper;

import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.ViewSongAlbumForBand;
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
 * @since 2022-12-12
 */
@Mapper
public interface ViewSongAlbumForBandMapper extends BaseMapper<ViewSongAlbumForBand> {
    List<AlbumSongListReq> listAlbumSong(@Param("aid") Integer aid);
}
