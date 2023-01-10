package top.ihhu.db.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.Member;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.ihhu.db.model.response.BandMemberResp;

import java.time.LocalDate;
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
public interface MemberMapper extends BaseMapper<Member> {
    List<BandMemberResp> getInBandMemberList(@Param("bid") String bid);
    List<BandMemberResp> getOutBandMemberList(@Param("bid") String bid);
}
