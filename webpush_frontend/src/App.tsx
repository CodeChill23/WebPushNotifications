import React, { useEffect, useState } from 'react';
import './App.css';
import {encodeUint8Array, registerServiceWorker, urlB64ToUint8Array, WebPushMessage, WebPushSubscription } from './sw.ts';
import axios from 'axios';
const applicationServerPublicKey="BGxXRT9t7kY8nQ4CVKwLmpVu1vwvmoLDm3WWHiRUvMBb8F6Mj1OCHppwqdgnsCO_ggaEKWwYH5R72WE7piw7xuo"
function App() {
    const[isSubscribed,setIsSubscribed]=useState<boolean>(false)
    const[swRegistration,setSwRegistration]=useState<ServiceWorkerRegistration|null>(null)
    const[newSubscription,setNewSubscription]=useState<WebPushSubscription|null>()
    const [formData, setFormData] = useState<WebPushMessage>({
      title: "",
      clickTarget: "",
      message: "",
      icon: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    useEffect(()=>{
      registerServiceWorker().then(reg=>{
        if(reg){
          setSwRegistration(reg);
        }
      }).catch(error => {
        console.log("🚀 ~ registerServiceWorker ~ error:", error)
      })
    },[])

  const subscribe=async(subscription:WebPushSubscription)=>{
    try{
        const response=await axios.post('http://localhost:8093/api/subscribe',subscription)
        setNewSubscription(response.data)
        return response.data
    }catch(error){
    console.log("🚀 ~ subscribe ~ error:", error)

    }
  } 

  const unsubscribe=async(id:number|undefined)=>{
    try{
      const response=await axios.post('http://localhost:8093/api/unsubscribe',id)
      return response.data
    }catch(error){
      console.log("🚀 ~ unsubscribe ~ error:", error)
    }
  }


  const subscribeFunction=async()=>{
    if(!swRegistration) return;
    try{
      const subscribeParams={
        userVisibleOnly:true,
        applicationServerKey:urlB64ToUint8Array(applicationServerPublicKey)
      }
      const subscription=await swRegistration.pushManager.subscribe(subscribeParams)
      setIsSubscribed(true)

      
      const keyArray = subscription.getKey('p256dh');
      const authArray = subscription.getKey('auth');
  
      if (keyArray && authArray) {
        const encodedKey = encodeUint8Array(new Uint8Array(keyArray));
        const encodedAuth = encodeUint8Array(new Uint8Array(authArray));

        const requestData:WebPushSubscription= {
          publicKey: encodedKey,
          auth: encodedAuth,
          notificationEndPoint: subscription.endpoint,
          userId:1,
        };
  
        await subscribe(requestData);
      }

    }catch(error){
      console.log("🚀 ~ subscribeFunction ~ error:", error)     
    }
  }

  const unsubscribeFunction = async () => {
    if (!swRegistration) return;

    try {
      const subscription = await swRegistration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        setIsSubscribed(false);
        unsubscribe(newSubscription?.id);
        setNewSubscription(null)
      }
    } catch (error) {
      console.error('Error unsubscribing', error);
    }
  };

  const handleButtonClick = () => {
    if (isSubscribed) {
      console.log("Unsubscribing...");
      unsubscribeFunction();
    } else {
      subscribeFunction();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8093/api/notifyAll", formData);
      alert("Notification sent successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification.");
    }
  };


  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Simple Tutorial for Web Push Notifications using React ts + Spring + PostgresQL
        </p>
        <button className='custom-button' onClick={handleButtonClick} >
        {isSubscribed ? 'Unsubscribe from push notifications' : 'Subscribe to push notifications'}
        </button>

       
        <form className="notification-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Send Notification</h2>
      <label className="form-label" htmlFor="title">Title:</label>
      <input
        className="form-input"
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label className="form-label" htmlFor="clickTarget">Click Target (URL):</label>
      <input
        className="form-input"
        type="text"
        id="clickTarget"
        name="clickTarget"
        value={formData.clickTarget}
        onChange={handleChange}
        required
      />

      <label className="form-label" htmlFor="message">Message:</label>
      <textarea
        className="form-input form-textarea"
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
      ></textarea>

      <label className="form-label" htmlFor="icon">Icon URL:</label>
      <input
        className="form-input"
        type="text"
        id="icon"
        name="icon"
        value={formData.icon}
        onChange={handleChange}
      />

      <button className="form-button" type="submit">Send Notification</button>
    </form>
        
      </header>
    </div>
  );
}

export default App;
