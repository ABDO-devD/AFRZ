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

export interface Product {
  id?: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  revenue: number;
  status: 'متوفر' | 'نفاذ الكمية' | 'قريب من النفاذ';
  trend: 'up' | 'down';
  description?: string;
  createdAt?: Date;
}

const productsCollection = collection(db, 'products');

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const q = query(productsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const q = query(
      productsCollection, 
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error('Error getting products by category:', error);
    return [];
  }
};

// Add new product
export const addProduct = async (product: Omit<Product, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(productsCollection, {
      ...product,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    return null;
  }
};

// Update product
export const updateProduct = async (id: string, product: Partial<Product>): Promise<boolean> => {
  try {
    const productDoc = doc(db, 'products', id);
    await updateDoc(productDoc, product);
    return true;
  } catch (error) {
    console.error('Error updating product:', error);
    return false;
  }
};

// Delete product
export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const productDoc = doc(db, 'products', id);
    await deleteDoc(productDoc);
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};

// Update product stock
export const updateProductStock = async (id: string, newStock: number): Promise<boolean> => {
  try {
    const productDoc = doc(db, 'products', id);
    let status: Product['status'] = 'متوفر';
    
    if (newStock === 0) {
      status = 'نفاذ الكمية';
    } else if (newStock < 10) {
      status = 'قريب من النفاذ';
    }
    
    await updateDoc(productDoc, { 
      stock: newStock,
      status
    });
    return true;
  } catch (error) {
    console.error('Error updating product stock:', error);
    return false;
  }
};
