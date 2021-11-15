package com.cs203.locus.integration;

import com.cs203.locus.models.admin.NewsArticleDTO;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

import java.time.LocalDateTime;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AdminIntegrationTest {
    @LocalServerPort
    private int port;

    @Autowired
    ParticipantService participantService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUserDetailsService jwtUserDetailsService;

    @Value("${jwt.admin.pass}")
    private String password;

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

        jwtUserDetailsService.createAdminUser();

        getToken("admin", password);
    }

    @AfterAll
    void tearDown(@Autowired UserRepository userRepository, @Autowired ParticipantRepository participantRepository) {
        userRepository.deleteAll();
        participantRepository.deleteAll();
    }

    @Test
    @Order(1)
    public void allVerification_AdminAccount_200() {
        given()
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .get(baseUrl + port + "/admin/" + "all-verification")
        .then()
            .assertThat()
            .statusCode(200);
    }

    @Test
    @Order(11)
    public void allVerification_NormalUser_403() {
        getToken("testAccount", "P@ssw0rd");
        given()
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .get(baseUrl + port + "/admin/" + "all-verification")
        .then()
            .assertThat()
            .statusCode(403);
    }

    @Test
    @Order(2)
    public void allPendingVerification_AdminAccount_200() {
        given()
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .get(baseUrl + port + "/admin/" + "pending-verification")
        .then()
            .assertThat()
            .statusCode(200);
    }

    @Test
    @Order(3)
    public void acceptVerification_AdminAccount_200() {
        given()
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .put(baseUrl + port + "/admin/verification/" + user.getParticipantProfile().getId() + "?isVerified=" + "true")
        .then()
            .assertThat()
            .statusCode(200)
            .body("vaxStatus", equalTo(true));
    }

    @Test
    @Order(12)
    public void acceptVerification_NormalUser_403() {
        getToken("testAccount", "P@ssw0rd");
        given()
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .put(baseUrl + port + "/admin/verification/" + user.getParticipantProfile().getId() + "?isVerified=" + "true")
        .then()
            .assertThat()
            .statusCode(403);
    }

    @Test
    @Order(4)
    public void rejectVerification_AdminAccount_200() {
        given()
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .put(baseUrl + port + "/admin/verification/" + user.getParticipantProfile().getId() + "?isVerified=" + "false")
        .then()
            .assertThat()
            .statusCode(200)
            .body("vaxStatus", equalTo(false));
    }

    @Test
    @Order(13)
    public void rejectVerification_NormalUser_403() {
        getToken("testAccount", "P@ssw0rd");
        given()
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .put(baseUrl + port + "/admin/verification/" + user.getParticipantProfile().getId() + "?isVerified=" + "false")
        .then()
            .assertThat()
            .statusCode(403);
    }

    @Test
    @Order(5)
    public void createNews_AdminAccount_200() {
        NewsArticleDTO newsArticleDTO = new NewsArticleDTO();
        newsArticleDTO.setArticleLink("https://testurl.com");
        newsArticleDTO.setBodyText("TestTestTest");
        newsArticleDTO.setDatePublished(LocalDateTime.now());
        newsArticleDTO.setTitle("Testing Article");

        given()
            .header("Authorization", "Bearer " + jwtToken)
            .contentType("application/json")
            .body(newsArticleDTO)
        .when()
            .post(baseUrl + port + "/admin/news")
        .then()
            .assertThat()
            .statusCode(200);
    }

    @Test
    @Order(6)
    public void createNews_AdminAccountInvalidNews_400() {
        NewsArticleDTO newsArticleDTO = new NewsArticleDTO();
        newsArticleDTO.setArticleLink("https://anotherurl.com");
        newsArticleDTO.setBodyText("TestTestTest");
        newsArticleDTO.setDatePublished(null);
        newsArticleDTO.setTitle(null);

        given()
            .header("Authorization", "Bearer " + jwtToken)
            .contentType("application/json")
            .body(newsArticleDTO)
        .when()
            .post(baseUrl + port + "/admin/news")
        .then()
            .assertThat()
            .statusCode(400);
    }

    @Test
    @Order(7)
    public void updateNews_AdminAccount_200() {
        NewsArticleDTO newsArticleDTO = new NewsArticleDTO();
        newsArticleDTO.setArticleLink("https://testurl.com");
        newsArticleDTO.setBodyText("TestTestTest");
        newsArticleDTO.setDatePublished(LocalDateTime.now());
        newsArticleDTO.setTitle("updatedTitle");

        given()
            .header("Authorization", "Bearer " + jwtToken)
            .contentType("application/json")
            .body(newsArticleDTO)
        .when()
            .put(baseUrl + port + "/admin/news")
        .then()
            .assertThat()
            .statusCode(200)
            .body("title", equalTo("updatedTitle"));
    }

    @Test
    @Order(8)
    public void updateNews_AdminAccountInvalidNews_400() {
        NewsArticleDTO newsArticleDTO = new NewsArticleDTO();
        newsArticleDTO.setArticleLink("https://testurl.com");
        newsArticleDTO.setBodyText("TestTestTest");
        newsArticleDTO.setDatePublished(null);
        newsArticleDTO.setTitle(null);

        given()
            .header("Authorization", "Bearer " + jwtToken)
            .contentType("application/json")
            .body(newsArticleDTO)
        .when()
            .put(baseUrl + port + "/admin/news")
        .then()
            .assertThat()
            .statusCode(400);
    }

    @Test
    @Order(9)
    public void deleteNews_AdminAccount_200() {
        given()
            .header("Authorization", "Bearer " + jwtToken)
            .contentType("application/json")
        .when()
            .delete(baseUrl + port + "/admin/news" + "?articleId=https://testurl.com")
        .then()
            .assertThat()
            .statusCode(200);
    }

    @Test
    @Order(10)
    public void deleteNews_AdminAccountInvalidArticle_400() {
        given()
            .header("Authorization", "Bearer " + jwtToken)
            .contentType("application/json")
        .when()
            .delete(baseUrl + port + "/admin/news" + "?articleId=https://invalidurl.com")
        .then()
            .assertThat()
            .statusCode(400);
    }
}
