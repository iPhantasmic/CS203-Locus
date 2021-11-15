package com.cs203.locus.integration;

import com.cs203.locus.models.organiser.Organiser;
import com.cs203.locus.models.organiser.OrganiserDTO;
import com.cs203.locus.models.user.User;
import com.cs203.locus.models.user.UserDTO;
import com.cs203.locus.repository.OrganiserRepository;
import com.cs203.locus.repository.UserRepository;
import com.cs203.locus.security.JwtUserDetailsService;
import com.cs203.locus.service.OrganiserService;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
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
    void tearDown(@Autowired UserRepository userRepository, @Autowired OrganiserRepository organiserRepository) {
        userRepository.deleteAll();
        organiserRepository.deleteAll();
    }

    @Test
    @Order(1)
    public void getOrganiser_ValidId_200() {
        int organiserId = user.getOrganiserProfile().getId();
        given()
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .get(baseUrl + port + "/organiser/" + organiserId)
        .then()
            .assertThat()
            .statusCode(200);
    }

    @Test
    @Order(2)
    public void getOrganiser_InvalidId_403() {
        int organiserId = user.getOrganiserProfile().getId() + 1;
        given()
            .header("Authorization", "Bearer " + jwtToken)
        .when()
            .get(baseUrl + port + "/organiser/" + organiserId)
        .then()
            .assertThat()
            .statusCode(403);
    }

    @Test
    @Order(3)
    public void updateOrganiser_ValidIdValidOrganiserDTO_200() {
        Organiser organiser = user.getOrganiserProfile();
        OrganiserDTO organiserDTO = new OrganiserDTO();
        organiserDTO.setId(organiser.getId());
        organiserDTO.setCompanyAcra(organiserDTO.getCompanyAcra());
        organiserDTO.setCompanyName("New Company Name");
        organiserDTO.setCompanySector(organiserDTO.getCompanySector());

        given()
            .contentType("application/json")
            .header("Authorization", "Bearer " + jwtToken)
            .body(organiserDTO)
        .when()
            .put(baseUrl + port + "/organiser/" + organiser.getId())
        .then()
            .assertThat()
            .statusCode(200)
            .body("companyName", equalTo("New Company Name"));
    }

    @Test
    @Order(4)
    public void updateOrganiser_InvalidId_403() {
        int organiserId = user.getOrganiserProfile().getId() + 1;
        Organiser organiser = user.getOrganiserProfile();
        OrganiserDTO organiserDTO = new OrganiserDTO();
        organiserDTO.setId(organiser.getId());
        organiserDTO.setCompanyAcra(organiserDTO.getCompanyAcra());
        organiserDTO.setCompanyName("New Company Name");
        organiserDTO.setCompanySector(organiserDTO.getCompanySector());

        given()
            .contentType("application/json")
            .header("Authorization", "Bearer " + jwtToken)
            .body(organiserDTO)
        .when()
            .put(baseUrl + port + "/organiser/" + organiserId)
        .then()
            .assertThat()
            .statusCode(403);
    }

}



