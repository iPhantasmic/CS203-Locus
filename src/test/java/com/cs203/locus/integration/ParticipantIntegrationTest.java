package com.cs203.locus.integration;

import com.cs203.locus.models.user.User;
import com.cs203.locus.models.user.UserDTO;
import com.cs203.locus.repository.ParticipantRepository;
import com.cs203.locus.repository.UserRepository;
import com.cs203.locus.security.JwtUserDetailsService;
import com.cs203.locus.service.ParticipantService;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ParticipantIntegrationTest {
    @LocalServerPort
    private int port;

    @Autowired
    ParticipantService participantService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUserDetailsService jwtUserDetailsService;

    User user;

    private String jwtToken;

    private final String baseUrl = "http://localhost:";

    public void getToken(String username, String password) {
        RequestSpecification requestSpec = RestAssured.with();
        requestSpec.given().contentType("application/json");
        requestSpec.body("{\"username\":\"" + username + "\",\"password\":\"" + password + "\"}");
        Response response = requestSpec.post(baseUrl + port + "/authenticate");
        String responseMsg = response.asString();
        DocumentContext doc = JsonPath.parse(responseMsg);
        jwtToken = doc.read("token");
    }


    @BeforeAll
    void setupUser(@Autowired JwtUserDetailsService jwtUserDetailsService) {
        UserDTO userDTO = new UserDTO();
        userDTO.setName("testAccount");
        userDTO.setUsername("testAccount");
        userDTO.setEmail("test@scis.smu.edu.sg");
        userDTO.setPassword("P@ssw0rd");
        userDTO.setConfirmPassword("P@ssw0rd");
        user = jwtUserDetailsService.create(userDTO);

        getToken(userDTO.getUsername(), userDTO.getPassword());
    }

    @AfterAll
    void tearDown(@Autowired UserRepository userRepository, @Autowired ParticipantRepository participantRepository) {
        userRepository.deleteAll();
        participantRepository.deleteAll();
    }

    @Test
    @Order(1)
    public void getParticipant_ValidId_200() {
        Integer participantId = user.getParticipantProfile().getId();
        given()
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .get(baseUrl + port + "/participant/" + participantId)
        .then()
            .assertThat()
            .statusCode(200)
            .body("id", equalTo(participantId));
    }

    @Test
    @Order(2)
    public void getParticipant_InvalidId_403() {
        int participantId = user.getParticipantProfile().getId() + 1;
        given()
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .get(baseUrl + port + "/participant/" + participantId)
        .then()
            .assertThat()
            .statusCode(403);
    }
}
