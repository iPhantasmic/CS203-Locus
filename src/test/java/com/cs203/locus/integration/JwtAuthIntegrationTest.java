package com.cs203.locus.integration;

import com.cs203.locus.models.security.JwtRequest;
import com.cs203.locus.models.security.ResetPassword;
import com.cs203.locus.models.user.UserDTO;
import com.cs203.locus.repository.UserRepository;
import com.cs203.locus.security.JwtTokenUtil;
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
import org.springframework.security.core.userdetails.UserDetails;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class JwtAuthIntegrationTest {
    @LocalServerPort
    private int port;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @Autowired
    JwtUserDetailsService jwtUserDetailsService;

    private String jwtToken;

    private String emailToken;

    private String passwordToken;

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

    public void getEmailToken(String username) {
        emailToken = jwtTokenUtil.generateEmailToken(username);
    }

    public void getPasswordToken(String username) {
        UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(username);
        passwordToken = jwtTokenUtil.generateResetToken(userDetails);
    }

    @AfterAll
    void tearDown(@Autowired UserRepository userRepository) {
        userRepository.deleteAll();
    }

    @Test
    @Order(2)
    public void createUser_ValidUserDTO_200() {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("test@gmail.com");
        userDTO.setName("testAccount");
        userDTO.setUsername("testAccount");
        userDTO.setPassword("P@ssw0rd");
        userDTO.setConfirmPassword("P@ssw0rd");

        given()
            .contentType("application/json")
            .body(userDTO)
        .when()
            .post(baseUrl + port + "/register")
        .then()
            .assertThat()
            .statusCode(200);
    }

    @Test
    @Order(1)
    public void createUser_InvalidUserDTO_400() {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("invalidEmail");
        userDTO.setName("testAccount");
        userDTO.setUsername("testAccount");
        userDTO.setPassword("P@ssw0rd");
        userDTO.setConfirmPassword("P@ssw0rd");

        given()
            .contentType("application/json")
            .body(userDTO)
        .when()
            .post(baseUrl + port + "/register")
        .then()
            .assertThat()
            .statusCode(400)
            .body("message", equalTo("Invalid email "));
    }

    @Test
    @Order(3)
    public void loginUser_ValidCredentials_200() {
        JwtRequest jwtRequest = new JwtRequest("testAccount", "P@ssw0rd");

        given()
            .contentType("application/json")
            .body(jwtRequest)
        .when()
            .post(baseUrl + port + "/authenticate")
        .then()
            .assertThat()
            .statusCode(200)
            .body("username", equalTo("testAccount"));
    }

    @Test
    @Order(4)
    public void loginUser_InvalidCredentials_401() {
        JwtRequest jwtRequest = new JwtRequest("testAccount", "password");

        given()
            .contentType("application/json")
            .body(jwtRequest)
        .when()
            .post(baseUrl + port + "/authenticate")
        .then()
            .assertThat()
            .statusCode(401)
            .body("message", equalTo("Username/Password invalid!"));
    }

    @Test
    @Order(5)
    public void requestEmailConfirmation_ValidUsername_200() {
        getToken("testAccount", "P@ssw0rd");

        given()
            .header("Authorization", "Bearer " + jwtToken)
            .contentType("application/json")
        .when()
            .post(baseUrl + port + "/requestemail" + "?username=testAccount")
        .then()
            .assertThat()
            .statusCode(200);
    }

    @Test
    @Order(6)
    public void requestEmailConfirmation_InvalidUsername_403() {
        getToken("testAccount", "P@ssw0rd");

        given()
            .header("Authorization", "Bearer " + jwtToken)
            .contentType("application/json")
        .when()
            .post(baseUrl + port + "/requestemail" + "?username=admin")
        .then()
            .assertThat()
            .statusCode(403);
    }

    @Test
    @Order(7)
    public void confirmEmail_ValidToken_200() {
        getEmailToken("testAccount");

        given()
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .post(baseUrl + port + "/confirmemail" + "?token=" + emailToken)
        .then()
            .assertThat()
            .statusCode(200);
    }

    @Test
    @Order(8)
    public void confirmEmail_InvalidToken_401() {
        given()
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .post(baseUrl + port + "/confirmemail" + "?token=" + "randomToken")
        .then()
            .assertThat()
            .statusCode(401)
            .body("message", equalTo("Invalid email confirmation token!"));
    }

    @Test
    @Order(9)
    public void requestResetPassword_ValidEmail_200() {
        given()
            .contentType("application/json")
        .when()
            .post(baseUrl + port + "/reset" + "?email=test@gmail.com")
        .then()
            .assertThat()
            .statusCode(200);
    }

    @Test
    @Order(10)
    public void requestResetPassword_InvalidEmail_400() {
        given()
            .contentType("application/json")
        .when()
            .post(baseUrl + port + "/reset" + "?email=random@gmail.com")
        .then()
            .assertThat()
            .statusCode(400)
            .body("message", equalTo("Invalid email provided!"));
    }

    @Test
    @Order(11)
    public void resetPassword_ValidToken_200() {
        getPasswordToken("testAccount");
        ResetPassword resetPassword = new ResetPassword();
        resetPassword.setPassword("newPassword");
        resetPassword.setConfirmPassword("newPassword");

        given()
            .contentType("application/json")
            .body(resetPassword)
        .when()
            .post(baseUrl + port + "/resetpassword" + "?token=" + passwordToken)
        .then()
            .assertThat()
            .statusCode(200);
    }

    @Test
    @Order(12)
    public void resetPassword_ValidTokenInvalidPasswordReset_400() {
        getPasswordToken("testAccount");
        ResetPassword resetPassword = new ResetPassword();
        resetPassword.setPassword("newPassword");
        resetPassword.setConfirmPassword("invalidPassword");

        given()
            .contentType("application/json")
            .body(resetPassword)
        .when()
            .post(baseUrl + port + "/resetpassword" + "?token=" + passwordToken)
        .then()
            .assertThat()
            .statusCode(400)
            .body("message", equalTo("Password and confirmPassword provided do not match!"));
    }

    @Test
    @Order(13)
    public void resetPassword_InvalidToken_401() {
        getPasswordToken("testAccount");
        ResetPassword resetPassword = new ResetPassword();
        resetPassword.setPassword("newPassword");
        resetPassword.setConfirmPassword("newPassword");

        given()
            .contentType("application/json")
            .body(resetPassword)
        .when()
            .post(baseUrl + port + "/resetpassword" + "?token=" + "randomToken")
        .then()
            .assertThat()
            .statusCode(401)
            .body("message", equalTo("Invalid password reset token!"));
    }

    @Test
    @Order(14)
    public void updatePassword_LoggedIn_200() {
        getToken("testAccount", "newPassword");
        ResetPassword resetPassword = new ResetPassword();
        resetPassword.setPassword("newPassword1");
        resetPassword.setConfirmPassword("newPassword1");

        given()
            .contentType("application/json")
            .header("Authorization", "Bearer " + jwtToken)
            .body(resetPassword)
        .when()
            .post(baseUrl + port + "/password/" + "testAccount")
        .then()
            .assertThat()
            .statusCode(200);
    }

    @Test
    @Order(15)
    public void updatePassword_InvalidResetPassword_400() {
        ResetPassword resetPassword = new ResetPassword();
        resetPassword.setPassword("newPassword1");
        resetPassword.setConfirmPassword("newRandomInvalidPassword");

        given()
            .contentType("application/json")
            .header("Authorization", "Bearer " + jwtToken)
            .body(resetPassword)
        .when()
            .post(baseUrl + port + "/password/" + "testAccount")
        .then()
            .assertThat()
            .statusCode(400)
            .body("message", equalTo("Password and confirmPassword provided do not match!"));
    }

    @Test
    @Order(16)
    public void validateToken_ValidToken_200() {
        given()
            .contentType("application/json")
        .when()
            .post(baseUrl + port + "/validate" + "?token=" + jwtToken)
        .then()
            .assertThat()
            .statusCode(200);
    }

    @Test
    @Order(17)
    public void validateToken_InvalidToken_401() {
        given()
            .contentType("application/json")
        .when()
            .post(baseUrl + port + "/validate" + "?token=" + "randomInvalidToken")
        .then()
            .assertThat()
            .statusCode(401)
            .body("message", equalTo("Token invalid!"));
    }
}
