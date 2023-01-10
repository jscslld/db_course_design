package top.ihhu.db.model;

/**
 * @author: 卢利栋
 * @date: 2022/12/8 11:32
 */
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class DataSource {

    /**
     * 连接池名称
     */
    @NotBlank
    private String poolName;

    /**
     * JDBC driver com.mysql.cj.jdbc.Driver
     */
    @NotBlank
    private String driverClassName;

    /**
     * JDBC url 地址
     */
    @NotBlank
    private String url;

    /**
     * JDBC 用户名
     */
    @NotBlank
    private String username;

    /**
     * JDBC 密码
     */
    @NotBlank
    private String password;
}
