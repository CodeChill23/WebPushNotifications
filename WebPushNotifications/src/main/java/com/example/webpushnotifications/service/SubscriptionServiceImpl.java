package com.example.webpushnotifications.service;

import com.example.webpushnotifications.entities.WebPushMessage;
import com.example.webpushnotifications.entities.WebPushSubscription;
import com.example.webpushnotifications.repository.SubscriptionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.jose4j.lang.JoseException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.Security;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class SubscriptionServiceImpl implements SubscriptionService{

    private static final String PUBLIC_KEY = "BGxXRT9t7kY8nQ4CVKwLmpVu1vwvmoLDm3WWHiRUvMBb8F6Mj1OCHppwqdgnsCO_ggaEKWwYH5R72WE7piw7xuo";
    private static final String PRIVATE_KEY = "ohnP6HHnRH5C3yjs65mfZ7mitJkEwAJuddJSTrTIzso";
    private static final String SUBJECT = "Code&Chill";
    private ObjectMapper objectMapper;


    private final SubscriptionRepository subscriptionRepository;

    public SubscriptionServiceImpl(ObjectMapper objectMapper, SubscriptionRepository subscriptionRepository) {
        this.objectMapper = objectMapper;
        this.subscriptionRepository = subscriptionRepository;
    }

    public void saveSubscription(WebPushSubscription subscription){
        subscriptionRepository.save(subscription);
    }

    public void deleteSubscription(Long id){
        subscriptionRepository.deleteById(id);
    }

    public WebPushSubscription findByNotificationEndPoint(String notification){
        return subscriptionRepository.findByNotificationEndPoint(notification);
    }

    public ResponseEntity<String> notifyAll(WebPushMessage message) throws GeneralSecurityException, IOException, JoseException, ExecutionException, InterruptedException {
        Security.addProvider(new BouncyCastleProvider());
        List<WebPushSubscription> subscriptionList=subscriptionRepository.findAll();
        PushService pushService=new PushService(PUBLIC_KEY,PRIVATE_KEY,SUBJECT);
        for(WebPushSubscription subscription: subscriptionList){
            Notification notification=new Notification(
                    subscription.getNotificationEndPoint(),
                    subscription.getPublicKey(),
                    subscription.getAuth(),
                    objectMapper.writeValueAsBytes(message)

            );
            pushService.send(notification);
        }
        return ResponseEntity.ok("Notifications sent successfully");

    }
}
