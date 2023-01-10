package top.ihhu.db.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.Album;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.ihhu.db.model.request.AlbumLikeListResp;
import top.ihhu.db.model.response.BandListResp;

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
public interface AlbumMapper extends BaseMapper<Album> {
    IPage<AlbumLikeListResp> getAlbumList(Page<AlbumLikeListResp> page, @Param("aname") String aname,@Param("acompany") String acompany, @Param("liked") Boolean liked);
    IPage<AlbumLikeListResp> getAlbumLikeList(Page<AlbumLikeListResp> page, @Param("aname") String aname,@Param("acompany") String acompany);
    AlbumLikeListResp getAlbumInfo(@Param("aid") Integer aid);
    List<AlbumLikeListResp> getAlbumListByBid(@Param("bid") String bid);
}
