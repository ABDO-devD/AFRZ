import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  orderBy,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from './config';

export interface Order {
  id?: string;
  customerId: string;
  customerName: string;
  products: string;
  quantity: number;
  amount: number;
  status: 'قيد المعالجة' | 'قيد التوصيل' | 'مكتمل' | 'ملغي';
  payment: 'مدفوع' | 'قيد الانتظار';
  date: Date;
  createdAt?: Date;
}

const ordersCollection = collection(db, 'orders');

// Get all orders
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const q = query(ordersCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate(),
      createdAt: doc.data().createdAt?.toDate()
    })) as Order[];
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

// Get orders by status
export const getOrdersByStatus = async (status: Order['status']): Promise<Order[]> => {
  try {
    const q = query(
      ordersCollection, 
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate(),
      createdAt: doc.data().createdAt?.toDate()
    })) as Order[];
  } catch (error) {
    console.error('Error getting orders by status:', error);
    return [];
  }
};

// Get orders by customer
export const getOrdersByCustomer = async (customerId: string): Promise<Order[]> => {
  try {
    const q = query(
      ordersCollection, 
      where('customerId', '==', customerId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate(),
      createdAt: doc.data().createdAt?.toDate()
    })) as Order[];
  } catch (error) {
    console.error('Error getting orders by customer:', error);
    return [];
  }
};

// Add new order
export const addOrder = async (order: Omit<Order, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(ordersCollection, {
      ...order,
      date: Timestamp.fromDate(order.date),
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding order:', error);
    return null;
  }
};

// Update order
export const updateOrder = async (id: string, order: Partial<Order>): Promise<boolean> => {
  try {
    const orderDoc = doc(db, 'orders', id);
    const updateData: any = { ...order };
    
    if (order.date) {
      updateData.date = Timestamp.fromDate(order.date);
    }
    
    await updateDoc(orderDoc, updateData);
    return true;
  } catch (error) {
    console.error('Error updating order:', error);
    return false;
  }
};

// Update order status
export const updateOrderStatus = async (id: string, status: Order['status']): Promise<boolean> => {
  try {
    const orderDoc = doc(db, 'orders', id);
    await updateDoc(orderDoc, { status });
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
};

// Delete order
export const deleteOrder = async (id: string): Promise<boolean> => {
  try {
    const orderDoc = doc(db, 'orders', id);
    await deleteDoc(orderDoc);
    return true;
  } catch (error) {
    console.error('Error deleting order:', error);
    return false;
  }
};
