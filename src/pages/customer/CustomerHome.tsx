import React from 'react';
import { Star, Clock, TrendingUp, Shield, Sparkles } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockServices } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

interface CustomerHomeProps {
  onNavigate: (page: string, data?: any) => void;
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const featuredServices = mockServices.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm opacity-90 mb-1">Welcome back,</div>
            <h1 className="text-2xl mb-3">{user?.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                <span>{user?.loyaltyPoints} points</span>
              </div>
              <div>R{user?.walletBalance} wallet</div>
            </div>
          </div>
          <Shield className="h-12 w-12 opacity-80" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          onClick={() => onNavigate('browse')}
          variant="outline"
          className="h-24 flex-col gap-2"
        >
          <Search className="h-6 w-6 text-primary" />
          <span>Browse Services</span>
        </Button>
        <Button
          onClick={() => onNavigate('shop')}
          variant="outline"
          className="h-24 flex-col gap-2"
        >
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span>Shop Products</span>
        </Button>
        <Button
          onClick={() => onNavigate('appointments')}
          variant="outline"
          className="h-24 flex-col gap-2"
        >
          <Calendar className="h-6 w-6 text-primary" />
          <span>My Bookings</span>
        </Button>
        <Button
          onClick={() => onNavigate('profile')}
          variant="outline"
          className="h-24 flex-col gap-2"
        >
          <User className="h-6 w-6 text-primary" />
          <span>My Profile</span>
        </Button>
      </div>

      {/* Promotion Banner */}
      <Card className="bg-gradient-to-r from-orange-100 to-pink-100 border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <span className="text-orange-600">Limited Time Offer</span>
          </div>
          <h3 className="text-lg mb-2">Get 2X Loyalty Points This Week!</h3>
          <p className="text-sm text-zinc-600 mb-3">
            Book any service before Friday and earn double loyalty points on your purchase.
          </p>
          <Button onClick={() => onNavigate('browse')} size="sm">
            Book Now
          </Button>
        </CardContent>
      </Card>

      {/* Featured Services */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Featured Services</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('browse')}
          >
            View All
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('service-detail', service)}>
              <div className="h-48 bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <Sparkles className="h-16 w-16 text-primary opacity-50" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="mb-1">{service.title}</h3>
                    <p className="text-sm text-zinc-600">{service.providerName}</p>
                  </div>
                  <Badge variant="secondary">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    4.8
                  </Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary">R{service.price}</span>
                  <div className="flex items-center gap-1 text-sm text-zinc-500">
                    <Clock className="h-3 w-3" />
                    <span>{service.duration}min</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Safety Notice */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm text-red-900 mb-1">Your Safety Matters</h4>
              <p className="text-xs text-red-700">
                In case of emergency, long-press the Your Look logo to discreetly connect with our response team.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Missing imports
import { Search, ShoppingBag, Calendar, User } from 'lucide-react';
