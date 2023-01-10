package top.ihhu.db.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.segments.MergeSegments;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.ihhu.db.entity.*;
import top.ihhu.db.mapper.*;
import top.ihhu.db.model.request.*;
import top.ihhu.db.model.response.*;
import top.ihhu.db.util.ApiResult;
import top.ihhu.db.util.PageResult;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.List;

/**
 * @author: 卢利栋
 * @date: 2022/12/14 12:48
 */
@RestController
@RequestMapping("/concert")
@Api(tags = "演唱会相关接口")
public class ConcertController {
    @Autowired
    ViewConcertForBandMapper concertMapper;
    @Autowired
    ViewParticipateForBandMapper participateMapper;
    @Autowired
    ViewSongSheetForBandMapper songSheetMapper;
    @Autowired
    ConcertMapper tconcertMapper;
    @Autowired
    ViewParticipateForFanMapper fparticipateMapper;
    @Autowired
    SongSheetMapper tsongSheetMapper;
    @SaCheckLogin
    @SaCheckRole("band")
    @GetMapping("/list")
    @ApiOperation(value = "列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<ConcertListResp>> list(ConcertListReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        Page<ConcertListResp> page = new Page<>(param.getCurrent(), param.getPageSize());
        IPage<ConcertListResp> albumList = concertMapper.getConcertList(
                page,
                param.getCstart(),
                param.getCend(),
                param.getClocation());
        return new PageResult<>(200,"操作成功",albumList.getRecords(), true, albumList.getTotal());
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @PostMapping("/update")
    @ApiOperation(value = "修改", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> update(ConcertUpdateReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(param.getCstart().isAfter(param.getCstart())){
            return ApiResult.fail(500,"开始时间不能晚于结束时间");
        }
        if(param.getClimit() < participateMapper.selectCount(new LambdaQueryWrapper<ViewParticipateForBand>().eq(ViewParticipateForBand::getCid,param.getCid()))){
            return ApiResult.fail(403,"演唱会人数上限不得小于已报名人数");
        }
        if(!concertMapper.exists(new LambdaQueryWrapper<ViewConcertForBand>().eq(ViewConcertForBand::getCid,param.getCid()))){
            return ApiResult.fail(403,"演唱会不存在");
        }
        concertMapper.updateConcert(param.getCid(), param.getCstart(), param.getCend(),param.getClocation(),param.getClimit());
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @PostMapping("/delete")
    @ApiOperation(value = "删除", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> delete(ConcertDeleteReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!concertMapper.exists(new LambdaQueryWrapper<ViewConcertForBand>().eq(ViewConcertForBand::getCid,param.getCid()))){
            return ApiResult.fail(403,"演唱会不存在");
        }
        concertMapper.deleteConcert(param.getCid());
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @PostMapping("/add")
    @ApiOperation(value = "添加", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> update(ConcertAddReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(param.getCstart().isAfter(param.getCstart())){
            return ApiResult.fail(500,"开始时间不能晚于结束时间");
        }
        if(param.getClimit() <= 0){
            return ApiResult.fail(500,"人数上限必须为正整数");
        }
        concertMapper.insertConcert(param.getCstart(), param.getCend(),param.getClocation(),param.getClimit(),StpUtil.getLoginIdAsString());
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @GetMapping("/song/list")
    @ApiOperation(value = "歌曲清单", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<List<AlbumSongListReq>> songList(ConcertDeleteReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!concertMapper.exists(new LambdaQueryWrapper<ViewConcertForBand>().eq(ViewConcertForBand::getCid,param.getCid()))){
            return ApiResult.fail(403,"演唱会不存在");
        }
        return ApiResult.data(songSheetMapper.listConcertSong(param.getCid()));
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @PostMapping("/song/set")
    @ApiOperation(value = "维护歌曲清单", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> songList(ConcertSongSetReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!concertMapper.exists(new LambdaQueryWrapper<ViewConcertForBand>().eq(ViewConcertForBand::getCid,param.getCid()))){
            return ApiResult.fail(403,"演唱会不存在");
        }
        List<String> sids = List.of(param.getSid().split(","));
        LinkedHashSet<String> hashSet = new LinkedHashSet<>(sids);
        if(sids.size() != hashSet.size()){
            return ApiResult.fail(403,"存在重复歌曲，请检查");
        }
        songSheetMapper.delete(new LambdaQueryWrapper<ViewSongSheetForBand>().eq(ViewSongSheetForBand::getCid,param.getCid()));
        if("".equals(param.getSid())){
            return ApiResult.success();
        }
        int index = 1;
        for (String sid:sids) {
            ViewSongSheetForBand t = new ViewSongSheetForBand();
            t.setCid(param.getCid());
            t.setSid(Integer.parseInt(sid));
            t.setSindex(index);
            songSheetMapper.insert(t);
            index += 1;
        }
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @GetMapping("/participate/list")
    @ApiOperation(value = "报名列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<ConcertParticipateListResp>> list(ConcertParticipateListReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        if(!concertMapper.exists(new LambdaQueryWrapper<ViewConcertForBand>().eq(ViewConcertForBand::getCid,param.getCid()))){
            return new PageResult<>(403,"演唱会不存在",null,false,0);
        }
        Page<ConcertParticipateListResp> page = new Page<>(param.getCurrent(), param.getPageSize());
        IPage<ConcertParticipateListResp> participateList = participateMapper.getParticipateList(
                page,
                param.getCid(),param.getFname(),param.getFjob(),param.getFsex());
        return new PageResult<>(200,"操作成功",participateList.getRecords(), true, participateList.getTotal());
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @GetMapping("/fan/list")
    @ApiOperation(value = "列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<ConcertLikeListResp>> flist(ConcertListReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        Page<ConcertLikeListResp> page = new Page<>(param.getCurrent(), param.getPageSize());
        IPage<ConcertLikeListResp> bandList = tconcertMapper.getConcertList(
                page,
                param.getCstart(),
                param.getCend(),
                param.getClocation(),
                param.getBname(),
                param.getLiked()
        );
        return new PageResult<>(200,"操作成功",bandList.getRecords(), true, bandList.getTotal());
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @GetMapping("/fan/list/like")
    @ApiOperation(value = "喜欢列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<ConcertLikeListResp>> flistLike(ConcertListReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        Page<ConcertLikeListResp> page = new Page<>(param.getCurrent(), param.getPageSize());
        IPage<ConcertLikeListResp> bandList = tconcertMapper.getConcertLikeList(
                page,
                param.getCstart(),
                param.getCend(),
                param.getClocation(),
                param.getBname()
        );
        return new PageResult<>(200,"操作成功",bandList.getRecords(), true, bandList.getTotal());
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @PostMapping("/fan/like")
    @ApiOperation(value = "喜欢", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> like(LikeConcertReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!tconcertMapper.exists(new LambdaQueryWrapper<Concert>().eq(Concert::getCid,param.getCid()))){
            return ApiResult.fail(403,"演唱会不存在");
        }
        if(fparticipateMapper.exists(new LambdaQueryWrapper<ViewParticipateForFan>().eq(ViewParticipateForFan::getCid,param.getCid()))){
            return ApiResult.fail(403,"不能报名同一个演唱会多次");
        }
        ConcertLikeListResp basicInfo = tconcertMapper.getOneConcert(param.getCid());
        if(basicInfo.getCend().isBefore(LocalDateTime.now())){
            return ApiResult.fail(500,"演唱会已结束，无法报名");
        }
        ViewParticipateForFan tmp = new ViewParticipateForFan();
        tmp.setCid(param.getCid());
        tmp.setFid(StpUtil.getLoginIdAsString());
        tmp.setPtime(LocalDateTime.now());
        try{
            fparticipateMapper.insert(tmp);
        }catch (UncategorizedSQLException e){
            if("45000".equals(e.getSQLException().getSQLState())){
                return ApiResult.fail(500,"报名人数已经达到上限");
            }
        }
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @PostMapping("/fan/dislike")
    @ApiOperation(value = "不喜欢", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> dislike(LikeConcertReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!tconcertMapper.exists(new LambdaQueryWrapper<Concert>().eq(Concert::getCid,param.getCid()))){
            return ApiResult.fail(403,"演唱会不存在");
        }
        if(!fparticipateMapper.exists(new LambdaQueryWrapper<ViewParticipateForFan>().eq(ViewParticipateForFan::getCid,param.getCid()))){
            return ApiResult.fail(403,"不能报名同一个演唱会多次");
        }
        ConcertLikeListResp basicInfo = tconcertMapper.getOneConcert(param.getCid());
        if(basicInfo.getCstart().isBefore(LocalDateTime.now())){
            return ApiResult.fail(500,"演唱会已开始，无法取消报名");
        }
        fparticipateMapper.delete(new LambdaQueryWrapper<ViewParticipateForFan>().eq(ViewParticipateForFan::getCid,param.getCid()).eq(ViewParticipateForFan::getFid,StpUtil.getLoginIdAsString()));
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @GetMapping("/fan/get")
    @ApiOperation(value = "获取信息", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<FanGetConcertResp> getOne(FanGetConcertInfoReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!tconcertMapper.exists(new LambdaQueryWrapper<Concert>().eq(Concert::getCid,param.getCid()))){
            return ApiResult.fail(403,"演唱会不存在");
        }
        ConcertLikeListResp basicInfo = tconcertMapper.getOneConcert(param.getCid());
        List<SongSheetResp> songSheet = tsongSheetMapper.getSongSheetByCid(param.getCid());
        FanGetConcertResp resp = new FanGetConcertResp();
        resp.setInfo(basicInfo);
        resp.setSheet(songSheet);
        return ApiResult.data(resp);
    }
}
