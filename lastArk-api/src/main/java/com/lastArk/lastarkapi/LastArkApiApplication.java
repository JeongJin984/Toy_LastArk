package com.lastArk.lastarkapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class LastArkApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(LastArkApiApplication.class, args);
    }
}
