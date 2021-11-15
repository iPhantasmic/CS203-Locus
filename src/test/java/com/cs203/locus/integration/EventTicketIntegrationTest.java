package com.cs203.locus.integration;

import com.cs203.locus.models.event.Event;
import com.cs203.locus.models.event.EventTicket;
import com.cs203.locus.models.event.EventTicketDTO;
import com.cs203.locus.models.eventtype.EventType;
import com.cs203.locus.models.user.User;
import com.cs203.locus.models.user.UserDTO;
import com.cs203.locus.repository.EventRepository;
import com.cs203.locus.repository.EventTicketRepository;
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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;

import static io.restassured.RestAssured.given;


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EventTicketIntegrationTest {
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

    @Autowired
    EventTicketRepository eventTicketRepository;

    private String inviteCode;

    private String jwtToken;

    private int eventId;

    private final String baseUrl = "http://localhost:";

    private int eventTicketId;

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
        eventType = eventTypeService.createEventType(eventType);
        event.setType(eventType);
        eventId = eventService.createEvent(event).getId();
    }

    @AfterAll
    public void tearDown() {
        userRepository.deleteAll();
        eventTypeRepository.deleteAll();
        eventRepository.deleteAll();
        eventTicketRepository.deleteAll();
    }

    @Test
    @Order(1)
    public void createTicket_InvalidBody_403() {

        RequestSpecification requestSpec = RestAssured.with();
        requestSpec.given().contentType("application/json");
        Response response = requestSpec
                .header("Authorization", "Bearer " + jwtToken)
                .post(baseUrl + port + "/ticket/new?participantId="+user.getId()+1+"&eventId="+eventId);
        response.then().assertThat()
                .statusCode(403);
    }

    @Test
    @Order(2)
    public void createTicket_ValidBody_200() {

        RequestSpecification requestSpec = RestAssured.with();
        requestSpec.given().contentType("application/json");
        Response response = requestSpec
                .header("Authorization", "Bearer " + jwtToken)
                .post(baseUrl + port + "/ticket/new?participantId="+user.getId()+"&eventId="+eventId);
        eventTicketId = response.path("id");
        response.then().assertThat()
                .statusCode(200);
    }

    @Test
    @Order(3)
    public void getParticipationStatus_ValidInput_200(){
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .get(baseUrl + port + "/ticket/hasParticipatedEvent/"+ user.getParticipantProfile().getId()+"/"+ eventId)
                .then()
                .assertThat()
                .statusCode(200)
                .assertThat()
                .extract()
                .toString()
                .equals(false);

    }

    @Test
    @Order(4)
    public void getParticipationStatus_InvalidInputAndReturnFalse_200(){
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .get(baseUrl + port + "/ticket/hasParticipatedEvent/"+ user.getParticipantProfile().getId()+1+"/"+ eventId)
                .then().log().all()
                .assertThat()
                .statusCode(200).assertThat().extract().toString().equals(false);
    }

    @Test
    @Order(5)
    public void getEventTicket_ValidInput_200(){
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .get(baseUrl + port + "/ticket/" + eventTicketId)
                .then().log().all()
                .assertThat()
                .statusCode(200);
    }

    @Test
    @Order(6)
    public void getEventTicket_InvalidInput_400(){
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .get(baseUrl + port + "/ticket/"+ eventTicketId+2)
                .then().log().all()
                .assertThat()
                .statusCode(400);
    }

    @Test
    @Order(7)
    public void deleteEventTicket_InvalidInput_400(){
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .delete(baseUrl + port + "/ticket/"+ eventTicketId+2)
                .then().log().all()
                .assertThat()
                .statusCode(400);
    }


    @Test
    @Order(8)
    public void deleteEventTicket_ValidInput_200(){
        given()
                .header("Authorization", "Bearer " + jwtToken)
                .when()
                .delete(baseUrl + port + "/ticket/"+ eventTicketId)
                .then().log().all()
                .assertThat()
                .statusCode(200);
    }




}


