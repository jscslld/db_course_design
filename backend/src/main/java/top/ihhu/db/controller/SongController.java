package top.ihhu.db.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.stp.StpUtil;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
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
import top.ihhu.db.entity.*;
import top.ihhu.db.mapper.*;
import top.ihhu.db.model.request.*;
import top.ihhu.db.model.response.*;
import top.ihhu.db.util.ApiResult;
import top.ihhu.db.util.PageResult;

import java.util.ArrayList;
import java.util.List;

/**
 * @author: 卢利栋
 * @date: 2022/12/9 23:32
 */
@RestController
@RequestMapping("/song")
@Api(tags = "歌曲相关接口")
public class SongController {
    @Autowired
    ViewMemberForBandMapper memberForBandMapper;
    @Autowired
    ViewLikeSongTopForBandMapper likeSongTopMapper;
    @Autowired
    ViewSongForBandMapper songMapper;
    @Autowired
    ViewLikeSongForFanMapper likeSongMapper;
    @Autowired
    SongMapper tsongMapper;
    @Autowired
    SongSheetMapper tsongsheetMapper;
    @Autowired
    SongAlbumMapper tSongAlbumMapper;
    @SaCheckLogin
    @SaCheckRole("band")
    @GetMapping("/like_top_ten")
    @ApiOperation(value = "统计", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<ArrayList<SongLikeCountResp>> countAge(){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        ArrayList<SongLikeCountResp> resp = likeSongTopMapper.getLikeTop10();
        return ApiResult.data(resp);
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @GetMapping("/list")
    @ApiOperation(value = "列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<SongListResp>> list(SongListReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        Page<SongListResp> page = new Page<>(param.getCurrent(), param.getPageSize());
        IPage<SongListResp> songList = songMapper.getSongList(
                page,
                param.getSname(),
                param.getAuthorName());
        return new PageResult<>(200,"操作成功",songList.getRecords(), true, songList.getTotal());
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @PostMapping("/update")
    @ApiOperation(value = "修改", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> update(SongUpdateReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!songMapper.exists(new LambdaQueryWrapper<ViewSongForBand>().eq(ViewSongForBand::getSid,param.getSid()))){
            return ApiResult.fail(403,"歌曲不存在");
        }
        if(!memberForBandMapper.exists(new LambdaQueryWrapper<ViewMemberForBand>().eq(ViewMemberForBand::getMid,param.getSauthor()))){
            return ApiResult.fail(403,"该作者不存在");
        }
        songMapper.updateSong(param.getSid(), param.getSname(), param.getSauthor());
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @PostMapping("/delete")
    @ApiOperation(value = "删除", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> delete(SongDeleteReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!songMapper.exists(new LambdaQueryWrapper<ViewSongForBand>().eq(ViewSongForBand::getSid,param.getSid()))){
            return ApiResult.fail(403,"歌曲不存在");
        }
        songMapper.deleteSong(param.getSid());
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @PostMapping("/add")
    @ApiOperation(value = "修改", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> update(SongAddReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!memberForBandMapper.exists(new LambdaQueryWrapper<ViewMemberForBand>().eq(ViewMemberForBand::getMid,param.getSauthor()))){
            return ApiResult.fail(403,"该作者不存在");
        }
        songMapper.insertSong(param.getSname(), param.getSauthor());
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @GetMapping("/search")
    @ApiOperation(value = "查询所有", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<List<SearchBandMemberResp>> listOut(){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        return ApiResult.data(songMapper.searchSongList());
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @GetMapping("/fan/list")
    @ApiOperation(value = "列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<SongLikeListResp>> flist(SongListLikeReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        Page<SongLikeListResp> page = new Page<>(param.getCurrent(), param.getPageSize());
        IPage<SongLikeListResp> bandList = tsongMapper.getSongList(
                page,
                param.getSname(),
                param.getMname(),
                param.getBname(),
                param.getLiked()
        );
        return new PageResult<>(200,"操作成功",bandList.getRecords(), true, bandList.getTotal());
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @GetMapping("/fan/list/like")
    @ApiOperation(value = "喜欢列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<SongLikeListResp>> flistLike(SongListLikeReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        Page<SongLikeListResp> page = new Page<>(param.getCurrent(), param.getPageSize());
        IPage<SongLikeListResp> bandList = tsongMapper.getSongLikeList(
                page,
                param.getSname(),
                param.getMname(),
                param.getBname()
        );
        return new PageResult<>(200,"操作成功",bandList.getRecords(), true, bandList.getTotal());
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @PostMapping("/fan/like")
    @ApiOperation(value = "喜欢", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> like(LikeSongReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!tsongMapper.exists(new LambdaQueryWrapper<Song>().eq(Song::getSid,param.getSid()))){
            return ApiResult.fail(403,"歌曲不存在");
        }
        if(likeSongMapper.exists(new LambdaQueryWrapper<ViewLikeSongForFan>().eq(ViewLikeSongForFan::getSid,param.getSid()))){
            return ApiResult.fail(403,"不能喜欢同一个歌曲多次");
        }
        ViewLikeSongForFan tmp = new ViewLikeSongForFan();
        tmp.setSid(param.getSid());
        tmp.setFid(StpUtil.getLoginIdAsString());
        likeSongMapper.insert(tmp);
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @PostMapping("/fan/dislike")
    @ApiOperation(value = "不喜欢", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> dislike(LikeSongReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!tsongMapper.exists(new LambdaQueryWrapper<Song>().eq(Song::getSid,param.getSid()))){
            return ApiResult.fail(403,"歌曲不存在");
        }
        if(!likeSongMapper.exists(new LambdaQueryWrapper<ViewLikeSongForFan>().eq(ViewLikeSongForFan::getSid,param.getSid()))){
            return ApiResult.fail(403,"您没有喜欢该歌曲");
        }
        likeSongMapper.delete(new LambdaQueryWrapper<ViewLikeSongForFan>().eq(ViewLikeSongForFan::getSid,param.getSid()).eq(ViewLikeSongForFan::getFid,StpUtil.getLoginIdAsString()));
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @GetMapping("/fan/get")
    @ApiOperation(value = "获取信息", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<FanGetSongResp> getOne(FanGetSongInfoReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!tsongMapper.exists(new LambdaQueryWrapper<Song>().eq(Song::getSid,param.getSid()))){
            return ApiResult.fail(403,"歌曲不存在");
        }
        SongLikeListResp basicInfo = tsongMapper.getSongInfo(param.getSid());
        List<ConcertSongListResp> concertList = tsongsheetMapper.getConcertContainCid(param.getSid());
        List<AlbumLikeListResp> albumList = tSongAlbumMapper.getAlbumContainCid(param.getSid());

        FanGetSongResp resp = new FanGetSongResp();
        resp.setInfo(basicInfo);
        resp.setConcert(concertList);
        resp.setAlbum(albumList);
        return ApiResult.data(resp);
    }
}
