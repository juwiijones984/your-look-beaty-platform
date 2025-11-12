import React, { createContext, useContext, useState } from 'react';
import { EmergencyIncident } from '../types';

interface EmergencyContextType {
  isEmergencyMode: boolean;
  activeIncident: EmergencyIncident | null;
  activateEmergency: (location: { lat: number; lng: number; address: string }) => void;
  deactivateEmergency: () => void;
  sendMessage: (message: string) => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) throw new Error('useEmergency must be used within EmergencyProvider');
  return context;
};

export const EmergencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [activeIncident, setActiveIncident] = useState<EmergencyIncident | null>(null);

  const activateEmergency = (location: { lat: number; lng: number; address: string }) => {
    const incident: EmergencyIncident = {
      id: `emergency-${Date.now()}`,
      userId: 'current-user-id',
      userName: 'Current User',
      createdAt: new Date(),
      location,
      status: 'active',
      hasLiveChat: true,
      responders: [],
      messages: [],
    };

    setActiveIncident(incident);
    setIsEmergencyMode(true);

    // In real app, this would trigger Firebase Cloud Function
    console.log('🚨 EMERGENCY ACTIVATED', incident);
  };

  const deactivateEmergency = () => {
    setIsEmergencyMode(false);
    setActiveIncident(null);
  };

  const sendMessage = (message: string) => {
    if (activeIncident) {
      const newMessage = {
        id: `msg-${Date.now()}`,
        senderId: 'current-user-id',
        senderName: 'You',
        message,
        timestamp: new Date(),
      };
      
      setActiveIncident({
        ...activeIncident,
        messages: [...activeIncident.messages, newMessage],
      });
    }
  };

  return (
    <EmergencyContext.Provider value={{
      isEmergencyMode,
      activeIncident,
      activateEmergency,
      deactivateEmergency,
      sendMessage,
    }}>
      {children}
    </EmergencyContext.Provider>
  );
};
