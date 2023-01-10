package top.ihhu.db.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.Concert;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.ihhu.db.model.response.ConcertLikeListResp;
import top.ihhu.db.model.response.SongLikeListResp;

import java.time.LocalDateTime;
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
public interface ConcertMapper extends BaseMapper<Concert> {
    IPage<ConcertLikeListResp> getConcertList(Page<ConcertLikeListResp> page,
                                              @Param("cstart") LocalDateTime cstart,
                                              @Param("cend") LocalDateTime cend,
                                              @Param("clocation") String clocation,
                                              @Param("bname") String bname,
                                              @Param("liked") Boolean liked);
    IPage<ConcertLikeListResp> getConcertLikeList(Page<ConcertLikeListResp> page,
                                                  @Param("cstart") LocalDateTime cstart,
                                                  @Param("cend") LocalDateTime cend,
                                                  @Param("clocation") String clocation,
                                                  @Param("bname") String bname);
    ConcertLikeListResp getOneConcert(@Param("cid") Integer cid);
   List<ConcertLikeListResp> getConcertListByBid(@Param("bid") String bid);
}
