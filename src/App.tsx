import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { EmergencyProvider, useEmergency } from './contexts/EmergencyContext';
import { LoginPage } from './pages/LoginPage';
import { CustomerLayout } from './layouts/CustomerLayout';
import { CustomerHome } from './pages/customer/CustomerHome';
import { CustomerBrowse } from './pages/customer/CustomerBrowse';
import { ServiceDetail } from './pages/customer/ServiceDetail';
import { CustomerShop } from './pages/customer/CustomerShop';
import { CustomerCart } from './pages/customer/CustomerCart';
import { CustomerAppointments } from './pages/customer/CustomerAppointments';
import { CustomerProfile } from './pages/customer/CustomerProfile';
import { ProviderDashboard } from './pages/provider/ProviderDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ResponderDashboard } from './pages/responder/ResponderDashboard';
import { EmergencyMode } from './components/EmergencyMode';
import { Toaster } from './components/ui/sonner';
import { Service } from './types';

function AppContent() {
  const { user } = useAuth();
  const { isEmergencyMode } = useEmergency();
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState<any>(null);

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page);
    setPageData(data);
  };

  // Not authenticated
  if (!user) {
    return <LoginPage />;
  }

  // Emergency mode overlay
  if (isEmergencyMode) {
    return <EmergencyMode />;
  }

  // Customer role
  if (user.role === 'customer') {
    // Standalone pages
    if (currentPage === 'service-detail' && pageData) {
      return <ServiceDetail service={pageData as Service} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'cart') {
      return <CustomerCart onNavigate={handleNavigate} />;
    }

    // Pages with layout
    return (
      <CustomerLayout currentPage={currentPage as any} onNavigate={handleNavigate}>
        {currentPage === 'home' && <CustomerHome onNavigate={handleNavigate} />}
        {currentPage === 'browse' && <CustomerBrowse onNavigate={handleNavigate} />}
        {currentPage === 'shop' && <CustomerShop onNavigate={handleNavigate} />}
        {currentPage === 'appointments' && <CustomerAppointments onNavigate={handleNavigate} />}
        {currentPage === 'profile' && <CustomerProfile onNavigate={handleNavigate} />}
      </CustomerLayout>
    );
  }

  // Provider role
  if (user.role === 'provider') {
    return <ProviderDashboard />;
  }

  // Admin role
  if (user.role === 'admin') {
    return <AdminDashboard />;
  }

  // Responder role
  if (user.role === 'responder') {
    return <ResponderDashboard />;
  }

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <EmergencyProvider>
          <AppContent />
          <Toaster position="top-center" />
        </EmergencyProvider>
      </CartProvider>
    </AuthProvider>
  );
}
