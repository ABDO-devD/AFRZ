import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './config';

export interface Customer {
  id?: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  orders: number;
  totalSpent: number;
  rating: number;
  status: 'نشط' | 'غير نشط';
  createdAt?: Date;
}

const customersCollection = collection(db, 'customers');

// Get all customers
export const getAllCustomers = async (): Promise<Customer[]> => {
  try {
    const q = query(customersCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Customer[];
  } catch (error) {
    console.error('Error getting customers:', error);
    return [];
  }
};

// Add new customer
export const addCustomer = async (customer: Omit<Customer, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(customersCollection, {
      ...customer,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding customer:', error);
    return null;
  }
};

// Update customer
export const updateCustomer = async (id: string, customer: Partial<Customer>): Promise<boolean> => {
  try {
    const customerDoc = doc(db, 'customers', id);
    await updateDoc(customerDoc, customer);
    return true;
  } catch (error) {
    console.error('Error updating customer:', error);
    return false;
  }
};

// Delete customer
export const deleteCustomer = async (id: string): Promise<boolean> => {
  try {
    const customerDoc = doc(db, 'customers', id);
    await deleteDoc(customerDoc);
    return true;
  } catch (error) {
    console.error('Error deleting customer:', error);
    return false;
  }
};
