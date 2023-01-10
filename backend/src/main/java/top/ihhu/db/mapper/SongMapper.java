package top.ihhu.db.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.Song;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.ihhu.db.model.request.AlbumLikeListResp;
import top.ihhu.db.model.response.SongLikeListResp;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author 作者
 * @since 2022-12-08
 */
@Mapper
public interface SongMapper extends BaseMapper<Song> {
    IPage<SongLikeListResp> getSongList(Page<SongLikeListResp> page, @Param("sname") String sname, @Param("mname") String mname, @Param("bname") String bname,@Param("liked") Boolean liked);
    IPage<SongLikeListResp> getSongLikeList(Page<SongLikeListResp> page, @Param("sname") String sname, @Param("mname") String mname, @Param("bname") String bname);
    SongLikeListResp getSongInfo(@Param("sid") Integer sid);
    List<SongLikeListResp> getSongListByBid(@Param("bid") String bid);

}
