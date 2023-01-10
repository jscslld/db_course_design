package top.ihhu.db.exception;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static java.net.HttpURLConnection.HTTP_INTERNAL_ERROR;

/**
 * @author: 卢利栋
 * @date: 2022/12/8 11:07
 */
@NoArgsConstructor
@Getter
public class BusinessException extends RuntimeException {

    private Integer code = null;

    public BusinessException(String msg) {
        super(msg);
        this.code = HTTP_INTERNAL_ERROR;
    }

    public BusinessException(int code, String msg) {
        super(msg);
        this.code = code;
    }

    /**
     * 关闭爬栈
     */
    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
}