package com.cs203.locus.integration;

import com.cs203.locus.models.user.User;
import com.cs203.locus.models.user.UserDTO;
import com.cs203.locus.models.user.UserUpdateDTO;
import com.cs203.locus.repository.UserRepository;
import com.cs203.locus.security.JwtUserDetailsService;
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

    @BeforeAll
    void setup(@Autowired JwtUserDetailsService jwtUserDetailsService) {
        UserDTO userDTO = new UserDTO();
        userDTO.setName("testAccount");
        userDTO.setUsername("testAccount");
        userDTO.setEmail("test@scis.smu.edu.sg");
        userDTO.setPassword("P@ssw0rd");
        userDTO.setConfirmPassword("P@ssw0rd");
        jwtUserDetailsService.create(userDTO);

        getToken(userDTO.getUsername(), userDTO.getPassword());
    }

    @AfterAll
    void tearDown() {
        userRepository.deleteAll();
    }

    @Test
    @Order(1)
    public void getUser_ValidUsername_200() {
        given()
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .get(baseUrl + port + "/user/" + "testAccount")
        .then()
            .assertThat()
            .statusCode(200)
            .body("username", equalTo("testAccount"));
    }

    @Test
    @Order(2)
    public void getUser_InvalidUsername_403() {
        // 403 Due to @PreAuthorize that prevents accessing another user's resources
        given()
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .get(baseUrl + port + "/user/" + "randomUsername")
        .then()
            .assertThat()
            .statusCode(403);
    }

    @Test
    @Order(3)
    public void updateUser_validUsernameAndUserDTO_200() {
        // Successfully update display name from testAccount to newName
        User user = userRepository.findByUsername("testAccount");
        UserUpdateDTO userUpdateDTO = new UserUpdateDTO();

        userUpdateDTO.setUsername(user.getUsername());
        userUpdateDTO.setEmail(user.getEmail());
        userUpdateDTO.setName("newName");

        given()
            .contentType("application/json")
            .header("Authorization", "Bearer " + jwtToken)
            .body(userUpdateDTO)
        .when()
            .put(baseUrl + port + "/user/" + "testAccount")
        .then()
            .assertThat()
            .statusCode(200)
            .body("username", equalTo("testAccount"))
            .body("name", equalTo("newName"));
    }

    @Test
    @Order(4)
    public void updateUser_InvalidUserDTO_400() {
        User user = userRepository.findByUsername("testAccount");
        UserUpdateDTO userUpdateDTO = new UserUpdateDTO();
        userUpdateDTO.setName("");
        userUpdateDTO.setEmail("test");
        userUpdateDTO.setUsername(user.getUsername());

        given()
            .contentType("application/json")
            .header("Authorization", "Bearer " + jwtToken)
            .body(userUpdateDTO)
        .when()
            .put(baseUrl + port + "/user/" + user.getUsername())
        .then()
            .assertThat()
            .statusCode(400)
            .body("message", anyOf(equalTo("Invalid name email "), equalTo("Invalid email name ")));
    }

    @Test
    @Order(6)
    public void deleteUser_ValidUsername_200() {
        given()
            .contentType("application/json")
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .delete(baseUrl + port + "/user/" + "testAccount")
        .then()
            .assertThat()
            .statusCode(200);
    }

    @Test
    @Order(5)
    public void deleteUser_InvalidUsername_400() {
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
