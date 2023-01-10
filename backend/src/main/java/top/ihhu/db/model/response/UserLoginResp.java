package top.ihhu.db.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author: 卢利栋
 * @date: 2022/12/8 12:42
 */
@Data
@AllArgsConstructor
public class UserLoginResp {
    String token;
    String role;
}
