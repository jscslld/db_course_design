package top.ihhu.db.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.dynamic.datasource.DynamicRoutingDataSource;
import com.baomidou.dynamic.datasource.creator.DruidDataSourceCreator;
import com.baomidou.dynamic.datasource.spring.boot.autoconfigure.DataSourceProperty;
import com.baomidou.dynamic.datasource.toolkit.DynamicDataSourceContextHolder;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.ihhu.db.entity.Song;
import top.ihhu.db.entity.ViewBandForBand;
import top.ihhu.db.entity.ViewFanForFan;
import top.ihhu.db.mapper.ViewBandForBandMapper;
import top.ihhu.db.mapper.ViewFanForFanMapper;
import top.ihhu.db.model.request.AlbumLikeListResp;
import top.ihhu.db.model.request.BandUpdateInfoReq;
import top.ihhu.db.model.request.FanUpdateInfoReq;
import top.ihhu.db.model.request.UserLoginReq;
import top.ihhu.db.model.response.*;
import top.ihhu.db.util.ApiResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PostMapping;

import javax.sql.DataSource;
import javax.validation.Valid;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * @author: 卢利栋
 * @date: 2022/12/8 11:17
 */
@RestController
@RequestMapping("/user")
@Api(tags = "用户相关接口")
public class UserController {

    @Value("${database.url}")
    private String url;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private DataSource dataSource;
    @Autowired
    private DruidDataSourceCreator druidDataSourceCreator;
    @Autowired
    private ViewBandForBandMapper bandMapper;
    @Autowired
    private ViewFanForFanMapper fanMapper;
    @PostMapping("/login")
    @ApiOperation(value = "登录", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<UserLoginResp> login(@Valid UserLoginReq param) {
        DataSourceProperty dataSourceProperty = new DataSourceProperty();
        dataSourceProperty.setUrl(url);
        dataSourceProperty.setLazy(false);
        dataSourceProperty.setPoolName(param.getUsername());
        dataSourceProperty.setUsername(param.getUsername());
        dataSourceProperty.setPassword(param.getPassword());
        try {
            String role = "guest";
            Connection con = DriverManager.getConnection(dataSourceProperty.getUrl(), dataSourceProperty.getUsername(), dataSourceProperty.getPassword());

            con.close();
            DynamicRoutingDataSource ds = (DynamicRoutingDataSource) dataSource;
            DataSource dataSource = druidDataSourceCreator.createDataSource(dataSourceProperty);
            ds.addDataSource(dataSourceProperty.getPoolName(), dataSource);
            DynamicDataSourceContextHolder.push(dataSourceProperty.getPoolName());
            List<Map<String, Object>> rows = jdbcTemplate.queryForList("select current_role();");
            for (Map map : rows) {
                if(map.get("current_role()").toString().contains("ROLE_ADMIN")) {
                    role = "admin";
                } else if (map.get("current_role()").toString().contains("ROLE_BAND")) {
                    role = "band";
                } else if (map.get("current_role()").toString().contains("ROLE_FAN")) {
                    role = "fan";
                } else {
                    role = "guest";
                }
            }
            if(!param.getUserType().equals(role)){
                ds.removeDataSource(param.getUsername());
                return ApiResult.fail(500,"该用户的角色与您选择的不符！");
            } else {
                StpUtil.login(param.getUsername());
                StpUtil.getSession().set("role",role);
                return ApiResult.data("登录成功",new UserLoginResp(StpUtil.getTokenValue(),role));
            }
        } catch (SQLException e){
            if(e.getErrorCode() == 1045){
                return ApiResult.fail(403,"用户名或密码错误");
            }
            else{
                return ApiResult.fail(500,"发生未知错误："+e.getCause());
            }
        }
    }
    @GetMapping("/info")
    @ApiOperation(value = "详情", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> info(){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        String username = StpUtil.getLoginIdAsString();
        if("band".equals(StpUtil.getSession().get("role"))){
            ViewBandForBand bandInfo = bandMapper.getBandInfo(username);
            UserInfoBandResp resp = new UserInfoBandResp();
            resp.setBid(bandInfo.getBid());
            resp.setBname(bandInfo.getBname());
            resp.setRole(StpUtil.getSession().getString("role"));
            resp.setBestablish(bandInfo.getBestablish());
            resp.setBhead(bandInfo.getBhead());
            resp.setBcnt(bandInfo.getCnt());
            return ApiResult.data(resp);
        }
        if("fan".equals(StpUtil.getSession().get("role"))){
            ViewFanForFan fanInfo = fanMapper.getFanInfo(username);
            UserInfoFanResp resp = new UserInfoFanResp();
            resp.setFid(fanInfo.getFid());
            resp.setFname(fanInfo.getFname());
            resp.setRole(StpUtil.getSession().getString("role"));
            resp.setFjob(fanInfo.getFjob());
            resp.setFage(fanInfo.getFage());
            resp.setFsex(fanInfo.getFsex());
            return ApiResult.data(resp);
        }
        if("admin".equals(StpUtil.getSession().get("role"))){
            UserInfoFanResp resp = new UserInfoFanResp();
            resp.setFid(username);
            resp.setFname(username);
            resp.setRole(StpUtil.getSession().getString("role"));
            return ApiResult.data(resp);
        }
        return null;
    }
    @GetMapping("/logout")
    @ApiOperation(value = "退出", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> logout(){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        String username = StpUtil.getLoginIdAsString();
        DynamicRoutingDataSource ds = (DynamicRoutingDataSource) dataSource;
        ds.removeDataSource(username);
        StpUtil.logout();
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("fan")
    @PostMapping ("/update/fan")
    @ApiOperation(value = "更新粉丝信息", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> updateFan(FanUpdateInfoReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        ViewFanForFan fan = new ViewFanForFan();
        fan.setFid(StpUtil.getLoginIdAsString());
        fan.setFname(param.getFname());
        fan.setFsex(param.getFsex());
        fan.setFjob(param.getFjob());
        fan.setFage(param.getFage());
        fanMapper.update(fan,new LambdaQueryWrapper<ViewFanForFan>().eq(ViewFanForFan::getFid,StpUtil.getLoginIdAsString()));
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @PostMapping ("/update/band")
    @ApiOperation(value = "更新乐队信息", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> updateBand(BandUpdateInfoReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        ViewBandForBand bandInfo = bandMapper.getBandInfo(StpUtil.getLoginIdAsString());
        if(bandMapper.exists(new LambdaQueryWrapper<ViewBandForBand>().ne(ViewBandForBand::getBid,StpUtil.getLoginIdAsString()).eq(ViewBandForBand::getBname,param.getBname()))){
            return ApiResult.fail(500,"该乐队名称已被占用");
        }
        bandMapper.update(null,new LambdaUpdateWrapper<ViewBandForBand>().set(ViewBandForBand::getBname,param.getBname()).set(ViewBandForBand::getBestablish,param.getBestablish()).set(ViewBandForBand::getBhead,param.getBhead()).eq(ViewBandForBand::getBid,StpUtil.getLoginIdAsString()));
        return ApiResult.success();
    }
}
