package com.cs203.locus.util;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
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
public class EmailUtilService {

    @Autowired
    JavaMailSender mailSender;

    // FreeMarker Templates Config
    @Autowired
    Configuration fmConfiguration;


    // Reset Password Email

    // Example of usage of formModel
    // Map<String, Object> formModel = new HashMap<>();
    // formModel.put("eventName", eventName);
    // model.put("organiserCompanyName", organiserCompanyName);
    @Async
    public void sendResetEmail(Map<String,Object> formModel) throws MessagingException, IOException, TemplateException {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED);

        Template template = fmConfiguration.getTemplate("locus-forgot-pw.ftl");

        String recipientEmailAddress = (String) formModel.get("recipientEmailAddress");

        String mailSubject = "Reset Your Password - Locus ";

        helper.setFrom("locus.mails@gmail.com");
        helper.setTo(recipientEmailAddress);
        helper.setSubject(mailSubject);

        helper.setText(FreeMarkerTemplateUtils.processTemplateIntoString(template, formModel), true);

        mailSender.send(message);
    }

    // Upon successful account signup
    @Async
    public void sendWelcomeEmail(String recipientEmailAddress, String firstName, Map<String,Object> formModel) throws MessagingException, IOException, TemplateException {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED);

        Template template = fmConfiguration.getTemplate("welcome-template.ftl");

        String mailSubject = "Welcome to the Locus Fam, " + firstName;

        helper.setFrom("locus.mails@gmail.com");
        helper.setTo(recipientEmailAddress);
        helper.setSubject(mailSubject);

        helper.setText(FreeMarkerTemplateUtils.processTemplateIntoString(template, formModel), true);

        mailSender.send(message);
    }

    // Upon succesful event signup
    @Async
    public void sendEventSignUpEmail(String recipientEmailAddress, String eventID, String eventName, Map<String,Object> formModel) throws MessagingException, IOException, TemplateException {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED);

        Template template = fmConfiguration.getTemplate("event-signed-up-template.ftl");

        String mailSubject = "Event " + eventID + " " + eventName + " - You're in!";

        helper.setFrom("locus.mails@gmail.com");
        helper.setTo(recipientEmailAddress);
        helper.setSubject(mailSubject);

        helper.setText(FreeMarkerTemplateUtils.processTemplateIntoString(template, formModel), true);

        mailSender.send(message);
    }

    // Upon successful event creation
    @Async
    public void sentEventCreationEmail(String recipientEmailAddress, String eventID, String eventName, Map<String,Object> formModel) throws MessagingException, IOException, TemplateException {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED);

        Template template = fmConfiguration.getTemplate("event-created-template.ftl");

        String mailSubject = "Event " + eventID + " " + eventName + " - We're all set!";

        helper.setFrom("locus.mails@gmail.com");
        helper.setTo(recipientEmailAddress);
        helper.setSubject(mailSubject);

        helper.setText(FreeMarkerTemplateUtils.processTemplateIntoString(template, formModel), true);

        mailSender.send(message);

    }



}
