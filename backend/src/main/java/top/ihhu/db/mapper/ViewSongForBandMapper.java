package top.ihhu.db.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.ViewSongForBand;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.ihhu.db.model.response.BandMemberResp;
import top.ihhu.db.model.response.SearchBandMemberResp;
import top.ihhu.db.model.response.SongListResp;

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
public interface ViewSongForBandMapper extends BaseMapper<ViewSongForBand> {
    IPage<SongListResp> getSongList(Page<SongListResp> page,
                                    @Param("sname") String sname,
                                    @Param("authorName") String authorName);
    Integer updateSong(@Param("sid") Integer sid,@Param("sname") String sname,@Param("sauthor") Integer sauthor);
    Integer deleteSong(@Param("sid") Integer sid);
    Integer insertSong(@Param("sname") String sname,@Param("sauthor") Integer sauthor);
    List<SearchBandMemberResp> searchSongList();
}
