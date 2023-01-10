package top.ihhu.db.mapper;

import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.ViewBandForBand;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * VIEW Mapper 接口
 * </p>
 *
 * @author 作者
 * @since 2022-12-08
 */
@Mapper
public interface ViewBandForBandMapper extends BaseMapper<ViewBandForBand> {
    ViewBandForBand getBandInfo(@Param("bid") String bid);
}
