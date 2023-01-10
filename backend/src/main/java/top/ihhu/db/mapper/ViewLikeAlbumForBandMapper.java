package top.ihhu.db.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.ViewLikeAlbumForBand;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.ihhu.db.model.response.FanListResp;

/**
 * <p>
 * VIEW Mapper 接口
 * </p>
 *
 * @author 作者
 * @since 2022-12-08
 */
@Mapper
public interface ViewLikeAlbumForBandMapper extends BaseMapper<ViewLikeAlbumForBand> {
    IPage<FanListResp> getFanList(Page<FanListResp> page, @Param("aid") Integer aid, @Param("fname") String fname, @Param("fjob") String fjob, @Param("fsex") String fsex);
}
