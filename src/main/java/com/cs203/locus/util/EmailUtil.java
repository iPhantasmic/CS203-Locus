package com.cs203.locus.util;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.Map;

@Service
@EnableAsync
public class EmailUtil {

    @Autowired
    JavaMailSender mailSender;
    // FreeMarker Templates Config
    @Autowired
    Configuration fmConfiguration;

    @Value("${spring.mail.username}")
    private String fromEmail;

    // The following format is used to pass in details into the FreeMarker template
    // Example of usage of formModel
    // Map<String, Object> formModel = new HashMap<>();
    // formModel.put("eventName", eventName);
    // model.put("organiserCompanyName", organiserCompanyName);

    public void sendEmail(String recipientEmailAddress, String mailSubject, Template template, Map<String,Object> formModel) throws MessagingException, TemplateException, IOException {
        // Arrange Email Content
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED);
        helper.setFrom(fromEmail);
        helper.setTo(recipientEmailAddress);
        helper.setSubject(mailSubject);

        // formModel contains the custom information in the email, i.e name of recipient etc for personalization
        helper.setText(FreeMarkerTemplateUtils.processTemplateIntoString(template, formModel), true);

        // Send Email
        mailSender.send(message);
    }

    // Reset Password Email
    @Async
    public void sendResetEmail(Map<String,Object> formModel) throws MessagingException, IOException, TemplateException {
        // Initialise Email Content
        String recipientEmailAddress = (String) formModel.get("recipientEmailAddress");
        String mailSubject = "Reset Your Password - Locus ";
        Template template = fmConfiguration.getTemplate("forgot-pw-template.ftl");

        // Send Customised Email
        sendEmail(recipientEmailAddress, mailSubject, template, formModel);
    }

    // Upon successful account signup, get User to verify and Welcome them in!
    @Async
    public void sendWelcomeEmail(Map<String,Object> formModel) throws MessagingException, IOException, TemplateException {
        // Initialise Email Content
        String recipientEmailAddress = (String) formModel.get("recipientEmailAddress");
        String mailSubject = "Welcome to the Locus Fam, " + formModel.get("userName");
        Template template = fmConfiguration.getTemplate("welcome-template.ftl");

        sendEmail(recipientEmailAddress, mailSubject, template, formModel);
    }

    // Upon any changes to their account details, let Users know of the change made
    @Async
    public void sendChangeMadeNoti(Map<String,Object> formModel) throws MessagingException, IOException, TemplateException {
        // Initialise Email Content
        String recipientEmailAddress = (String) formModel.get("recipientEmailAddress");
        String changeMade = (String) formModel.get("changeMade");
        String mailSubject = "Locus : A change has been made to your account details";
        Template template = fmConfiguration.getTemplate("generic-change-template.ftl");

        // Send Customised Email
        sendEmail(recipientEmailAddress, mailSubject, template, formModel);
    }


    // Upon successful event signup, let Participants know they've successfully signed up for the following event
    @Async
    public void sendEventSignUpEmail(Map<String,Object> formModel) throws MessagingException, IOException, TemplateException {
        // Initialise Email Content
        String recipientEmailAddress = (String) formModel.get("recipientEmailAddress");
        String eventID = (String) formModel.get("eventId");
        String eventName = (String) formModel.get("eventName");
        String mailSubject = "Event " + eventID + " " + eventName + " - You're in!";
        Template template = fmConfiguration.getTemplate("event-signed-up-template.ftl");

        // Send Customised Email
        sendEmail(recipientEmailAddress, mailSubject, template, formModel);
    }

    // Upon successful event creation, let Organisers know they have successfully created the event.
    @Async
    public void sendEventCreationEmail(Map<String,Object> formModel) throws MessagingException, IOException, TemplateException {
        // Initialise Email Content
        String recipientEmailAddress = (String) formModel.get("recipientEmailAddress");
        String eventID = (String) formModel.get("eventId");
        String eventName = (String) formModel.get("eventName");
        String mailSubject = "Event " + eventID + " " + eventName + " - We're all set!";
        Template template = fmConfiguration.getTemplate("event-created-template.ftl");

        // Send Customised Email
        sendEmail(recipientEmailAddress, mailSubject, template, formModel);
    }

    // Upon successful event creation, let Organisers know they have successfully created the event.
    @Async
    public void sendForgotUsernameEmail(Map<String,Object> formModel) throws MessagingException, IOException, TemplateException {
        // Initialise Email Content
        String recipientEmailAddress = (String) formModel.get("recipientEmailAddress");
        String mailSubject = "Your Locus Username";
        Template template = fmConfiguration.getTemplate("forgot-username-template.ftl");

        // Send Customised Email
        sendEmail(recipientEmailAddress, mailSubject, template, formModel);
    }

    // Upon successful event creation, let Organisers know they have successfully created the event.
    @Async
    public void sendEventTypeUpdate(Map<String,Object> formModel) throws MessagingException, IOException, TemplateException {
        // Initialise Email Content
        String recipientEmailAddress = (String) formModel.get("recipientEmailAddress");
        String mailSubject = "Updated Events:";
        Template template = fmConfiguration.getTemplate("admin-updated-event.ftl");

        // Send Customised Email
        sendEmail(recipientEmailAddress, mailSubject, template, formModel);
    }





}
