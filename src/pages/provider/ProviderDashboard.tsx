import React, { useState } from 'react';
import { TrendingUp, Calendar, ShoppingBag, Package, Plus, DollarSign, Users, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Logo } from '../../components/Logo';
import { useAuth } from '../../contexts/AuthContext';
import { mockServices, mockBookings } from '../../data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { CATEGORIES } from '../../data/mockData';
import { toast } from 'sonner@2.0.3';

export const ProviderDashboard: React.FC = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddService, setShowAddService] = useState(false);
  const [services, setServices] = useState(mockServices.filter(s => s.providerId === 'prov1'));
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    category: '',
  });

  const todayBookings = mockBookings.filter(b =>
    b.providerId === 'prov1' && b.startAt.toDateString() === new Date().toDateString()
  );

  const stats = {
    totalRevenue: 12850,
    monthlyRevenue: 4200,
    totalBookings: 48,
    activeServices: services.filter(s => s.published).length,
    rating: 4.8,
    totalReviews: 124,
  };

  const handleAddService = () => {
    if (!newService.title || !newService.price || !newService.duration || !newService.category) {
      toast.error('Please fill all required fields');
      return;
    }

    const service = {
      id: `svc-${Date.now()}`,
      providerId: 'prov1',
      providerName: 'Beauty by Thandi',
      title: newService.title,
      description: newService.description,
      price: parseFloat(newService.price),
      duration: parseInt(newService.duration),
      category: newService.category,
      published: true,
      images: [],
    };

    setServices([...services, service]);
    setShowAddService(false);
    setNewService({ title: '', description: '', price: '', duration: '', category: '' });
    toast.success('Service added successfully');
  };

  const toggleServiceStatus = (serviceId: string) => {
    setServices(services.map(s =>
      s.id === serviceId ? { ...s, published: !s.published } : s
    ));
    toast.success('Service status updated');
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <Badge variant="secondary">Provider</Badge>
            <Button variant="ghost" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl mb-2">Provider Dashboard</h1>
          <p className="text-zinc-600">Manage your services and bookings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-600">Total Revenue</span>
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-2xl">R{stats.totalRevenue}</div>
                  <p className="text-xs text-green-600 mt-1">+12% this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-600">Total Bookings</span>
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-2xl">{stats.totalBookings}</div>
                  <p className="text-xs text-zinc-600 mt-1">All time</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-600">Active Services</span>
                    <Package className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="text-2xl">{stats.activeServices}</div>
                  <p className="text-xs text-zinc-600 mt-1">Published</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-600">Rating</span>
                    <Star className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="text-2xl">{stats.rating}</div>
                  <p className="text-xs text-zinc-600 mt-1">{stats.totalReviews} reviews</p>
                </CardContent>
              </Card>
            </div>

            {/* Today's Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                {todayBookings.length > 0 ? (
                  <div className="space-y-3">
                    {todayBookings.map(booking => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg">
                        <div>
                          <div className="mb-1">{booking.serviceName}</div>
                          <div className="text-sm text-zinc-600">{booking.customerName}</div>
                        </div>
                        <div className="text-right">
                          <div className="mb-1">{booking.startAt.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}</div>
                          <Badge variant="secondary">{booking.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-zinc-500 py-8">No appointments today</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl mb-1">Your Services</h2>
                <p className="text-sm text-zinc-600">{services.length} total services</p>
              </div>
              <Button onClick={() => setShowAddService(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map(service => (
                <Card key={service.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge>{service.category}</Badge>
                      <Badge variant={service.published ? 'default' : 'secondary'}>
                        {service.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <h3 className="mb-2">{service.title}</h3>
                    <p className="text-sm text-zinc-600 mb-3 line-clamp-2">{service.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-primary">R{service.price}</span>
                      <span className="text-sm text-zinc-600">{service.duration}min</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => toggleServiceStatus(service.id)}
                      >
                        {service.published ? 'Unpublish' : 'Publish'}
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <h2 className="text-xl">All Bookings</h2>
            <div className="space-y-3">
              {mockBookings.filter(b => b.providerId === 'prov1').map(booking => (
                <Card key={booking.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="mb-1">{booking.serviceName}</h3>
                        <p className="text-sm text-zinc-600 mb-2">{booking.customerName}</p>
                        <div className="flex items-center gap-4 text-sm text-zinc-600">
                          <span>{booking.startAt.toLocaleDateString('en-ZA')}</span>
                          <span>{booking.startAt.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-primary mb-2">R{booking.price}</div>
                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl">Your Products</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
            <div className="text-center py-12 text-zinc-500">
              No products yet. Start selling beauty products to your customers.
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Service Dialog */}
      <Dialog open={showAddService} onOpenChange={setShowAddService}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Service Title *</Label>
              <Input
                id="title"
                value={newService.title}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                placeholder="e.g., Box Braids - Full Head"
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={newService.category}
                onValueChange={(value) => setNewService({ ...newService, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                placeholder="Describe your service..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (R) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (min) *</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newService.duration}
                  onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAddService(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleAddService}
              >
                Add Service
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
