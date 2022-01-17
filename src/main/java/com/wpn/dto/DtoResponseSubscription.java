package com.wpn.dto;


import com.wpn.modal.Keys;
import lombok.Data;

@Data
public class DtoResponseSubscription {
    private String endpoint;
    private String expirationTime;
    private Keys keys;
}
