package top.ihhu.db.interceptor;
import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.dynamic.datasource.toolkit.DynamicDataSourceContextHolder;
import top.ihhu.db.annotation.DefaultDs;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.lang.reflect.Method;
import top.ihhu.db.exception.BusinessException;
/**
 * @author: 卢利栋
 * @date: 2022/12/8 11:03
 */
@Aspect
@Component
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class DsInterceptor implements HandlerInterceptor {

    @Pointcut("execution(public * top.ihhu.db.controller.*.*(..))")
    public void datasourcePointcut() {
    }

    /**
     * 前置操作，拦截具体请求，获取header里的数据源id，设置线程变量里，用于后续切换数据源
     */
    @Before("datasourcePointcut()")
    public void doBefore(JoinPoint joinPoint) {
        Signature signature = joinPoint.getSignature();
        MethodSignature methodSignature = (MethodSignature) signature;
        Method method = methodSignature.getMethod();
        // 排除不可切换数据源的方法
        DefaultDs annotation = method.getAnnotation(DefaultDs.class);
        if (null != annotation) {
            DynamicDataSourceContextHolder.push("master");
        } else {
            if(StpUtil.isLogin()){
                String dsname = StpUtil.getLoginIdAsString();
                if (StringUtils.isNotBlank(dsname)) {
                    System.out.println("切换到"+dsname+"数据源");
                    DynamicDataSourceContextHolder.push(dsname);
                } else {
                    throw new BusinessException(500,"数据库用户切换失败");
                }
            } else{
                DynamicDataSourceContextHolder.push("master");
            }
        }
    }

    /**
     * 后置操作，设置回默认的数据源id
     */
    @AfterReturning("datasourcePointcut()")
    public void doAfter() {
        DynamicDataSourceContextHolder.push("master");
    }
}
