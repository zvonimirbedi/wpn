package com.wpn.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@EnableWebFluxSecurity
public class ConfigurationSecurity {

    @Bean
    public SecurityWebFilterChain securitygWebFilterChain(ServerHttpSecurity http) {
        return http.authorizeExchange()
                .pathMatchers("/", "/streaming/**", "/wpn/subscribe", "/wpn/subscribe/**", "/public/**")
                .permitAll()
                .anyExchange()
                .authenticated()
                .and()
                .formLogin()
                .and()
                .csrf()
                .disable()
                .build();
    }
}
