package top.ihhu.db.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.ihhu.db.entity.Album;
import top.ihhu.db.entity.Band;
import top.ihhu.db.entity.ViewAlbumForBand;
import top.ihhu.db.entity.ViewLikeBandForFan;
import top.ihhu.db.mapper.*;
import top.ihhu.db.model.request.*;
import top.ihhu.db.model.response.*;
import top.ihhu.db.util.ApiResult;
import top.ihhu.db.util.PageResult;

import java.util.List;

/**
 * @author: 卢利栋
 * @date: 2022/12/15 10:35
 */
@RestController
@RequestMapping("/band")
@Api(tags = "乐队相关接口")
public class BandController {
    @Autowired
    BandMapper bandMapper;
    @Autowired
    MemberMapper memberMapper;
    @Autowired
    AlbumMapper albumMapper;
    @Autowired
    SongMapper songMapper;
    @Autowired
    ConcertMapper concertMapper;
    @Autowired
    ViewLikeBandForFanMapper likeBandMapper;
    @SaCheckLogin
    @SaCheckRole("fan")
    @GetMapping("/fan/list")
    @ApiOperation(value = "列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<BandListResp>> list(BandListReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        Page<BandListResp> page = new Page<>(param.getCurrent(), param.getPageSize());
        IPage<BandListResp> bandList = bandMapper.getBandList(
                page,
                param.getBname(),
                param.getLiked(),
                param.getHeadName()
                );
        return new PageResult<>(200,"操作成功",bandList.getRecords(), true, bandList.getTotal());
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @GetMapping("/fan/list/like")
    @ApiOperation(value = "喜欢列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<BandListResp>> listLike(BandListReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        Page<BandListResp> page = new Page<>(param.getCurrent(), param.getPageSize());
        IPage<BandListResp> bandList = bandMapper.getBandLikeList(
                page,
                param.getBname(),
                param.getHeadName()
        );
        return new PageResult<>(200,"操作成功",bandList.getRecords(), true, bandList.getTotal());
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @PostMapping("/fan/like")
    @ApiOperation(value = "喜欢", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> like(LikeBandReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!bandMapper.exists(new LambdaQueryWrapper<Band>().eq(Band::getBid,param.getBid()))){
            return ApiResult.fail(403,"乐队不存在");
        }
        if(likeBandMapper.exists(new LambdaQueryWrapper<ViewLikeBandForFan>().eq(ViewLikeBandForFan::getBid,param.getBid()))){
            return ApiResult.fail(403,"不能喜欢同一个乐队多次");
        }
        ViewLikeBandForFan tmp = new ViewLikeBandForFan();
        tmp.setBid(param.getBid());
        tmp.setFid(StpUtil.getLoginIdAsString());
        likeBandMapper.insert(tmp);
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @PostMapping("/fan/dislike")
    @ApiOperation(value = "不喜欢", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> dislike(LikeBandReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!bandMapper.exists(new LambdaQueryWrapper<Band>().eq(Band::getBid,param.getBid()))){
            return ApiResult.fail(403,"乐队不存在");
        }
        if(!likeBandMapper.exists(new LambdaQueryWrapper<ViewLikeBandForFan>().eq(ViewLikeBandForFan::getBid,param.getBid()))){
            return ApiResult.fail(403,"您没有喜欢过该乐队");
        }
        likeBandMapper.delete(new LambdaQueryWrapper<ViewLikeBandForFan>().eq(ViewLikeBandForFan::getBid,param.getBid()).eq(ViewLikeBandForFan::getFid,StpUtil.getLoginIdAsString()));
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @GetMapping("/fan/get")
    @ApiOperation(value = "获取信息", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<FanGetBandResp> getOne(FanGetBandInfoReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!bandMapper.exists(new LambdaQueryWrapper<Band>().eq(Band::getBid,param.getBid()))){
            return ApiResult.fail(403,"乐队不存在");
        }
        BandListResp basicInfo = bandMapper.getBandInfo(param.getBid());
        List<BandMemberResp> inMember = memberMapper.getInBandMemberList(param.getBid());
        List<BandMemberResp> outMember = memberMapper.getOutBandMemberList(param.getBid());
        List<AlbumLikeListResp> albumList = albumMapper.getAlbumListByBid(param.getBid());
        List<SongLikeListResp> songList = songMapper.getSongListByBid(param.getBid());
        List<ConcertLikeListResp> concertList = concertMapper.getConcertListByBid(param.getBid());

        FanGetBandResp resp = new FanGetBandResp();
        resp.setInfo(basicInfo);
        resp.setAlbumList(albumList);
        resp.setConcertList(concertList);
        resp.setInMember(inMember);
        resp.setOutMember(outMember);
        resp.setSongList(songList);
        return ApiResult.data(resp);
    }
}
