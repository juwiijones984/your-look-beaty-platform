import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Phone, MessageSquare, CheckCircle, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Logo } from '../../components/Logo';
import { useAuth } from '../../contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { mockEmergencyIncidents } from '../../data/mockData';
import { EmergencyIncident } from '../../types';
import { toast } from 'sonner@2.0.3';

export const ResponderDashboard: React.FC = () => {
  const { logout } = useAuth();
  const [incidents, setIncidents] = useState(mockEmergencyIncidents);
  const [selectedIncident, setSelectedIncident] = useState<EmergencyIncident | null>(null);
  const [message, setMessage] = useState('');
  const [hasNewAlert, setHasNewAlert] = useState(false);

  useEffect(() => {
    // Simulate new emergency alert
    const timer = setTimeout(() => {
      setHasNewAlert(true);
      // Vibrate if supported
      if (navigator.vibrate) {
        navigator.vibrate([500, 200, 500, 200, 500]);
      }
      toast.error('🚨 NEW EMERGENCY ALERT', {
        duration: 10000,
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const activeIncidents = incidents.filter(i => i.status !== 'resolved');
  const resolvedIncidents = incidents.filter(i => i.status === 'resolved');

  const handleAcknowledge = (incident: EmergencyIncident) => {
    setIncidents(incidents.map(i =>
      i.id === incident.id ? { ...i, status: 'acknowledged' as const } : i
    ));
    setSelectedIncident({ ...incident, status: 'acknowledged' });
    setHasNewAlert(false);
    toast.success('Incident acknowledged');
  };

  const handleUpdateStatus = (incidentId: string, status: EmergencyIncident['status']) => {
    setIncidents(incidents.map(i =>
      i.id === incidentId ? { ...i, status } : i
    ));
    if (selectedIncident?.id === incidentId) {
      setSelectedIncident({ ...selectedIncident, status });
    }
    toast.success(`Incident marked as ${status}`);
  };

  const handleSendMessage = () => {
    if (!selectedIncident || !message.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'responder',
      senderName: 'Responder',
      message,
      timestamp: new Date(),
    };

    setIncidents(incidents.map(i =>
      i.id === selectedIncident.id
        ? { ...i, messages: [...i.messages, newMessage] }
        : i
    ));

    setSelectedIncident({
      ...selectedIncident,
      messages: [...selectedIncident.messages, newMessage],
    });

    setMessage('');
    toast.success('Message sent');
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <header className={`border-b sticky top-0 z-40 transition-colors ${
        hasNewAlert ? 'bg-red-600 animate-pulse' : 'bg-zinc-800 border-zinc-700'
      }`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <Badge variant="destructive">Emergency Response</Badge>
            {activeIncidents.length > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                {activeIncidents.length} Active
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={logout} className="text-white hover:bg-zinc-700">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl mb-2">Emergency Response Center</h1>
          <p className="text-zinc-400">Monitor and respond to safety incidents</p>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="bg-zinc-800">
            <TabsTrigger value="active" className="data-[state=active]:bg-red-600">
              Active Incidents ({activeIncidents.length})
            </TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="resolved">Resolved ({resolvedIncidents.length})</TabsTrigger>
          </TabsList>

          {/* Active Incidents */}
          <TabsContent value="active" className="space-y-4">
            {activeIncidents.length > 0 ? (
              activeIncidents.map(incident => (
                <Card
                  key={incident.id}
                  className={`bg-zinc-800 border-zinc-700 cursor-pointer transition-all ${
                    incident.status === 'active' ? 'border-red-500 border-2' : ''
                  }`}
                  onClick={() => setSelectedIncident(incident)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-3 rounded-lg ${
                          incident.status === 'active' ? 'bg-red-600' : 'bg-orange-600'
                        }`}>
                          <AlertTriangle className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg">Incident #{incident.id}</h3>
                            <Badge variant={incident.status === 'active' ? 'destructive' : 'secondary'}>
                              {incident.status}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm text-zinc-400">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{incident.location.address}</span>
                            </div>
                            <div>Time: {incident.createdAt.toLocaleString('en-ZA')}</div>
                            {incident.hasLiveChat && (
                              <div className="flex items-center gap-2 text-green-400">
                                <MessageSquare className="h-4 w-4" />
                                <span>Live chat available</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {incident.status === 'active' && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAcknowledge(incident);
                            }}
                            variant="destructive"
                          >
                            Acknowledge
                          </Button>
                        )}
                        <Button variant="outline" className="text-white border-zinc-600">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-zinc-800 border-zinc-700">
                <CardContent className="p-12 text-center">
                  <Shield className="h-12 w-12 text-zinc-600 mx-auto mb-3" />
                  <p className="text-zinc-400">No active incidents</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Map View */}
          <TabsContent value="map">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Live Incident Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-700">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-zinc-600 mx-auto mb-3" />
                    <p className="text-zinc-500">Map integration would show here</p>
                    <p className="text-sm text-zinc-600 mt-2">
                      {activeIncidents.length} active incident{activeIncidents.length !== 1 ? 's' : ''} on map
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resolved Incidents */}
          <TabsContent value="resolved" className="space-y-4">
            {resolvedIncidents.map(incident => (
              <Card key={incident.id} className="bg-zinc-800 border-zinc-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <div>
                        <h3 className="mb-1">Incident #{incident.id}</h3>
                        <div className="text-sm text-zinc-400">
                          {incident.location.address} • {incident.createdAt.toLocaleDateString('en-ZA')}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      Resolved
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Incident Detail Dialog */}
      <Dialog open={!!selectedIncident} onOpenChange={() => setSelectedIncident(null)}>
        <DialogContent className="max-w-2xl bg-zinc-900 text-white border-zinc-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              Incident #{selectedIncident?.id}
            </DialogTitle>
          </DialogHeader>
          
          {selectedIncident && (
            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center gap-3">
                <span className="text-zinc-400">Status:</span>
                <Badge variant={selectedIncident.status === 'active' ? 'destructive' : 'secondary'}>
                  {selectedIncident.status}
                </Badge>
                <div className="flex-1" />
                <div className="flex gap-2">
                  {selectedIncident.status !== 'resolved' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-zinc-600"
                        onClick={() => handleUpdateStatus(selectedIncident.id, 'in-progress')}
                      >
                        Mark In Progress
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleUpdateStatus(selectedIncident.id, 'resolved')}
                      >
                        Mark Resolved
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Location */}
              <Card className="bg-zinc-800 border-zinc-700">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="text-sm text-zinc-400 mb-1">Live Location</div>
                      <div>{selectedIncident.location.address}</div>
                      <div className="text-sm text-zinc-500 mt-1">
                        Lat: {selectedIncident.location.lat}, Lng: {selectedIncident.location.lng}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="ml-auto text-white border-zinc-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      Open in Maps
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Communication */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Start Voice Call
                  </Button>
                </div>

                {/* Chat */}
                {selectedIncident.hasLiveChat && (
                  <>
                    <div className="bg-zinc-800 rounded-lg p-4 max-h-64 overflow-y-auto space-y-3">
                      {selectedIncident.messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`p-3 rounded-lg ${
                            msg.senderId === 'responder'
                              ? 'bg-blue-600 ml-12'
                              : 'bg-zinc-700 mr-12'
                          }`}
                        >
                          <div className="text-xs text-zinc-300 mb-1">{msg.senderName}</div>
                          <div className="text-sm">{msg.message}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message..."
                        className="bg-zinc-800 border-zinc-700 text-white"
                      />
                      <Button onClick={handleSendMessage}>
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
