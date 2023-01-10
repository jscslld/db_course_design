package top.ihhu.db.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.Band;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.ihhu.db.model.response.AdminBandListResp;
import top.ihhu.db.model.response.BandListResp;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author 作者
 * @since 2022-12-08
 */
@Mapper
public interface BandMapper extends BaseMapper<Band> {
    IPage<BandListResp> getBandList(Page<BandListResp> page, @Param("bname") String bname, @Param("liked") Boolean liked, @Param("headName") String headName);
    IPage<BandListResp> getBandLikeList(Page<BandListResp> page, @Param("bname") String bname, @Param("headName") String headName);
    BandListResp getBandInfo(@Param("bid") String bid);

    IPage<AdminBandListResp> adminGetBandList(Page<AdminBandListResp> page, @Param("bname") String bname, @Param("bid") String bid);
}
