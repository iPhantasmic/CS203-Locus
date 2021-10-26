package com.cs203.locus.util;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
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
public class EmailUtilService {

//    @Autowired
//    JavaMailSender mailSender;
//    // FreeMarker Templates Config
//    @Autowired
//    Configuration fmConfiguration;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${spring.sendgrid.api-key}")
    private String sendGridApiKey;

    SendGrid sendGrid = new SendGrid(sendGridApiKey);

    private Mail sendGridMailBuilder(String subject, String toEmail, Content content){
        Email from = new Email(fromEmail);
        Email to = new Email(toEmail);
        Mail mail = new Mail(from, subject, to, content);
        return mail;
    }


    // Reset Password Email

    // Example of usage of formModel
    // Map<String, Object> formModel = new HashMap<>();
    // formModel.put("eventName", eventName);
    // model.put("organiserCompanyName", organiserCompanyName);
    @Async
    public void sendResetEmail(Map<String,Object> formModel) throws MessagingException, IOException, TemplateException {

        String toEmail = (String) formModel.get("recipientEmailAddress");
        String userName = (String) formModel.get("userName");
        String resetPasswordLink = (String) formModel.get("resetPasswordLink");

        String subject = "Reset Your Password - Locus";
        Content content = new Content("text/html", "I'm replacing the <a href=" + resetPasswordLink + ">YEA PW LINK LEGGGOOOO</a>");

        Mail mail = sendGridMailBuilder(subject, toEmail, content);
        Request request = new Request();

        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        Response response = sendGrid.api(request);

//        System.out.println(response.getStatusCode());
//        System.out.println(response.getBody());
//        System.out.println(response.getHeaders());

//        MimeMessage message = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED);
//        // freemarkerConfig.setClassForTemplateLoading(this.getClass(), "/templates");
//        Template template = fmConfiguration.getTemplate("locus-forgot-pw.ftl");
//        String recipientEmailAddress = (String) formModel.get("recipientEmailAddress");
//        String mailSubject = "Reset Your Password - Locus ";
//        helper.setFrom(fromEmail);
//        helper.setTo(recipientEmailAddress);
//        helper.setSubject(mailSubject);
//        helper.setText(FreeMarkerTemplateUtils.processTemplateIntoString(template, formModel), true);
//        mailSender.send(message);
    }

    // Upon successful account signup
    @Async
    public void sendWelcomeEmail(String recipientEmailAddress, String firstName, Map<String,Object> formModel) throws MessagingException, IOException, TemplateException {
        String toEmail = (String) formModel.get("recipientEmailAddress");
        String userName = (String) formModel.get("userName");
        String confirmAccountLink = (String) formModel.get("confirmAccountLink");

        Email from = new Email(fromEmail);
        String subject = "Reset Your Password - Locus";
        Email to = new Email(toEmail);
        Content content = new Content("text/html", "I'm replacing the <a href=" + confirmAccountLink + ">YEA CFM PW LEGGGOOOO</a>");
        Mail mail = new Mail(from, subject, to, content);
        Request request = new Request();

        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        Response response = sendGrid.api(request);

//        Mail mail = new Mail(from, subject, to, content);
//        mail.personalization.get(0).addSubstitution("-name-", "Example User");
//        mail.personalization.get(0).addSubstitution("-city-", "Denver");
//        mail.setTemplateId("13b8f94f-bcae-4ec6-b752-70d6cb59f932");
//        SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
//        Request request = new Request();

//        MimeMessage message = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED);
//        Template template = fmConfiguration.getTemplate("welcome-template.ftl");
//        String mailSubject = "Welcome to the Locus Fam, " + firstName;
//        helper.setFrom(fromEmail);
//        helper.setTo(recipientEmailAddress);
//        helper.setSubject(mailSubject);
//        helper.setText(FreeMarkerTemplateUtils.processTemplateIntoString(template, formModel), true);
//        mailSender.send(message);
    }

    // Upon succesful event signup
    @Async
    public void sendEventSignUpEmail(String recipientEmailAddress, String eventID, String eventName, Map<String,Object> formModel) throws MessagingException, IOException, TemplateException {
//        MimeMessage message = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED);
//        Template template = fmConfiguration.getTemplate("event-signed-up-template.ftl");
//        String mailSubject = "Event " + eventID + " " + eventName + " - You're in!";
//        helper.setFrom(fromEmail);
//        helper.setTo(recipientEmailAddress);
//        helper.setSubject(mailSubject);
//        helper.setText(FreeMarkerTemplateUtils.processTemplateIntoString(template, formModel), true);
//        mailSender.send(message);
    }

    // Upon successful event creation
    @Async
    public void sentEventCreationEmail(String recipientEmailAddress, String eventID, String eventName, Map<String,Object> formModel) throws MessagingException, IOException, TemplateException {
//        MimeMessage message = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED);
//        Template template = fmConfiguration.getTemplate("event-created-template.ftl");
//        String mailSubject = "Event " + eventID + " " + eventName + " - We're all set!";
//        helper.setFrom(fromEmail);
//        helper.setTo(recipientEmailAddress);
//        helper.setSubject(mailSubject);
//        helper.setText(FreeMarkerTemplateUtils.processTemplateIntoString(template, formModel), true);
//        mailSender.send(message);
    }



}
