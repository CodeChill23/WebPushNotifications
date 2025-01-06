package com.example.webpushnotifications.controller;

import com.example.webpushnotifications.entities.WebPushMessage;
import com.example.webpushnotifications.entities.WebPushSubscription;
import com.example.webpushnotifications.service.SubscriptionService;
import org.jose4j.lang.JoseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/")
public class WebPushController {
    public WebPushController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    private final SubscriptionService subscriptionService;

    @PostMapping("/subscribe")
    public void subscribe(@RequestBody WebPushSubscription webPushSubscription){
         subscriptionService.saveSubscription(webPushSubscription);
    }

    @PostMapping("unsubscribe")
    public void unsubscribe(@RequestBody Long id){
        subscriptionService.deleteSubscription(id);
    }

    @PostMapping("notifyAll")
    public ResponseEntity<String> notifyAll(@RequestBody WebPushMessage message) throws JoseException, GeneralSecurityException, IOException, ExecutionException, InterruptedException {
        return subscriptionService.notifyAll(message);
    }
}
