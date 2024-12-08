package com.example.demo.security.mailVerify;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailVerification {
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${backend.url}")
    private String backendUrl;

    public void sendVerificationEmail(String to, String token) {
        String verificationLink = backendUrl + "/api/auth/verify?token=" + token;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Email Verification");
        message.setText("Click the link to verify your email: " + verificationLink);
        javaMailSender.send(message);
    }


}
