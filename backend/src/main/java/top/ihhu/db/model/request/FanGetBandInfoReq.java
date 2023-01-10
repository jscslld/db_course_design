package top.ihhu.db.model.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

/**
 * @author: 卢利栋
 * @date: 2022/12/16 13:18
 */
@Data
public class FanGetBandInfoReq {
    @NotEmpty(message = "乐队编号不能为空")
    String bid;
}
