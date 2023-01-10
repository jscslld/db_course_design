package top.ihhu.db.mapper;

import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.SongSheet;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.ihhu.db.model.response.ConcertSongListResp;
import top.ihhu.db.model.response.SongSheetResp;

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
public interface SongSheetMapper extends BaseMapper<SongSheet> {
 List<SongSheetResp> getSongSheetByCid(@Param("cid") Integer cid);
 List<ConcertSongListResp> getConcertContainCid(@Param("sid") Integer sid);
}
