package com.cs203.locus.integration;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventTicket;
import com.cs203.locus.models.eventtype.EventType;
import com.cs203.locus.models.organiser.Organiser;
import com.cs203.locus.models.user.User;
import com.cs203.locus.models.user.UserDTO;
import com.cs203.locus.repository.EventRepository;
import com.cs203.locus.repository.EventTypeRepository;
import com.cs203.locus.repository.UserRepository;
import com.cs203.locus.security.JwtUserDetailsService;
import com.cs203.locus.service.EventService;
import com.cs203.locus.service.EventTypeService;
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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;

import static io.restassured.RestAssured.given;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EventIntegrationTest {
    @LocalServerPort
    private int port;

    @Autowired
    EventService eventService;

    @Autowired
    EventTypeRepository eventTypeRepository;

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EventTypeService eventTypeService;

    @Autowired
    JwtUserDetailsService jwtUserDetailsService;

    User user;

    private String inviteCode;

    private String jwtToken;

    private int eventId;

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
    void setupUserAndTestEvent(@Autowired JwtUserDetailsService jwtUserDetailsService) {
        UserDTO userDTO = new UserDTO();
        userDTO.setName("testAccount");
        userDTO.setUsername("testAccount");
        userDTO.setEmail("test@scis.smu.edu.sg");
        userDTO.setPassword("P@ssw0rd");
        userDTO.setConfirmPassword("P@ssw0rd");
        user = jwtUserDetailsService.create(userDTO);
        getToken(userDTO.getUsername(), userDTO.getPassword());

        Event event = new Event();
        event.setName("Test Event");
        event.setOrganiser(user.getOrganiserProfile());
        event.setTag("test");
        event.setDescription("Test");
        event.setAddress("my house");
        event.setStartDateTime(LocalDateTime.now().plusDays(1L));
        event.setEndDateTime(LocalDateTime.now().plusDays(5L));
        event.setCreateAt(new Date(System.currentTimeMillis()));
        event.setUpdateAt(new Date(System.currentTimeMillis()));
        event.setEventTicket(new ArrayList<EventTicket>());
        EventType eventType = new EventType();
        eventType.setType("Attractions");
        eventType.setCapacity(100);
        System.out.println(eventTypeService.createEventType(eventType).getType());
        event.setType(eventType);
        inviteCode = eventService.createEvent(event).getInviteCode();
    }

    @AfterAll
    public void tearDown() {
        userRepository.deleteAll();
        eventTypeRepository.deleteAll();
        eventRepository.deleteAll();
    }

    @Test
    @Order(1)
    public void createEvent_ValidBody_200() {
        Integer organiserId = user.getOrganiserProfile().getId();
        RequestSpecification requestSpec = RestAssured.with();
        requestSpec.given().contentType("application/json");
        requestSpec.body("{\"organiserId\":\"" + organiserId + "\",\"name\": " + "\"Test\"" + " ,\"tag\":" + "\"Test\"," + "\"description\":" + "\"Test\"," + "\"address\":" + "\"Test\"," + "\"startDateTime\":" + "\"2021-12-03T11:30\"," + "\"isPrivate\":" + "false ," + "\"type\":" + "\"Attractions\"," + "\"imageGcsUrl\":" + "\"Test\"," + "\"endDateTime\":" + "\"2021-12-07T11:30\"}");
        Response response = requestSpec
                .header("Authorization", "Bearer " + jwtToken)
                .post(baseUrl + port + "/event/new");
        System.out.println(response.getBody().asString());
        eventId = response.path("id");

        response.then().assertThat()
                .statusCode(200);
    }

    @Test
    @Order(2)
    public void createEvent_InvalidTimeBody_400() {
        Integer organiserId = user.getOrganiserProfile().getId();
        RequestSpecification requestSpec = RestAssured.with();
        requestSpec.given().contentType("application/json");
        requestSpec.body("{\"organiserId\":\"" + organiserId + "\",\"name\": " + "\"Test\"" + " ,\"tag\":" + "\"Test\"," + "\"description\":" + "\"Test\"," + "\"address\":" + "\"Test\"," + "\"startDateTime\":" + "\"2021-12-03T11:30\"," + "\"isPrivate\":" + "false ," + "\"type\":" + "\"Attractions\"," + "\"imageGcsUrl\":" + "\"Test\"," + "\"endDateTime\":" + "\"2021-111:30\"}");
        Response response = requestSpec
                .header("Authorization", "Bearer " + jwtToken)
                .post(baseUrl + port + "/event/new");
        response.then().assertThat()
                .statusCode(400);
    }

    @Test
    @Order(3)
    public void getEvent_ValidId_200() {
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .get(baseUrl + port + "/event/" + eventId)
                .then()
                .assertThat()
                .statusCode(200);
    }
    @Test
    @Order(4)
    public void getEvent_InvalidId_400() {
        int invalidEventId = eventId+1;
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .get(baseUrl + port + "/event/" + invalidEventId)
                .then()
                .assertThat()
                .statusCode(400);
    }

    @Test
    @Order(5)
    public void updateEvent_ValidId_200(){
        Integer organiserId = user.getOrganiserProfile().getId();
        RequestSpecification requestSpec = RestAssured.with();
        requestSpec.given().contentType("application/json");
        requestSpec.body("{\"organiserId\":\"" + organiserId + "\",\"name\": " + "\"TestChanged\"" + " ,\"tag\":" + "\"Test\"," + "\"description\":" + "\"Test\"," + "\"address\":" + "\"Test\"," + "\"startDateTime\":" + "\"2021-12-03T11:30\"," + "\"isPrivate\":" + "false ," + "\"type\":" + "\"Attractions\"," + "\"imageGcsUrl\":" + "\"Test\"," + "\"endDateTime\":" + "\"2021-12-07T11:30\"}");
        requestSpec
                .header("Authorization", "Bearer " + jwtToken)
                .put(baseUrl + port + "/event/"+eventId)
                .then()
                .log().all()
                .assertThat()
                .statusCode(200);

    }

    @Test
    @Order(6)
    public void updateEvent_InvalidId_400(){
        Integer organiserId = user.getOrganiserProfile().getId() + 1;
        RequestSpecification requestSpec = RestAssured.with();
        requestSpec.given().contentType("application/json");
        requestSpec.body("{\"organiserId\":\"" + organiserId + "\",\"name\": " + "\"TestChanged\"" + " ,\"tag\":" + "\"Test\"," + "\"description\":" + "\"Test\"," + "\"address\":" + "\"Test\"," + "\"startDateTime\":" + "\"2021-12-03T11:30\"," + "\"isPrivate\":" + "false ," + "\"type\":" + "\"Attractions\"," + "\"imageGcsUrl\":" + "\"Test\"," + "\"endDateTime\":" + "\"2021-12-07T11:30\"}");
        requestSpec
                .header("Authorization", "Bearer " + jwtToken)
                .put(baseUrl + port + "/event/"+eventId)
                .then()
                .log().all()
                .assertThat()
                .statusCode(400);
    }

    @Test
    @Order(7)
    public void getEventByInviteCode_ValidCode_200() {
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .get(baseUrl + port + "/event/invite/" + inviteCode)
                .then()
                .assertThat()
                .statusCode(200);
    }
    @Test
    @Order(7)
    public void getEventByInviteCode_InvalidCode_404() {
        String invalidInviteCode = inviteCode+"Test";
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .get(baseUrl + port + "/event/invite/" + invalidInviteCode)
                .then()
                .assertThat()
                .statusCode(404);
    }



}
