package top.ihhu.db.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.ViewAlbumForBand;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.ihhu.db.model.response.AlbumListResp;
import top.ihhu.db.model.response.AlbumSongListReq;

import java.time.LocalDate;
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
public interface ViewAlbumForBandMapper extends BaseMapper<ViewAlbumForBand> {
    IPage<AlbumListResp> getAlbumList(Page<AlbumListResp> page,
                                    @Param("aname") String aname,
                                    @Param("acompany") String acompany);
    Integer updateAlbum(@Param("aid") Integer aid,@Param("aname") String aname,@Param("acompany") String acompany,@Param("adate") LocalDate adate);
    Integer deleteAlbum(@Param("aid") Integer aid);
    Integer insertAlbum(@Param("aname") String aname,@Param("acompany") String acompany,@Param("adate") LocalDate adate,@Param("aband") String aband);
}
