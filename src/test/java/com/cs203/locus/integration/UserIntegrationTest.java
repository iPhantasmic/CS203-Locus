package com.cs203.locus.integration;

import com.cs203.locus.models.user.User;
import com.cs203.locus.models.user.UserDTO;
import com.cs203.locus.repository.UserRepository;
import com.cs203.locus.security.JwtUserDetailsService;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserIntegrationTest {
    @LocalServerPort
    private int port;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUserDetailsService jwtUserDetailsService;

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

    @AfterEach
    void tearDown() {
        userRepository.deleteAll();
    }

    @Test
    public void getUser_ValidUsername_200() {
        UserDTO userDTO = new UserDTO();
        userDTO.setName("testAccount");
        userDTO.setUsername("testAccount");
        userDTO.setEmail("test@scis.smu.edu.sg");
        userDTO.setPassword("P@ssw0rd");
        userDTO.setConfirmPassword("P@ssw0rd");
        User user = jwtUserDetailsService.create(userDTO);

        getToken(userDTO.getUsername(), userDTO.getPassword());

        given()
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .get(baseUrl + port + "/user/" + user.getUsername())
        .then()
            .assertThat()
            .statusCode(200)
            .body("username", equalTo("testAccount"));
    }

    @Test
    public void getUser_InvalidUsername_403() {
        // 403 Due to @PreAuthorize that prevents accessing another user's resources
        UserDTO userDTO = new UserDTO();
        userDTO.setName("testAccount");
        userDTO.setUsername("testAccount");
        userDTO.setEmail("test@scis.smu.edu.sg");
        userDTO.setPassword("P@ssw0rd");
        userDTO.setConfirmPassword("P@ssw0rd");
        User user = jwtUserDetailsService.create(userDTO);

        getToken(userDTO.getUsername(), userDTO.getPassword());

        given()
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .get(baseUrl + port + "/user/" + "randomUsername")
        .then()
            .assertThat()
            .statusCode(403);
    }

    @Test
    public void updateUser_validUsernameAndUserDTO_200() {
        // Successfully update display name from testAccount to newName
        UserDTO userDTO = new UserDTO();
        userDTO.setName("testAccount");
        userDTO.setUsername("testAccount");
        userDTO.setEmail("test@scis.smu.edu.sg");
        userDTO.setPassword("P@ssw0rd");
        userDTO.setConfirmPassword("P@ssw0rd");
        User user = jwtUserDetailsService.create(userDTO);

        getToken(userDTO.getUsername(), userDTO.getPassword());

        userDTO.setName("newName");

        given()
            .contentType("application/json")
            .header("Authorization", "Bearer " + jwtToken)
            .body(userDTO)
        .when()
            .put(baseUrl + port + "/user/" + user.getUsername())
        .then()
            .assertThat()
            .statusCode(200)
            .body("username", equalTo("testAccount"))
            .body("name", equalTo("newName"));
    }

    @Test
    public void updateUser_InvalidUserDTO_400() {
        UserDTO userDTO = new UserDTO();
        userDTO.setName("testAccount");
        userDTO.setUsername("testAccount");
        userDTO.setEmail("test@scis.smu.edu.sg");
        userDTO.setPassword("P@ssw0rd");
        userDTO.setConfirmPassword("P@ssw0rd");
        User user = jwtUserDetailsService.create(userDTO);

        getToken(userDTO.getUsername(), userDTO.getPassword());

        userDTO.setName("");
        userDTO.setEmail("test");

        given()
            .contentType("application/json")
            .header("Authorization", "Bearer " + jwtToken)
            .body(userDTO)
        .when()
            .put(baseUrl + port + "/user/" + user.getUsername())
        .then()
            .assertThat()
            .statusCode(400)
            .body("message", anyOf(equalTo("Invalid name email "), equalTo("Invalid email name ")));
    }

    @Test
    public void deleteUser_ValidUsername_200() {
        UserDTO userDTO = new UserDTO();
        userDTO.setName("testAccount");
        userDTO.setUsername("testAccount");
        userDTO.setEmail("test@scis.smu.edu.sg");
        userDTO.setPassword("P@ssw0rd");
        userDTO.setConfirmPassword("P@ssw0rd");
        User user = jwtUserDetailsService.create(userDTO);

        getToken(userDTO.getUsername(), userDTO.getPassword());

        given()
            .contentType("application/json")
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .delete(baseUrl + port + "/user/" + user.getUsername())
        .then()
            .assertThat()
            .statusCode(200);
    }

    @Test
    public void deleteUser_InvalidUsername_400() {
        UserDTO userDTO = new UserDTO();
        userDTO.setName("testAccount");
        userDTO.setUsername("testAccount");
        userDTO.setEmail("test@scis.smu.edu.sg");
        userDTO.setPassword("P@ssw0rd");
        userDTO.setConfirmPassword("P@ssw0rd");
        User user = jwtUserDetailsService.create(userDTO);

        getToken(userDTO.getUsername(), userDTO.getPassword());

        given()
            .contentType("application/json")
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .delete(baseUrl + port + "/user/" + "randomUsername")
        .then()
            .assertThat()
            .statusCode(400)
            .body("message", equalTo("No user with username: randomUsername"));
    }
}
