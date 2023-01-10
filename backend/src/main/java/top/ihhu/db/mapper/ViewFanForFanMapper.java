package top.ihhu.db.mapper;

import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.ViewBandForBand;
import top.ihhu.db.entity.ViewFanForFan;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * VIEW Mapper 接口
 * </p>
 *
 * @author 作者
 * @since 2022-12-15
 */
@Mapper
public interface ViewFanForFanMapper extends BaseMapper<ViewFanForFan> {
    ViewFanForFan getFanInfo(@Param("fid") String fid);
}
