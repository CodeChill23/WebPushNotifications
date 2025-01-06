package com.example.webpushnotifications.service;

import com.example.webpushnotifications.entities.WebPushMessage;
import com.example.webpushnotifications.entities.WebPushSubscription;
import org.jose4j.lang.JoseException;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.concurrent.ExecutionException;


public interface SubscriptionService {
    void saveSubscription(WebPushSubscription subscription);
    void deleteSubscription(Long id);
    WebPushSubscription findByNotificationEndPoint(String notification);
    ResponseEntity<String> notifyAll(WebPushMessage message) throws GeneralSecurityException, IOException, JoseException, ExecutionException, InterruptedException;

}
