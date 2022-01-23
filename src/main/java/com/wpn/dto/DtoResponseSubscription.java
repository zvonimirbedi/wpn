package com.wpn.dto;


import com.wpn.modal.Keys;
import lombok.Data;

@Data
public class DtoResponseSubscription {
    private String endpoint;
    private String expirationTime;
    private Keys keys;
    private String domain;
    private String source;
    private String language;
    private String platform;
}
