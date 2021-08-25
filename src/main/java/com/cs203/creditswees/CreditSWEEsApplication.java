package com.cs203.creditswees;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableAsync
public class CreditSWEEsApplication {

    public static void main(String[] args) {
        SpringApplication.run(CreditSWEEsApplication.class, args);
    }

}
