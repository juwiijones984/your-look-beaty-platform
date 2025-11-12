import { getMessaging, getToken, onMessage, MessagePayload } from "firebase/messaging";
import { messaging } from "../firebase";

export const requestNotificationPermission = async (): Promise<string | null> => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'YOUR_VAPID_KEY_HERE' // You'll need to add this to Firebase Console
      });
      return token;
    }
    return null;
  } catch (error) {
    console.error('Error getting notification permission:', error);
    return null;
  }
};

export const onMessageListener = (callback: (payload: MessagePayload) => void) => {
  return onMessage(messaging, callback);
};

export const sendNotification = async (title: string, body: string, userToken?: string) => {
  // This would typically be done via Firebase Cloud Functions
  // For now, we'll use the browser notification API as fallback
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/logo.png',
      badge: '/logo.png'
    });
  }
};

export const sendEmergencyAlert = async (incidentId: string, location: string) => {
  const title = '🚨 EMERGENCY ALERT';
  const body = `New emergency incident reported at ${location}. Respond immediately.`;

  // Send to all responders (this would be handled by Cloud Functions in production)
  await sendNotification(title, body);
};

export const sendPromotionNotification = async (title: string, body: string, targetUsers: string[]) => {
  // This would send to specific users via Cloud Functions
  console.log('Sending promotion to users:', targetUsers);
};

export const sendBookingConfirmation = async (customerId: string, serviceName: string, date: string) => {
  const title = 'Booking Confirmed';
  const body = `Your ${serviceName} appointment on ${date} has been confirmed.`;

  await sendNotification(title, body);
};

export const sendProviderUpdate = async (providerId: string, message: string) => {
  const title = 'Provider Update';
  const body = message;

  await sendNotification(title, body);
};