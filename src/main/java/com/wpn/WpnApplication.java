package com.wpn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Date;
import java.util.TimeZone;

@SpringBootApplication
public class WpnApplication {


	public static void main(String[] args) {
		SpringApplication.run(WpnApplication.class, args);
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		System.out.println("Application Started!");
		System.out.println("Date in 'UTC': " + new Date());
	}

}
