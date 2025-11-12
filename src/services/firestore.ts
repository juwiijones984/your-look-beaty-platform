import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { db } from "../firebase";
import { Service, Product, Booking, EmergencyIncident, User } from "../types";

// Services
export const servicesCollection = collection(db, "services");

export const getServices = async (): Promise<Service[]> => {
  const snapshot = await getDocs(servicesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
};

export const getServicesByProvider = async (providerId: string): Promise<Service[]> => {
  const q = query(servicesCollection, where("providerId", "==", providerId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
};

export const addService = async (service: Omit<Service, "id">): Promise<string> => {
  const docRef = await addDoc(servicesCollection, service);
  return docRef.id;
};

export const updateService = async (id: string, updates: Partial<Service>): Promise<void> => {
  const docRef = doc(servicesCollection, id);
  await updateDoc(docRef, updates);
};

export const deleteService = async (id: string): Promise<void> => {
  const docRef = doc(servicesCollection, id);
  await deleteDoc(docRef);
};

// Products
export const productsCollection = collection(db, "products");

export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const getProductsByProvider = async (providerId: string): Promise<Product[]> => {
  const q = query(productsCollection, where("providerId", "==", providerId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const addProduct = async (product: Omit<Product, "id">): Promise<string> => {
  const docRef = await addDoc(productsCollection, product);
  return docRef.id;
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<void> => {
  const docRef = doc(productsCollection, id);
  await updateDoc(docRef, updates);
};

export const deleteProduct = async (id: string): Promise<void> => {
  const docRef = doc(productsCollection, id);
  await deleteDoc(docRef);
};

// Bookings
export const bookingsCollection = collection(db, "bookings");

export const getBookings = async (): Promise<Booking[]> => {
  const snapshot = await getDocs(bookingsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
};

export const getBookingsByCustomer = async (customerId: string): Promise<Booking[]> => {
  const q = query(bookingsCollection, where("customerId", "==", customerId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
};

export const getBookingsByProvider = async (providerId: string): Promise<Booking[]> => {
  const q = query(bookingsCollection, where("providerId", "==", providerId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
};

export const addBooking = async (booking: Omit<Booking, "id">): Promise<string> => {
  const docRef = await addDoc(bookingsCollection, booking);
  return docRef.id;
};

export const updateBooking = async (id: string, updates: Partial<Booking>): Promise<void> => {
  const docRef = doc(bookingsCollection, id);
  await updateDoc(docRef, updates);
};

export const deleteBooking = async (id: string): Promise<void> => {
  const docRef = doc(bookingsCollection, id);
  await deleteDoc(docRef);
};

// Emergency Incidents
export const emergencyIncidentsCollection = collection(db, "emergencyIncidents");

export const getEmergencyIncidents = async (): Promise<EmergencyIncident[]> => {
  const snapshot = await getDocs(emergencyIncidentsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EmergencyIncident));
};

export const addEmergencyIncident = async (incident: Omit<EmergencyIncident, "id">): Promise<string> => {
  const docRef = await addDoc(emergencyIncidentsCollection, {
    ...incident,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const updateEmergencyIncident = async (id: string, updates: Partial<EmergencyIncident>): Promise<void> => {
  const docRef = doc(emergencyIncidentsCollection, id);
  await updateDoc(docRef, updates);
};

// Users
export const usersCollection = collection(db, "users");

export const getUser = async (userId: string): Promise<User | null> => {
  const docRef = doc(usersCollection, userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as User;
  }
  return null;
};

export const addUser = async (user: Omit<User, "id">, userId: string): Promise<void> => {
  const docRef = doc(usersCollection, userId);
  await updateDoc(docRef, user);
};

export const updateUser = async (userId: string, updates: Partial<User>): Promise<void> => {
  const docRef = doc(usersCollection, userId);
  await updateDoc(docRef, updates);
};

// Real-time listeners
export const subscribeToServices = (callback: (services: Service[]) => void) => {
  return onSnapshot(servicesCollection, (snapshot) => {
    const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
    callback(services);
  });
};

export const subscribeToBookings = (callback: (bookings: Booking[]) => void) => {
  return onSnapshot(bookingsCollection, (snapshot) => {
    const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
    callback(bookings);
  });
};

export const subscribeToEmergencyIncidents = (callback: (incidents: EmergencyIncident[]) => void) => {
  return onSnapshot(emergencyIncidentsCollection, (snapshot) => {
    const incidents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EmergencyIncident));
    callback(incidents);
  });
};

export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  return onSnapshot(productsCollection, (snapshot) => {
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    callback(products);
  });
};