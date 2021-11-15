package com.cs203.locus.integration;

import com.cs203.locus.models.eventtype.EventType;
import com.cs203.locus.models.user.User;
import com.cs203.locus.models.user.UserDTO;
import com.cs203.locus.repository.EventTypeRepository;
import com.cs203.locus.repository.UserRepository;
import com.cs203.locus.security.JwtUserDetailsService;
import com.cs203.locus.service.EventService;
import com.cs203.locus.service.EventTypeService;
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

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EventTypeIntegrationTest {
    @LocalServerPort
    private int port;

    @Autowired
    EventService eventService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EventTypeService eventTypeService;

    @Autowired
    JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    EventTypeRepository eventTypeRepository;

    User user;

    private int eventTypeId;

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
    void setupEventTypes(@Autowired JwtUserDetailsService jwtUserDetailsService){
        UserDTO userDTO = new UserDTO();
        userDTO.setName("testAccount");
        userDTO.setUsername("testAccount");
        userDTO.setEmail("test@scis.smu.edu.sg");
        userDTO.setPassword("P@ssw0rd");
        userDTO.setConfirmPassword("P@ssw0rd");
        user = jwtUserDetailsService.create(userDTO);
        getToken(userDTO.getUsername(), userDTO.getPassword());

        EventType eventType = new EventType();
        eventType.setType("Attractions");
        eventType.setCapacity(100);
        eventTypeService.createEventType(eventType);
    }

    @AfterAll
    public void tearDown() {
        userRepository.deleteAll();
        eventTypeRepository.deleteAll();
    }

    @Test
    @Order(1)
    public void createEventType_ValidBody_200(){
        RequestSpecification requestSpec = RestAssured.with();
        requestSpec.given().contentType("application/json");
        requestSpec.body("{\"id\":\"" + "1" + "\",\"type\": " + "\"Test\"" + " ,\"capacity\":" + "\"100\"}");
        Response response = requestSpec
                .header("Authorization", "Bearer " + jwtToken)
                .post(baseUrl + port + "/event/type/new");
        System.out.println(response.getBody().asString());
        eventTypeId = response.path("id");

        response.then().assertThat()
                .statusCode(200);
    }

    @Test
    @Order(2)
    public void createEventType_InvalidBody_400(){
        RequestSpecification requestSpec = RestAssured.with();
        requestSpec.given().contentType("application/json");
        requestSpec.body("{\"id\":\"" + "-5" + "\",\"type\": " + "\"Test\"" + " ,\"capacity\":" + "\"100\"}");
        Response response = requestSpec
                .header("Authorization", "Bearer " + jwtToken)
                .post(baseUrl + port + "/event/type/new");

        response.then().assertThat()
                .statusCode(400);
    }

    @Test
    @Order(3)
    public void getEventType_ValidId_200(){
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .log().all()
                .get(baseUrl + port + "/event/type/" + eventTypeId)
                .then()
                .assertThat()
                .statusCode(200);
    }

    @Test
    @Order(4)
    public void getEventType_InvalidId_400(){
        int invalidId = eventTypeId+1;
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .get(baseUrl + port + "/event/type/" + invalidId)
                .then()
                .assertThat()
                .statusCode(400);
    }

    @Test
    @Order(5)
    public void updateEventType_InvalidBody_400(){
        RequestSpecification requestSpec = RestAssured.with();
        requestSpec.given().contentType("application/json");
        requestSpec.body("{\"id\":\"" + "-5" + "\",\"type\": " + "\"Test\"" + " ,\"capacity\":" + "\"100\"}");
        Response response = requestSpec
                .header("Authorization", "Bearer " + jwtToken)
                .put(baseUrl + port + "/event/type/"+eventTypeId);
        response.then().assertThat()
                .statusCode(400);
    }

    @Test
    @Order(6)
    public void updateEventType_ValidBody_200(){
        RequestSpecification requestSpec = RestAssured.with();
        requestSpec.given().contentType("application/json");
        requestSpec.body("{\"id\":\"" + "1" + "\",\"type\": " + "\"UpdatedTest\"" + " ,\"capacity\":" + "\"100\"}");
        Response response = requestSpec
                .header("Authorization", "Bearer " + jwtToken)
                .put(baseUrl + port + "/event/type/"+eventTypeId);
        eventTypeId = response.path("id");
        response.then().assertThat()
                .statusCode(200);
    }

    @Test
    @Order(7)
    public void deleteEventType_InvalidId_400(){
        int invalidId = eventTypeId+1;
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .delete(baseUrl + port + "/event/type/" + invalidId)
                .then()
                .assertThat()
                .statusCode(400);
    }

    @Test
    @Order(8)
    public void deleteEventType_ValidId_200(){
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .delete(baseUrl + port + "/event/type/" + eventTypeId)
                .then()
                .assertThat()
                .statusCode(200);
    }


}
