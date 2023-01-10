package top.ihhu.db.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.ViewConcertForBand;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.ihhu.db.model.response.ConcertListResp;
import top.ihhu.db.model.response.SongListResp;

import java.time.LocalDateTime;

/**
 * <p>
 * VIEW Mapper 接口
 * </p>
 *
 * @author 作者
 * @since 2022-12-08
 */
@Mapper
public interface ViewConcertForBandMapper extends BaseMapper<ViewConcertForBand> {
    IPage<ConcertListResp> getConcertList(Page<ConcertListResp> page,
                                       @Param("cstart") LocalDateTime cstart,
                                       @Param("cend") LocalDateTime cend,
                                       @Param("clocation") String clocation);
    Integer deleteConcert(@Param("cid") Integer cid);
    Integer updateConcert(@Param("cid") Integer cid,@Param("cstart") LocalDateTime cstart,@Param("cend") LocalDateTime cend,@Param("clocation") String clocation,@Param("climit") Integer climit);
    Integer insertConcert(@Param("cstart") LocalDateTime cstart,@Param("cend") LocalDateTime cend,@Param("clocation") String clocation,@Param("climit") Integer climit,@Param("cband") String cband);
}
