package com.cs203.locus.integration;

import com.cs203.locus.models.participant.Participant;
import com.cs203.locus.models.participant.ParticipantDTO;
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
import org.checkerframework.checker.units.qual.A;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

import java.util.ArrayList;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ParticipantIntegrationTest {
    @LocalServerPort
    private int port;

    @Autowired
    ParticipantService participantService;

    @Autowired
    ParticipantRepository participantRepository;

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


    @BeforeEach
    void setupUser() {
        UserDTO userDTO = new UserDTO();
        userDTO.setName("testAccount");
        userDTO.setUsername("testAccount");
        userDTO.setEmail("test@scis.smu.edu.sg");
        userDTO.setPassword("P@ssw0rd");
        userDTO.setConfirmPassword("P@ssw0rd");
        user = jwtUserDetailsService.create(userDTO);
        getToken(userDTO.getUsername(), userDTO.getPassword());
    }

    @AfterEach
    void tearDown() {
        participantRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void getParticipant_ValidId_200() {
        Integer participantId = user.getParticipantProfile().getId();
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .get(baseUrl + port + "/participant/" + participantId)
                .then()
                .assertThat()
                .statusCode(200);
    }
    @Test
    public void getParticipant_InvalidId_400() {
        Integer participantId = user.getParticipantProfile().getId() + 1;
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .get(baseUrl + port + "/participant/" + participantId)
                .then()
                .assertThat()
                .statusCode(400);
    }

    @Test
    public void updateParticipant_ValidId_200() {
        Integer participantId = user.getParticipantProfile().getId();

        RequestSpecification requestSpec = RestAssured.with();
        requestSpec.given().contentType("application/json");
        requestSpec.body("{\"id\":\"" + participantId + "\",\"vaxGcsUrl\": " + "\"Hello\""+ " ,\"vaxStatus\":" + " true }");
        requestSpec
                .header("Authorization", "Bearer " + jwtToken)
                .put(baseUrl + port + "/participant/"+participantId)
                .then()
                .assertThat()
                .statusCode(200);

    }
    @Test
    public void updateParticipant_InvalidId_400() {
        Integer participantId = user.getParticipantProfile().getId()+1;

        RequestSpecification requestSpec = RestAssured.with();
        requestSpec.given().contentType("application/json");
        requestSpec.body("{\"id\":\"" + participantId + "\",\"vaxGcsUrl\": " + "\"Hello\""+ " ,\"vaxStatus\":" + " true }");
        requestSpec
                .header("Authorization", "Bearer " + jwtToken)
                .put(baseUrl + port + "/participant/"+participantId)
                .then()
                .assertThat()
                .statusCode(400);
    }
}
