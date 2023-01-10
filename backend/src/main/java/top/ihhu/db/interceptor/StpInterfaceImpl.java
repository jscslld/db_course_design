package top.ihhu.db.interceptor;

import cn.dev33.satoken.session.SaSession;
import cn.dev33.satoken.stp.StpInterface;
import cn.dev33.satoken.stp.StpUtil;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * @author: 卢利栋
 * @date: 2022/12/8 12:47
 */
@Component
public class StpInterfaceImpl implements StpInterface {

    // 返回一个账号所拥有的权限码集合
    @Override
    public List<String> getPermissionList(Object loginId, String loginType) {
        return new ArrayList<String>();
    }

    // 返回一个账号所拥有的角色标识集合
    @Override
    public List<String> getRoleList(Object loginId, String loginType) {
        SaSession session = StpUtil.getSessionByLoginId(loginId);
        List<String> roleList = new ArrayList<>();
        roleList.add(session.getString("role"));
        return roleList;
    }

}