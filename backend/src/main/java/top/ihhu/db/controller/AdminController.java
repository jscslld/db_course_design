package top.ihhu.db.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.dynamic.datasource.toolkit.DynamicDataSourceContextHolder;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.ihhu.db.entity.Band;
import top.ihhu.db.entity.Fan;
import top.ihhu.db.mapper.BandMapper;
import top.ihhu.db.mapper.FanMapper;
import top.ihhu.db.model.request.*;
import top.ihhu.db.model.response.AdminBandListResp;
import top.ihhu.db.model.response.AdminFanListResp;
import top.ihhu.db.util.ApiResult;
import top.ihhu.db.util.PageResult;
import java.util.List;
/**
 * @author: 卢利栋
 * @date: 2022/12/16 14:10
 */
@RestController
@RequestMapping("/admin")
@Api(tags = "管理员相关接口")
@SaCheckLogin
@SaCheckRole("admin")
public class AdminController {
    @Autowired
    JdbcTemplate jdbcTemplate;
    @Autowired
    BandMapper bandMapper;
    @Autowired
    FanMapper fanMapper;
    @GetMapping("/band/list")
    @ApiOperation(value = "乐队列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<AdminBandListResp>> bandList(AdminBandListReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        Page<AdminBandListResp> page = new Page<>(param.getCurrent(),param.getPageSize());
        IPage<AdminBandListResp> result = bandMapper.adminGetBandList(page, param.getBname(), param.getBid());
        return new PageResult<>(200,"操作成功",result.getRecords(), true, result.getTotal());
    }
    @GetMapping("/fan/list")
    @ApiOperation(value = "粉丝列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<AdminFanListResp>> fanList(AdminFanListReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        Page<AdminFanListResp> page = new Page<>(param.getCurrent(),param.getPageSize());
        IPage<AdminFanListResp> result = fanMapper.adminGetFanList(page, param.getFname(), param.getFid());
        return new PageResult<>(200,"操作成功",result.getRecords(), true, result.getTotal());
    }
    @PostMapping("/band/create")
    @ApiOperation(value = "创建乐队账号", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> bandCreate(AdminCreateReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!bandMapper.exists(new LambdaQueryWrapper<Band>().eq(Band::getBid,param.getUsername()))){
            return ApiResult.fail(403,"不存在基础信息，无法创建账户");
        }
        if(jdbcTemplate.queryForList("select * from mysql.user where User = '"+param.getUsername()+"';").size() >0){
            return ApiResult.fail(403,"该用户名在MySQL中已存在，创建失败");
        }
        jdbcTemplate.execute("create user '"+param.getUsername()+"'@'%' IDENTIFIED by '"+param.getPassword()+"';");
        jdbcTemplate.execute("grant ROLE_BAND to '"+param.getUsername()+"'@'%';");
        return ApiResult.success();
    }
    @PostMapping("/fan/create")
    @ApiOperation(value = "创建粉丝账号", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> fanCreate(AdminCreateReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!fanMapper.exists(new LambdaQueryWrapper<Fan>().eq(Fan::getFid,param.getUsername()))){
            return ApiResult.fail(403,"不存在基础信息，无法创建账户");
        }
        if(jdbcTemplate.queryForList("select * from mysql.user where User = '"+param.getUsername()+"';").size() >0){
            return ApiResult.fail(403,"该用户名在MySQL中已存在，创建失败");
        }
        jdbcTemplate.execute("create user '"+param.getUsername()+"'@'%' IDENTIFIED by '"+param.getPassword()+"';");
        jdbcTemplate.execute("grant ROLE_FAN to '"+param.getUsername()+"'@'%';");
        return ApiResult.success();
    }
    @PostMapping("/band/add")
    @ApiOperation(value = "添加乐队", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> bandAdd(AdminAddBandReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(bandMapper.exists(new LambdaQueryWrapper<Band>().eq(Band::getBid,param.getBid()))){
            return ApiResult.fail(403,"该乐队编号已存在");
        }
        if(bandMapper.exists(new LambdaQueryWrapper<Band>().eq(Band::getBid,param.getBname()))){
            return ApiResult.fail(403,"该乐队名称已存在");
        }
        if(jdbcTemplate.queryForList("select * from mysql.user where User = '"+param.getBid()+"';").size() >0){
            return ApiResult.fail(403,"该乐队编号在MySQL中已存在");
        }
        Band band = new Band();
        band.setBname(param.getBname());
        band.setBid(param.getBid());
        band.setBestablish(param.getBestablish());
        band.setCnt(0);
        bandMapper.insert(band);
        jdbcTemplate.execute("create user '"+param.getBid()+"'@'%' IDENTIFIED by '"+param.getPassword()+"';");
        jdbcTemplate.execute("grant ROLE_BAND to '"+param.getBid()+"'@'%';");
        return ApiResult.success();
    }
    @PostMapping("/fan/add")
    @ApiOperation(value = "添加粉丝", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> fanAdd(AdminFanAddReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(fanMapper.exists(new LambdaQueryWrapper<Fan>().eq(Fan::getFid,param.getFid()))){
            return ApiResult.fail(403,"该歌迷编号已存在");
        }
        if(jdbcTemplate.queryForList("select * from mysql.user where User = '"+param.getFid()+"';").size() >0){
            return ApiResult.fail(403,"该歌迷编号在MySQL中已存在");
        }
        Fan fan = new Fan();
        fan.setFsex(param.getFsex());
        fan.setFname(param.getFname());
        fan.setFjob(param.getFjob());
        fan.setFid(param.getFid());
        fan.setFage(param.getFage());
        fanMapper.insert(fan);
        jdbcTemplate.execute("create user '"+param.getFid()+"'@'%' IDENTIFIED by '"+param.getPassword()+"';");
        jdbcTemplate.execute("grant ROLE_FAN to '"+param.getFid()+"'@'%';");
        return ApiResult.success();
    }
    @PostMapping("/band/del")
    @ApiOperation(value = "删除乐队", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> bandDel(AdminDeleteReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!bandMapper.exists(new LambdaQueryWrapper<Band>().eq(Band::getBid,param.getId()))){
            return ApiResult.fail(403,"该乐队编号不存在");
        }
        bandMapper.delete(new LambdaQueryWrapper<Band>().eq(Band::getBid,param.getId()));
        jdbcTemplate.execute("drop user '"+param.getId()+"'@'%';");
        return ApiResult.success();
    }
    @PostMapping("/fan/del")
    @ApiOperation(value = "删除乐队", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> fanDel(AdminDeleteReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(!fanMapper.exists(new LambdaQueryWrapper<Fan>().eq(Fan::getFid,param.getId()))){
            return ApiResult.fail(403,"该歌迷编号不存在");
        }
        fanMapper.delete(new LambdaQueryWrapper<Fan>().eq(Fan::getFid,param.getId()));
        jdbcTemplate.execute("drop user '"+param.getId()+"'@'%';");
        return ApiResult.success();
    }
}
