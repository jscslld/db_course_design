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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.ihhu.db.entity.ViewAlbumForBand;
import top.ihhu.db.entity.ViewBandForBand;
import top.ihhu.db.entity.ViewLikeBandForBand;
import top.ihhu.db.entity.ViewSongForBand;
import top.ihhu.db.mapper.*;
import top.ihhu.db.model.request.ConcertListReq;
import top.ihhu.db.model.request.FanListAlbumReq;
import top.ihhu.db.model.request.FanListReq;
import top.ihhu.db.model.request.FanListSongReq;
import top.ihhu.db.model.response.*;
import top.ihhu.db.util.ApiResult;
import top.ihhu.db.util.PageResult;

import javax.validation.Valid;
import java.util.List;

/**
 * @author: 卢利栋
 * @date: 2022/12/9 15:49
 */
@RestController
@RequestMapping("/fan")
@Api(tags = "粉丝相关接口")
public class FanController {
    @Autowired
    private ViewLikeBandForBandMapper likeBandMapper;
    @Autowired
    private ViewLikeAlbumForBandMapper likeAlbumMapper;
    @Autowired
    private ViewLikeSongForBandMapper likeSongMapper;
    @Autowired
    private ViewFanCountForBandMapper fanCountMapper;
    @Autowired
    private ViewFanCountByAgeMapper fanCountAgeMapper;
    @Autowired
    ViewAlbumForBandMapper albumMapper;
    @Autowired
    ViewSongForBandMapper songMapper;
    @SaCheckLogin
    @SaCheckRole("band")
    @GetMapping("/count")
    @ApiOperation(value = "统计", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<FanCountResp> count(){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        String username = StpUtil.getLoginIdAsString();
        Integer count = fanCountMapper.countFanNumber(username);
        FanCountResp resp = new FanCountResp();
        resp.setCount(count);
        return ApiResult.data(resp);
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @GetMapping("/count_by_age")
    @ApiOperation(value = "统计", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<List<FanCountAgeResp>> countAge(){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        List<FanCountAgeResp> resp = fanCountAgeMapper.countByAge();
        return ApiResult.data(resp);
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @GetMapping("/list/band")
    @ApiOperation(value = "乐队粉丝列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<FanListResp>> list(FanListReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        Page<FanListResp> page = new Page<>(param.getCurrent(), param.getPageSize());
        IPage<FanListResp> fanList = likeBandMapper.getFanList(
                page,
                StpUtil.getLoginIdAsString(),
                param.getFname(), param.getFjob(), param.getFsex()
        );
        return new PageResult<>(200,"操作成功",fanList.getRecords(), true, fanList.getTotal());
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @GetMapping("/list/album")
    @ApiOperation(value = "专辑粉丝列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<FanListResp>> listAlbum(@Valid FanListAlbumReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        if(!albumMapper.exists(new LambdaQueryWrapper<ViewAlbumForBand>().eq(ViewAlbumForBand::getAid,param.getAid()))){
            return new PageResult<>(403,"专辑不存在",null,false,0);
        }
        Page<FanListResp> page = new Page<>(param.getCurrent(), param.getPageSize());
        IPage<FanListResp> fanList = likeAlbumMapper.getFanList(
                page,
                param.getAid(),
                param.getFname(), param.getFjob(), param.getFsex()
        );
        return new PageResult<>(200,"操作成功",fanList.getRecords(), true, fanList.getTotal());
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @GetMapping("/list/song")
    @ApiOperation(value = "歌曲粉丝列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<FanListResp>> listAlbum(@Valid FanListSongReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        if(!songMapper.exists(new LambdaQueryWrapper<ViewSongForBand>().eq(ViewSongForBand::getSid,param.getSid()))){
            return new PageResult<>(403,"歌曲不存在",null,false,0);
        }
        Page<FanListResp> page = new Page<>(param.getCurrent(), param.getPageSize());
        IPage<FanListResp> fanList = likeSongMapper.getFanList(
                page,
                param.getSid(),
                param.getFname(), param.getFjob(), param.getFsex()
        );
        return new PageResult<>(200,"操作成功",fanList.getRecords(), true, fanList.getTotal());
    }
}
