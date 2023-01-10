package top.ihhu.db.util;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author: 卢利栋
 * @date: 2022/12/10 11:16
 */
@Data
@AllArgsConstructor
public class PageResult<T> {
    Integer code;
    String msg;
    T data;
    Boolean success = true;

    long total = 0;
}
