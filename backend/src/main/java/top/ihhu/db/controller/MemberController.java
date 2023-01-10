package top.ihhu.db.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.stp.StpUtil;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
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
import top.ihhu.db.mapper.ViewMemberForBandMapper;
import top.ihhu.db.model.request.*;
import top.ihhu.db.model.response.BandMemberResp;
import top.ihhu.db.model.response.SearchBandMemberResp;
import top.ihhu.db.util.ApiResult;
import top.ihhu.db.util.PageResult;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.*;

/**
 * @author: 卢利栋
 * @date: 2022/12/10 10:37
 */
@RestController
@RequestMapping("/member")
@Api(tags = "成员相关接口")
public class MemberController {
    @Autowired
    ViewMemberForBandMapper memberForBandMapper;
    @SaCheckLogin
    @SaCheckRole("band")
    @GetMapping("/list/in")
    @ApiOperation(value = "在团队的成员列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<BandMemberResp>> listIn(MemberListReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        JSONObject j = JSONObject.parseObject(param.getSorter());
        Set<Map.Entry<String, Object>> entries = j.entrySet();
        Iterator<Map.Entry<String, Object>> it = entries.iterator();
        String key = null;
        String value = null;
        while(it.hasNext()){
            Map.Entry<String, Object> next = it.next();
            key = next.getKey();
            value = "descend".equals(next.getValue().toString()) ? "desc" : "asc";
        }
        Page<BandMemberResp> page = new Page<>(param.getCurrent(), param.getPageSize());
        IPage<BandMemberResp> memberList = memberForBandMapper.getInBandMemberList(
                page,
                param.getMid(),
                param.getMname(),
                param.getMsex(),
                param.getMageMin(),
                param.getMageMax(),
                param.getMjob(),
                param.getMenterMin(),
                param.getMenterMax(),
                key,value
        );

        return new PageResult<>(200,"操作成功",memberList.getRecords(), true, memberList.getTotal());
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @GetMapping("/list/out")
    @ApiOperation(value = "不在团队的成员列表", produces = MediaType.APPLICATION_JSON_VALUE)
    public PageResult<List<BandMemberResp>> listOut(MemberListReq param){
        if(!StpUtil.isLogin()){
            return new PageResult<>(403,"用户未登录",null,false,0);
        }
        JSONObject j = JSONObject.parseObject(param.getSorter());
        Set<Map.Entry<String, Object>> entries = j.entrySet();
        Iterator<Map.Entry<String, Object>> it = entries.iterator();
        String key = null;
        String value = null;
        while(it.hasNext()){
            Map.Entry<String, Object> next = it.next();
            key = next.getKey();
            value = "descend".equals(next.getValue().toString()) ? "desc" : "asc";
        }
        Page<BandMemberResp> page = new Page<>(param.getCurrent(), param.getPageSize());
        IPage<BandMemberResp> memberList = memberForBandMapper.getOutBandMemberList(
                page,
                param.getMid(),
                param.getMname(),
                param.getMsex(),
                param.getMageMin(),
                param.getMageMax(),
                param.getMjob(),
                param.getMenterMin(),
                param.getMenterMax(),
                key,value
        );

        return new PageResult<>(200,"操作成功",memberList.getRecords(), true, memberList.getTotal());
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @PostMapping("/update")
    @ApiOperation(value = "更新", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> update(@Valid MemberUpdateReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(param.getMenter() == null || param.getMenter().isAfter(LocalDate.now())){
            return ApiResult.fail(403,"加入日期不合法");
        }
        memberForBandMapper.updateMemberInfo(param.getMid(), param.getMname(), param.getMsex(), param.getMage(),param.getMjob(),param.getMenter());
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @PostMapping("/add")
    @ApiOperation(value = "添加", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> add(@Valid MemberAddReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        if(param.getMenter() == null || param.getMenter().isAfter(LocalDate.now())){
            return ApiResult.fail(403,"加入日期不合法");
        }
        memberForBandMapper.insertMemberInfo(StpUtil.getLoginIdAsString(), param.getMname(), param.getMsex(), param.getMage(),param.getMjob(),param.getMenter());
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @PostMapping("/out")
    @ApiOperation(value = "离队", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<?> out(@Valid MemberOutReq param){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        memberForBandMapper.updateOutMember(param.getMid());
        return ApiResult.success();
    }
    @SaCheckLogin
    @SaCheckRole("band")
    @GetMapping("/search")
    @ApiOperation(value = "查询所有", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResult<JSONArray> listOut(){
        if(!StpUtil.isLogin()){
            return ApiResult.fail(403,"用户未登录");
        }
        JSONArray j = new JSONArray();
        JSONObject in = new JSONObject();
        in.put("label","在队成员");
        in.put("options",memberForBandMapper.searchInMemberByName());
        j.add(in);
        JSONObject out = new JSONObject();
        out.put("label","离队成员");
        out.put("options",memberForBandMapper.searchOutMemberByName());
        j.add(out);
        return ApiResult.data(j);
    }
}
