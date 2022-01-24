package com.wpn.entity;

import lombok.Data;

import javax.persistence.*;


@Entity
@Table(name="subscription")
@Data
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="endpoint")
    private String endpoint;
    @Column(name="expirationTime")
    private String expirationTime;
    @Column(name="p256dh")
    private String p256dh;
    @Column(name="auth")
    private String auth;
    @Column(name="domain")
    private String domain;
    @Column(name="source")
    private String source;
    @Column(name="language")
    private String language;
    @Column(name="platform")
    private String platform;
    @Column(name="updatetimestamp")
    private long updatetimestamp;


}
