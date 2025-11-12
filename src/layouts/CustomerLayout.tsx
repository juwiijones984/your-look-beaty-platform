import React, { useState } from 'react';
import { Home, Search, ShoppingBag, Calendar, User, ShoppingCart } from 'lucide-react';
import { Logo } from '../components/Logo';
import { useCart } from '../contexts/CartContext';
import { Badge } from '../components/ui/badge';

interface CustomerLayoutProps {
  children: React.ReactNode;
  currentPage: 'home' | 'browse' | 'shop' | 'appointments' | 'profile';
  onNavigate: (page: string) => void;
}

export const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children, currentPage, onNavigate }) => {
  const { itemCount } = useCart();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'browse', icon: Search, label: 'Browse' },
    { id: 'shop', icon: ShoppingBag, label: 'Shop' },
    { id: 'appointments', icon: Calendar, label: 'Bookings' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo enableEmergency size="md" />
          
          <button
            onClick={() => onNavigate('cart')}
            className="relative p-2 hover:bg-zinc-100 rounded-lg"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {itemCount}
              </Badge>
            )}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t sticky bottom-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-5 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex flex-col items-center gap-1 py-3 transition-colors ${
                    isActive
                      ? 'text-primary'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};
