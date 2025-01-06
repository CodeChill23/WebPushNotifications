# Web Push Notifications 🚀

This is a full-stack web push notification system that allows you to send real-time notifications to users, even when they are not actively browsing your website. This project demonstrates how to integrate web push notifications into an application using modern web technologies, such as
**React**, **Service Workers**, **SpringBoot**, **VAPID keys**, and **PostgreSQL** .
---

## Table of Contents 📚

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup](#setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [VAPID Key Generation](#vapid-key-generation)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

In this project, you'll implement both the frontend and backend components to send and manage web push notifications.

- **Frontend**: Built with **React** and **TypeScript** to create an interactive UI for subscribing to push notifications.
- **Backend**: Developed using **Spring Boot** (Java), managing the logic of storing subscriptions and sending notifications.
- **Service Worker**: Used to handle background tasks for receiving notifications, even when the app is not open.
- **VAPID Keys**: Utilized to authenticate the push notification requests securely.
- **PostgreSQL**: Stores user subscriptions for notifications.

By the end of the tutorial, you’ll have built a fully functional web push notification system that can send messages to users across multiple devices.

## 🛠️ Tech Stack

- **Frontend**: 
  - **React** (with **TypeScript**) for building the user interface.
  - **Service Workers** to handle push notifications in the background.
- **Backend**: 
  - **Spring Boot** (Java) for building the backend API.
  - **PostgreSQL** for storing push notification subscriptions.
- **Push Notifications**: 
  - **web-push** library for sending push notifications to subscribed users.
  - **VAPID Key** based authentication for secure communication.
- **Other**:
  - **CORS** for enabling cross-origin requests between frontend and backend.
---

## 🌈 Features

- Send real-time push notifications to users even when they are not on your website.
- Subscription management: Users can subscribe/unsubscribe from notifications.
- Notifications are sent securely using VAPID keys for authentication.
- Full-stack architecture with React frontend and Spring Boot backend.
- PostgreSQL database to store push notification subscription information.

## Setup ⚙️

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/CodeChill23/WebPushNotifications.git
   cd webpush_frontend
   
2. Install dependencies:

   ```bash
   npm install

3. Start the React frontend:

   ```bash
   npm start

4. Access the app: Open http://localhost:3000 in your browser. 🌍


### Backend Setup ☕📦

1. Clone the repository:

   ```bash
   git clone https://github.com/CodeChill23/WebPushNotifications.git
   cd WebPushNotifications
   
2. Set up PostgreSQL:

Create a PostgreSQL database and configure it in your application.properties or application.yml.
Make sure you have Java 11 or newer and Maven installed.
   
2. Run the backend:

   ```bash
   mvn spring-boot:run


4. Access the backend: The backend API will be running at http://localhost:8080.



---

## 🖌️ VAPID Key Generation

To securely send notifications, you will need VAPID keys. You can generate them using the VAPID Key Generator.

Once generated, you will need to configure them in the backend (In the SubscriptionServiceImpl.java file).

---

## 🤝 Contribution
Contributions are welcome! Feel free to fork this repo and submit a pull request. For major changes, please open an issue first.

---


##  📝 Contact
Special thanks to the open-source community and the creators of React, Vite, and Tailwind CSS.

For questions, suggestions, or feedback:


YouTube:[ Code & Chill](https://youtu.be/-1i87q_H4lg?si=dBm_KSQ26pNiNReX)

TikTok: [@CodeChill23](https://www.tiktok.com/@codechill23)

Don’t forget to ⭐ this repository if you find it helpful!
