package com.wpn.modal;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

@NoArgsConstructor
@Data
public class PushPayload {

    @ApiModelProperty(example = "Push Notification title!")
    String title;
    @ApiModelProperty(example = "Push Notification message!")
    String message;
    @ApiModelProperty(example = "https://google.com")
    @URL(protocol = "https", message = "Link must be valid https protocol")
    String link;
    @ApiModelProperty(example = "https://upload.wikimedia.org/wikipedia/commons/6/6f/HP_logo_630x630.png")
    @URL(protocol = "https", message = "Link must be valid https protocol")
    String image;
    @ApiModelProperty(example = "900")
    int ttl;
}
