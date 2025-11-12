import { collection, addDoc, updateDoc, doc, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export interface Payment {
  id?: string;
  customerId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  bookingId?: string;
  serviceId?: string;
  productId?: string;
  createdAt: Date;
  updatedAt: Date;
  transactionId?: string;
  description: string;
}

export interface LoyaltyConversion {
  id?: string;
  customerId: string;
  pointsUsed: number;
  amount: number;
  description: string;
  createdAt: Date;
  bookingId?: string;
}

// Payments Collection
export const paymentsCollection = collection(db, "payments");

export const createPayment = async (payment: Omit<Payment, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  const paymentData = {
    ...payment,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const docRef = await addDoc(paymentsCollection, paymentData);
  return docRef.id;
};

export const updatePayment = async (paymentId: string, updates: Partial<Payment>): Promise<void> => {
  const docRef = doc(paymentsCollection, paymentId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: new Date()
  });
};

export const getPaymentsByCustomer = async (customerId: string): Promise<Payment[]> => {
  const q = query(paymentsCollection, where("customerId", "==", customerId), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Payment));
};

export const getPaymentById = async (paymentId: string): Promise<Payment | null> => {
  const docRef = doc(paymentsCollection, paymentId);
  const docSnap = await getDocs(query(paymentsCollection, where("__name__", "==", docRef)));
  if (!docSnap.empty) {
    const doc = docSnap.docs[0];
    return { id: doc.id, ...doc.data() } as Payment;
  }
  return null;
};

// Loyalty Conversions Collection
export const loyaltyConversionsCollection = collection(db, "loyaltyConversions");

export const createLoyaltyConversion = async (conversion: Omit<LoyaltyConversion, "id" | "createdAt">): Promise<string> => {
  const conversionData = {
    ...conversion,
    createdAt: new Date(),
  };
  const docRef = await addDoc(loyaltyConversionsCollection, conversionData);
  return docRef.id;
};

export const getLoyaltyConversionsByCustomer = async (customerId: string): Promise<LoyaltyConversion[]> => {
  const q = query(loyaltyConversionsCollection, where("customerId", "==", customerId), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LoyaltyConversion));
};

// Payment Processing (Mock implementation - replace with real payment processor)
export const processPayment = async (paymentData: {
  amount: number;
  paymentMethod: string;
  customerId: string;
  description: string;
  bookingId?: string;
}): Promise<{ success: boolean; paymentId?: string; transactionId?: string }> => {
  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create payment record
    const paymentId = await createPayment({
      customerId: paymentData.customerId,
      amount: paymentData.amount,
      currency: 'ZAR',
      status: 'completed',
      paymentMethod: paymentData.paymentMethod,
      bookingId: paymentData.bookingId,
      transactionId: `txn_${Date.now()}`,
      description: paymentData.description,
    });

    return { success: true, paymentId, transactionId: `txn_${Date.now()}` };
  } catch (error) {
    console.error('Payment processing failed:', error);
    return { success: false };
  }
};

// Loyalty Points Management
export const convertLoyaltyPoints = async (conversionData: {
  customerId: string;
  pointsUsed: number;
  amount: number;
  description: string;
  bookingId?: string;
}): Promise<{ success: boolean; conversionId?: string }> => {
  try {
    // Create conversion record
    const conversionId = await createLoyaltyConversion(conversionData);

    // Update user loyalty points (this would be handled by a Cloud Function in production)
    // For now, we'll just log it
    console.log(`Converted ${conversionData.pointsUsed} points to R${conversionData.amount}`);

    return { success: true, conversionId };
  } catch (error) {
    console.error('Loyalty conversion failed:', error);
    return { success: false };
  }
};

// Orders Collection (for product purchases)
export const ordersCollection = collection(db, "orders");

export interface Order {
  id?: string;
  customerId: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
  shippingAddress?: string;
}

export const createOrder = async (order: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  const orderData = {
    ...order,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const docRef = await addDoc(ordersCollection, orderData);
  return docRef.id;
};

export const updateOrder = async (orderId: string, updates: Partial<Order>): Promise<void> => {
  const docRef = doc(ordersCollection, orderId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: new Date()
  });
};

export const getOrdersByCustomer = async (customerId: string): Promise<Order[]> => {
  const q = query(ordersCollection, where("customerId", "==", customerId), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
};