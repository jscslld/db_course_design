package top.ihhu.db.mapper;

import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.SongAlbum;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.ihhu.db.model.request.AlbumLikeListResp;
import top.ihhu.db.model.response.AlbumSongListResp;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author 作者
 * @since 2022-12-12
 */
@Mapper
public interface SongAlbumMapper extends BaseMapper<SongAlbum> {
    List<AlbumLikeListResp> getAlbumContainCid(@Param("sid") Integer sid);
    List<AlbumSongListResp> getAlbumSongList(@Param("aid") Integer aid);
}
