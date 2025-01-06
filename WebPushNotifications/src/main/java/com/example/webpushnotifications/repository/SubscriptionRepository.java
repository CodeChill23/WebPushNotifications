package com.example.webpushnotifications.repository;

import com.example.webpushnotifications.entities.WebPushSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<WebPushSubscription,Long> {
    WebPushSubscription findByNotificationEndPoint(String notificationEndPoint);
}
