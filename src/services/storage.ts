import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

export const uploadFile = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export const deleteFile = async (path: string): Promise<void> => {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
};

export const uploadServiceImage = async (file: File, serviceId: string): Promise<string> => {
  const path = `services/${serviceId}/${file.name}`;
  return await uploadFile(file, path);
};

export const uploadProductImage = async (file: File, productId: string): Promise<string> => {
  const path = `products/${productId}/${file.name}`;
  return await uploadFile(file, path);
};

export const uploadProfileImage = async (file: File, userId: string): Promise<string> => {
  const path = `profiles/${userId}/${file.name}`;
  return await uploadFile(file, path);
};