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
import top.ihhu.db.entity.*;
import top.ihhu.db.mapper.*;
import top.ihhu.db.model.request.*;
import top.ihhu.db.model.response.*;
import top.ihhu.db.util.ApiResult;
import top.ihhu.db.util.PageResult;

import java.util.LinkedHashSet;
import java.util.List;

/**
 * @author: 卢利栋
 * @date: 2022/12/13 19:06
 */
@RestController
@RequestMapping("/album")
@Api(tags = "专辑相关接口")
public class AlbumController {
    @Autowired
    ViewAlbumForBandMapper albumMapper;
    @Autowired
    ViewSongAlbumForBandMapper songAlbumMapper;
    @Autowired
    AlbumMapper talbumMapper;
    @Autowired
    SongAlbumMapper tSongAlbumMapper;
    @Autowired
    ViewLikeAlbumForFanMapper likeAlbumMapper;
    @SaCheckLogin
    @SaCheckRole("band")
    @GetMapping("/list")
    @ApiOperation(value = "列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<AlbumListResp>> list(AlbumListReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        Page<AlbumListResp> page = new Page<>(param.getCurrent(), param.getPageSize());
        IPage<AlbumListResp> albumList = albumMapper.getAlbumList(
                page,
                param.getAname(),
                param.getAcompany());
        return new PageResult<>(200,"操作成功",albumList.getRecords(), true, albumList.getTotal());
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @PostMapping("/update")
    @ApiOperation(value = "修改", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> update(AlbumUpdateReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!albumMapper.exists(new LambdaQueryWrapper<ViewAlbumForBand>().eq(ViewAlbumForBand::getAid,param.getAid()))){
            return ApiResult.fail(403,"专辑不存在");
        }
        if(talbumMapper.exists(new LambdaQueryWrapper<Album>().eq(Album::getAname,param.getAname()).ne(Album::getAid,param.getAid()))){
            return ApiResult.fail(403,"该专辑名在系统中已存在");
        }
        albumMapper.updateAlbum(param.getAid(), param.getAname(), param.getAcompany(),param.getAdate());
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @PostMapping("/delete")
    @ApiOperation(value = "删除", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> delete(AlbumDeleteReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!albumMapper.exists(new LambdaQueryWrapper<ViewAlbumForBand>().eq(ViewAlbumForBand::getAid,param.getAid()))){
            return ApiResult.fail(403,"专辑不存在");
        }
        albumMapper.deleteAlbum(param.getAid());
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @PostMapping("/add")
    @ApiOperation(value = "修改", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> update(AlbumAddReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(talbumMapper.exists(new LambdaQueryWrapper<Album>().eq(Album::getAname,param.getAname()))){
            return ApiResult.fail(403,"该专辑名在系统中已存在");
        }
        albumMapper.insertAlbum(param.getAname(), param.getAcompany(),param.getAdate(),StpUtil.getLoginIdAsString());
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @GetMapping("/song/list")
    @ApiOperation(value = "歌曲清单", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<List<AlbumSongListReq>> songList(AlbumDeleteReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!albumMapper.exists(new LambdaQueryWrapper<ViewAlbumForBand>().eq(ViewAlbumForBand::getAid,param.getAid()))){
            return ApiResult.fail(403,"专辑不存在");
        }
        return ApiResult.data(songAlbumMapper.listAlbumSong(param.getAid()));
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @PostMapping("/song/set")
    @ApiOperation(value = "维护歌曲清单", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> songList(AlbumSongSetReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!albumMapper.exists(new LambdaQueryWrapper<ViewAlbumForBand>().eq(ViewAlbumForBand::getAid,param.getAid()))){
            return ApiResult.fail(403,"专辑不存在");
        }
        List<String> sids = List.of(param.getSid().split(","));
        LinkedHashSet<String> hashSet = new LinkedHashSet<>(sids);
        if(sids.size() != hashSet.size()){
            return ApiResult.fail(403,"存在重复歌曲，请检查");
        }
        songAlbumMapper.delete(new LambdaQueryWrapper<ViewSongAlbumForBand>().eq(ViewSongAlbumForBand::getAid,param.getAid()));
        if("".equals(param.getSid())){
            return ApiResult.success();
        }

        for (String sid:sids) {
            ViewSongAlbumForBand t = new ViewSongAlbumForBand();
            t.setAid(param.getAid());
            t.setSid(Integer.parseInt(sid));
            songAlbumMapper.insert(t);
        }
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @GetMapping("/fan/list")
    @ApiOperation(value = "列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<AlbumLikeListResp>> flist(AlbumListReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        Page<AlbumLikeListResp> page = new Page<>(param.getCurrent(), param.getPageSize());
        IPage<AlbumLikeListResp> bandList = talbumMapper.getAlbumList(
                page,
                param.getAname(),
                param.getAcompany(),
                param.getLiked()
        );
        return new PageResult<>(200,"操作成功",bandList.getRecords(), true, bandList.getTotal());
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @GetMapping("/fan/list/like")
    @ApiOperation(value = "喜欢列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<AlbumLikeListResp>> flistLike(AlbumListReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        Page<AlbumLikeListResp> page = new Page<>(param.getCurrent(), param.getPageSize());
        IPage<AlbumLikeListResp> bandList = talbumMapper.getAlbumLikeList(
                page,
                param.getAname(),
                param.getAcompany()
        );
        return new PageResult<>(200,"操作成功",bandList.getRecords(), true, bandList.getTotal());
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @PostMapping("/fan/like")
    @ApiOperation(value = "喜欢", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> like(LikeAlbumReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!talbumMapper.exists(new LambdaQueryWrapper<Album>().eq(Album::getAid,param.getAid()))){
            return ApiResult.fail(403,"专辑不存在");
        }
        if(likeAlbumMapper.exists(new LambdaQueryWrapper<ViewLikeAlbumForFan>().eq(ViewLikeAlbumForFan::getAid,param.getAid()))){
            return ApiResult.fail(403,"不能喜欢同一个专辑多次");
        }
        ViewLikeAlbumForFan tmp = new ViewLikeAlbumForFan();
        tmp.setAid(param.getAid());
        tmp.setFid(StpUtil.getLoginIdAsString());
        likeAlbumMapper.insert(tmp);
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @PostMapping("/fan/dislike")
    @ApiOperation(value = "不喜欢", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> dislike(LikeAlbumReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!talbumMapper.exists(new LambdaQueryWrapper<Album>().eq(Album::getAid,param.getAid()))){
            return ApiResult.fail(403,"专辑不存在");
        }
        if(!likeAlbumMapper.exists(new LambdaQueryWrapper<ViewLikeAlbumForFan>().eq(ViewLikeAlbumForFan::getAid,param.getAid()))){
            return ApiResult.fail(403,"您没有喜欢过该专辑");
        }
        likeAlbumMapper.delete(new LambdaQueryWrapper<ViewLikeAlbumForFan>().eq(ViewLikeAlbumForFan::getAid,param.getAid()).eq(ViewLikeAlbumForFan::getFid,StpUtil.getLoginIdAsString()));
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @GetMapping("/fan/get")
    @ApiOperation(value = "获取信息", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<FanGetAlbumResp> getOne(FanGetAlbumInfoReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!talbumMapper.exists(new LambdaQueryWrapper<Album>().eq(Album::getAid,param.getAid()))){
            return ApiResult.fail(403,"专辑不存在");
        }
        AlbumLikeListResp basicInfo = talbumMapper.getAlbumInfo(param.getAid());
        List<AlbumSongListResp> songList = tSongAlbumMapper.getAlbumSongList(param.getAid());
        FanGetAlbumResp resp = new FanGetAlbumResp();
        resp.setInfo(basicInfo);
        resp.setSheet(songList);
        return ApiResult.data(resp);
    }
}
