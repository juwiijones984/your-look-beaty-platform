import React, { useState } from 'react';
import { X, Send, Phone, MapPin } from 'lucide-react';
import { useEmergency } from '../contexts/EmergencyContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

export const EmergencyMode: React.FC = () => {
  const { activeIncident, deactivateEmergency, sendMessage } = useEmergency();
  const [message, setMessage] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  if (!activeIncident) return null;

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-end">
      {/* Discreet indicator */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse" />

      <Card className="w-full max-w-lg mx-auto mb-4 mx-4 bg-zinc-900 border-zinc-800">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm text-zinc-400">Emergency Active</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={deactivateEmergency}
              className="text-zinc-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-green-500 mt-0.5" />
            <div>
              <div className="text-white">Location Shared</div>
              <div className="text-zinc-500 text-xs">{activeIncident.location.address}</div>
            </div>
          </div>

          {/* Voice Call */}
          <div className="flex gap-2">
            <Button
              onClick={() => setIsVoiceActive(!isVoiceActive)}
              variant={isVoiceActive ? 'destructive' : 'secondary'}
              className="flex-1"
            >
              <Phone className="h-4 w-4 mr-2" />
              {isVoiceActive ? 'End Voice' : 'Start Voice'}
            </Button>
          </div>

          {/* Messages */}
          {activeIncident.hasLiveChat && (
            <>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {activeIncident.messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`p-2 rounded text-sm ${
                      msg.senderId === 'current-user-id'
                        ? 'bg-primary text-primary-foreground ml-8'
                        : 'bg-zinc-800 text-white mr-8'
                    }`}
                  >
                    <div className="text-xs opacity-70 mb-1">{msg.senderName}</div>
                    <div>{msg.message}</div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type message..."
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}

          <div className="text-xs text-zinc-500 text-center">
            Help is on the way. Stay safe.
          </div>
        </div>
      </Card>
    </div>
  );
};
