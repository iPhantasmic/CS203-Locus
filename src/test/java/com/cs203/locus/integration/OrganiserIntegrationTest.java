package com.cs203.locus.integration;

import com.cs203.locus.models.user.User;
import com.cs203.locus.models.user.UserDTO;
import com.cs203.locus.repository.OrganiserRepository;
import com.cs203.locus.repository.ParticipantRepository;
import com.cs203.locus.repository.UserRepository;
import com.cs203.locus.security.JwtUserDetailsService;
import com.cs203.locus.service.OrganiserService;
import com.cs203.locus.service.ParticipantService;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

import static io.restassured.RestAssured.given;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class OrganiserIntegrationTest {
    @LocalServerPort
    private int port;

    @Autowired
    OrganiserService organiserService;

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
        userRepository.deleteAll();
    }

    @Test
    public void getOrganiser_ValidId_200() {
        Integer organiserId = user.getOrganiserProfile().getId();
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .get(baseUrl + port + "/organiser/" + organiserId)
                .then()
                .assertThat()
                .statusCode(200);
    }
    @Test
    public void getOrganiser_InvalidId_400() {
        Integer organiserId = user.getOrganiserProfile().getId()+1;
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .get(baseUrl + port + "/organiser/" + organiserId)
                .then()
                .assertThat()
                .statusCode(400);
    }
    @Test
    public void updateOrganiser_ValidId_200() {
        Integer organiserId = user.getOrganiserProfile().getId();

        RequestSpecification requestSpec = RestAssured.with();
        requestSpec.given().contentType("application/json");
        requestSpec.body("{\"id\":\"" + organiserId + "\",\"companyName\": " + "\"Hello\""+",\"companySector\":" +"\"Hello\"" + " ,\"companyAcra\":" + "\"Hello\" }");
        requestSpec
                .header("Authorization", "Bearer " + jwtToken)
                .put(baseUrl + port + "/organiser/"+organiserId)
                .then()
                .assertThat()
                .statusCode(200);
    }
    @Test
    public void updateOrganiser_InvalidId_400() {
        Integer organiserId = user.getOrganiserProfile().getId()+1;

        RequestSpecification requestSpec = RestAssured.with();
        requestSpec.given().contentType("application/json");
        requestSpec.body("{\"id\":\"" + organiserId + "\",\"companyName\": " + "\"Hello\""+",\"companySector\":" +"\"Hello\"" + " ,\"companyAcra\":" + "\"Hello\" }");
        requestSpec
                .header("Authorization", "Bearer " + jwtToken)
                .put(baseUrl + port + "/organiser/"+organiserId)
                .then()
                .assertThat()
                .statusCode(400);
    }

}



