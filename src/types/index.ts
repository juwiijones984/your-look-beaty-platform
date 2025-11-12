export type UserRole = 'customer' | 'provider' | 'admin' | 'responder';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  photoUrl?: string;
  walletBalance: number;
  loyaltyPoints: number;
}

export interface Provider {
  id: string;
  userId: string;
  businessName: string;
  status: 'pending' | 'approved' | 'suspended';
  portfolio: string[];
  rating: number;
  totalReviews: number;
  agreementSigned: boolean;
}

export interface Service {
  id: string;
  providerId: string;
  providerName: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  published: boolean;
  images: string[];
}

export interface Product {
  id: string;
  providerId: string;
  providerName: string;
  title: string;
  price: number;
  stock: number;
  images: string[];
  description: string;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  providerId: string;
  providerName: string;
  serviceId: string;
  serviceName: string;
  startAt: Date;
  endAt: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface EmergencyIncident {
  id: string;
  userId: string;
  userName: string;
  createdAt: Date;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'active' | 'acknowledged' | 'in-progress' | 'resolved';
  audioSessionId?: string;
  hasLiveChat: boolean;
  responders: string[];
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
