package com.cs203.creditswees.swagger;

import io.swagger.v3.oas.annotations.*;
import io.swagger.v3.oas.annotations.info.*;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                title = "creditSWEEs API",
                version = "1.0.0",
                description = "CS203 creditSWEEs API Documentation...",
                contact = @Contact(
                        name = "Your Name",
                        url = "Your Website",
                        email = "youremail@smu.edu.sg"
                ),
                license = @License(
                        name = "Apache License 2.0",
                        url = "NA")),
        servers = @Server(url = "http://localhost:8080")
)
public class OpenAPIConfig {

}