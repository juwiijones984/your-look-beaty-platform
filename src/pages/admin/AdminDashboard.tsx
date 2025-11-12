import React, { useState } from 'react';
import { Users, TrendingUp, AlertTriangle, DollarSign, Activity, Send, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Logo } from '../../components/Logo';
import { useAuth } from '../../contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { mockEmergencyIncidents } from '../../data/mockData';
import { toast } from 'sonner@2.0.3';

export const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showBroadcast, setShowBroadcast] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState('all');

  const stats = {
    totalUsers: 1248,
    activeProviders: 48,
    totalBookings: 892,
    totalRevenue: 145230,
    emergencyIncidents: mockEmergencyIncidents.length,
    activeIncidents: mockEmergencyIncidents.filter(i => i.status !== 'resolved').length,
  };

  const recentUsers = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'customer', status: 'active' },
    { id: '2', name: 'Beauty by Thandi', email: 'thandi@example.com', role: 'provider', status: 'pending' },
    { id: '3', name: 'John Doe', email: 'john@example.com', role: 'customer', status: 'active' },
  ];

  const handleSendBroadcast = () => {
    if (!broadcastMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    toast.success(`Broadcast sent to ${broadcastTarget === 'all' ? 'all users' : broadcastTarget}`);
    setBroadcastMessage('');
    setShowBroadcast(false);
  };

  const handleApproveProvider = (userId: string) => {
    toast.success('Provider approved');
  };

  const handleSuspendUser = (userId: string) => {
    toast.success('User suspended');
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <Badge variant="destructive">Admin</Badge>
            <Button variant="ghost" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl mb-2">Admin Dashboard</h1>
            <p className="text-zinc-600">Platform overview and management</p>
          </div>
          <Button onClick={() => setShowBroadcast(true)}>
            <Send className="h-4 w-4 mr-2" />
            Send Broadcast
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="emergency">
              Emergency
              {stats.activeIncidents > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {stats.activeIncidents}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-600">Total Users</span>
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="text-2xl">{stats.totalUsers}</div>
                  <p className="text-xs text-green-600 mt-1">+18% this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-600">Active Providers</span>
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-2xl">{stats.activeProviders}</div>
                  <p className="text-xs text-zinc-600 mt-1">Approved</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-600">Total Revenue</span>
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-2xl">R{stats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-green-600 mt-1">+24% this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-600">GBV Incidents</span>
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="text-2xl">{stats.emergencyIncidents}</div>
                  <p className="text-xs text-red-600 mt-1">{stats.activeIncidents} active</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Placeholder */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-zinc-50 rounded">
                    <TrendingUp className="h-12 w-12 text-zinc-300" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-zinc-50 rounded">
                    <Activity className="h-12 w-12 text-zinc-300" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl">User Management</h2>
              <div className="text-sm text-zinc-600">{stats.totalUsers} total users</div>
            </div>

            <div className="space-y-3">
              {recentUsers.map(user => (
                <Card key={user.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3>{user.name}</h3>
                          <Badge variant={user.role === 'provider' ? 'secondary' : 'outline'}>
                            {user.role}
                          </Badge>
                          <Badge variant={user.status === 'pending' ? 'destructive' : 'default'}>
                            {user.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-zinc-600">{user.email}</p>
                      </div>
                      <div className="flex gap-2">
                        {user.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => handleApproveProvider(user.id)}
                          >
                            Approve
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuspendUser(user.id)}
                        >
                          Suspend
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <h2 className="text-xl">All Bookings</h2>
            <Card>
              <CardContent className="p-8 text-center">
                <Activity className="h-12 w-12 text-zinc-300 mx-auto mb-3" />
                <p className="text-zinc-500">{stats.totalBookings} total bookings</p>
                <Button variant="outline" size="sm" className="mt-4">
                  View All
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Tab */}
          <TabsContent value="emergency" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl mb-1">Emergency Incidents</h2>
                <p className="text-sm text-zinc-600">
                  {stats.activeIncidents} active • {stats.emergencyIncidents} total
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {mockEmergencyIncidents.map(incident => (
                <Card key={incident.id} className={incident.status === 'active' ? 'border-red-500' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Shield className="h-5 w-5 text-red-600" />
                          <h3>Incident #{incident.id}</h3>
                          <Badge variant={incident.status === 'resolved' ? 'outline' : 'destructive'}>
                            {incident.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-zinc-600">
                          <div>User: {incident.userName}</div>
                          <div>Location: {incident.location.address}</div>
                          <div>Time: {incident.createdAt.toLocaleString('en-ZA')}</div>
                          {incident.responders.length > 0 && (
                            <div>Responders: {incident.responders.length} assigned</div>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Broadcast Dialog */}
      <Dialog open={showBroadcast} onOpenChange={setShowBroadcast}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Send Broadcast Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="target">Target Audience</Label>
              <Select value={broadcastTarget} onValueChange={setBroadcastTarget}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="customers">Customers Only</SelectItem>
                  <SelectItem value="providers">Providers Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Enter your broadcast message..."
                rows={5}
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowBroadcast(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleSendBroadcast}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Broadcast
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
