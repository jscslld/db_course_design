package top.ihhu.db.annotation;
import java.lang.annotation.*;
/**
 * @author: 卢利栋
 * @date: 2022/12/8 11:05
 */


/**
 * <p>
 * 用户标识仅可以使用默认数据源
 * </p>
 *
 * @author starsray
 * @since 2021-11-10
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DefaultDs {
}