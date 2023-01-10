package top.ihhu.db.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import top.ihhu.db.entity.ViewMemberForBand;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.ihhu.db.model.request.MemberListReq;
import top.ihhu.db.model.response.BandMemberResp;
import top.ihhu.db.model.response.SearchBandMemberResp;

import java.time.LocalDate;
import java.util.List;

/**
 * <p>
 * VIEW Mapper 接口
 * </p>
 *
 * @author 作者
 * @since 2022-12-08
 */
@Mapper
public interface ViewMemberForBandMapper extends BaseMapper<ViewMemberForBand> {
    IPage<BandMemberResp> getInBandMemberList(Page<BandMemberResp> page,
                                            @Param("mid") Integer mid,
                                            @Param("mname") String mname,
                                            @Param("msex") String msex,
                                            @Param("mage_min") Integer mageMin,
                                            @Param("mage_max") Integer mageMax,
                                            @Param("mjob") String mjob,
                                            @Param("menter_min") LocalDate menterMin,
                                            @Param("menter_max") LocalDate menterMax,
                                              @Param("key") String key,
                                              @Param("type") String t
                                            );
    IPage<BandMemberResp> getOutBandMemberList(Page<BandMemberResp> page,
                                              @Param("mid") Integer mid,
                                              @Param("mname") String mname,
                                              @Param("msex") String msex,
                                              @Param("mage_min") Integer mageMin,
                                              @Param("mage_max") Integer mageMax,
                                              @Param("mjob") String mjob,
                                              @Param("menter_min") LocalDate menterMin,
                                              @Param("menter_max") LocalDate menterMax,
                                              @Param("key") String key,
                                              @Param("type") String t
    );
    Integer updateMemberInfo(@Param("mid") Integer mid,
                             @Param("mname") String mname,
                             @Param("msex") String msex,
                             @Param("mage") Integer mage,
                             @Param("mjob") String mjob,
                             @Param("menter") LocalDate menter);
    Integer insertMemberInfo(@Param("mband") String mband,
                             @Param("mname") String mname,
                             @Param("msex") String msex,
                             @Param("mage") Integer mage,
                             @Param("mjob") String mjob,
                             @Param("menter") LocalDate menter);
    Integer updateOutMember(@Param("mid") Integer mid);
    List<SearchBandMemberResp> searchInMemberByName();
    List<SearchBandMemberResp> searchOutMemberByName();
}
