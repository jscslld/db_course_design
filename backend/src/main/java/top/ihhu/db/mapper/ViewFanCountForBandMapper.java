package top.ihhu.db.mapper;

import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.ViewFanCountForBand;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.ihhu.db.model.response.FanCountAgeResp;

import java.util.List;

/**
 * <p>
 * VIEW Mapper 接口
 * </p>
 *
 * @author 作者
 * @since 2022-12-09
 */
@Mapper
public interface ViewFanCountForBandMapper extends BaseMapper<ViewFanCountForBand> {
        Integer countFanNumber(@Param("bid") String bid);
}
