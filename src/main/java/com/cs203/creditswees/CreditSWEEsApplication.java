package com.cs203.creditswees;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableAsync
@SpringBootApplication(exclude =  {SecurityAutoConfiguration.class})
public class CreditSWEEsApplication {

    public static void main(String[] args) {
        SpringApplication.run(CreditSWEEsApplication.class, args);
    }

}
