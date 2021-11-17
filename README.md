# [Locus](https://locus.social/)

![alt text](https://raw.githubusercontent.com/iPhantasmic/Locus/main/client/public/logo_white.png?token=ANR36DQCESIIH3KJSBT7FHDBTUN64 "Logo Title Text 1")
> By **G1T7**
> - [Justin LAM Xi Kai](https://github.com/iPhantasmic/)
> - [Omer (A) WAI Yan Oo](https://github.com/omerwyo/)
> - [LAI Jye Yi](http://github.com/machi-a/)
> - [OWYONG Jian Wei](http://github.com/smu-alvinowyong/)
> - [Nicholas ONG Chi Kiat](http://github.com/oversparkling/)

## Problem Statement
**"With the nation healing from Covid-19, a 'New Normal' API needs to be established to cohesively coordinate effort for ensuring our recovery trajectory remains on course."**
>Prior to the pandemic, Singapore was host to many events, both large and small scale. Locus serves to enable community-building again in the new normal by empowering both participants and organisers the convenience of keeping in sync with the prevailing guidelines.

## Target Audience
Event Organizers and participants

## Core Features
***Event Management***
> Users have the freedom to take part in public events that can accommodate a number of participants based on the prevailing guidelines. Users can also organise events based on their interests and choose to make them private. Our application is updated with the prevailing measures and will be convenient for users to abide to the prevailing measures

***Locus API***
> As a complement to our application, we created a self-sufficient microservice, LocusAPI which gathers news and acts as a content management system. LocusAPI provides public endpoints that allow the user to gather information such as Covid-19 Updates and Government Press Releases. The documentation for this microservice can be found [here](https://dev.locus.social). The repository for this service can also be found [here](https://github.com/omerwyo/LocusAPI).

***Image Filtering***
> To ensure that Locus is a family friendly application, we included a filter for any image uploading functionality within the application. This service utilises Google Cloud Vision to protect against inappropriate content.

***Private Events***
> Recognising the need for some events to be private and exclusive, we included the use of a special invite code within our application that organizers can share.

***OpenAttestation Verification***
> To ensure that guidelines governing events are followed, we have to ensure that the vaccination status of our users are valid and updated. As such we automated the process of validating a user's vaccination status with the use of a microservice. The repository can be found [here](https://github.com/oversparkling/VaccinationVerification)

## **Technology Stack**
- [Next.js](https://nextjs.org/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [TailwindCSS](https://tailwindcss.com/)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/)
- [Express.js](https://expressjs.com/)
- [Google Cloud Platform](https://cloud.google.com/gcp)
- [Heroku](https://www.heroku.com/)
- [Vercel](https://vercel.com/)

## **API Documentation**
> To find out more about our API endpoints, you can look at our detailed documentation [here](https://documenter.getpostman.com/view/18381783/UVCBB4he)


## Future Considerations
- Scheduling algorithm for organisers to have an overview of venues that are available for the time of event
- Inclusion of a TraceTogether API that allows us to consolidate all the possible event spaces in Singapore
- Attendance taking using Event Ticket QR code


## Local Deployment

### Cloning of Repo
```base
$ git clone https://github.com/iPhantasmic/Locus.git
```

### Configuration for application.properties
| Field                          | Description                                                                                                                    |
:---------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| spring.datasource.url          |     Url of the database for Spring Boot project.                                                                              |
|         spring.datasource.password      |             Password credentials for database.                                                                      |
| jwt.secret                             | Secret key for JWT. Should be a long random string that is secret to you.    |
| jwt.admin.pass                             | Password for default admin user.  |
|       oa.healthcert.url                     | Url for the health certificate verification endpoint. Should follow the form of https://domain/verifyvaccination   |
|       news.microservice.url                  | Url for the news microservice. This endpoint requires an API key to be passed for verification. Should follow the form of https://domain/admin?API_KEY=xxx   |
|       spring.mail.username                  | Email address of account that would be sending out the emails for our email service.  |
|       spring.mail.password                | Password credential for email account.  |

### Spring Boot project
For UNIX:
```bash
$ ./mvnw spring-boot:run
```
For Windows:
```bash
$ mvn spring-boot:run
```
The backend will be hosted on port 8080

### Next.js Application
```bash
$ cd client
$ npm i
$ npm run dev
```
The client will be accessible from port 3000


## Disclaimer
- We do not own or license any copyrights in the images used in the application. You may use the Services and the contents contained in the Services soley for your own individual non-commercial and informational purposes only.
