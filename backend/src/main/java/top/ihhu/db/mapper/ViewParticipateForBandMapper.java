package top.ihhu.db.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.ViewParticipateForBand;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.ihhu.db.model.response.ConcertParticipateListResp;
import top.ihhu.db.model.response.SongListResp;

/**
 * <p>
 * VIEW Mapper 接口
 * </p>
 *
 * @author 作者
 * @since 2022-12-08
 */
@Mapper
public interface ViewParticipateForBandMapper extends BaseMapper<ViewParticipateForBand> {
    IPage<ConcertParticipateListResp> getParticipateList(Page<ConcertParticipateListResp> page,
                                                  @Param("cid") Integer cid, @Param("fname") String fname, @Param("fjob") String fjob, @Param("fsex") String fsex
                                                         );
}
