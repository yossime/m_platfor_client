import { Product } from "@/components/dashboard/types/product.types";
import axios from "@/utils/axios";




export const getProducts = async (storeId: string): Promise<Product[]> => {
    const response = await axios.get(`store/${storeId}/products`);
    return response.data;
};

export const addProduct = async (storeId: string,product: Omit<Product, 'id'>): Promise<void> => {
    console.log("product", product)
    await axios.post(`store/${storeId}/products`, {productData:product});
};

export const updateProduct = async (storeId: string,product: Product): Promise<Product> => {
    const response = await axios.put(`store/${storeId}/products`, {productData:product});
    return response.data;
};

export const deleteProduct = async (storeId: string,productId: string): Promise<void> => {
    await axios.delete(`store/${storeId}/products/${productId}`);
};