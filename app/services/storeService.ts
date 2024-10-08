
import axios from '@/utils/axios';
import { Store } from '@/components/dashboard/types/store';
import { Product } from '@/components/dashboard/types/product.types';



export const registerStore = async (projectid: string): Promise<Store | null> => {
  try {
    const response = await axios.post('store', {
      projectid
    });
    const { storeId } = response.data;
    if (storeId) {
      return { id: storeId } as Store;
    }
    return null;

  } catch (error) {
    console.error('Error registering store:', error);
    throw error;
  }
};

export const getStoresList = async (): Promise<Store[]> => {
  const response = await axios.get(`store`);
  return response.data as Store[];
};

export const getStoreData = async (storeId: string): Promise<Store> => {
  const response = await axios.get(`store/${storeId}`);

  return response.data;
};

export const addProduct = async (storeId: string, productData: Product): Promise<Product | null> => {
  try {
    const response = await axios.post('store/add-product', {
      storeId,
      productData
    });
    const { productId } = response.data;
    if (productId) {
      return { id: productId } as Product;
    }
    return null;

  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}