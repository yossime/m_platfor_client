"use client"
import { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/services/product.service';
import { Product } from '@/components/dashboard/types/product.types';

export const useProducts = (storeId: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [storeId]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedProducts = await getProducts(storeId);
      setProducts(fetchedProducts);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async (product: Product) => {
    setIsLoading(true);
    setError(null);
    try {
      await addProduct(storeId, product);
      setProducts(prevProducts => [...prevProducts, product]);
    } catch (err) {
      setError('Failed to add product');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    setIsLoading(true);
    setError(null);
    try {
      await updateProduct(storeId, updatedProduct);
      setProducts(prevProducts =>
        prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
      );
    } catch (err) {
      setError('Failed to update product');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteProduct(storeId, productId);
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    } catch (err) {
      setError('Failed to delete product');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    products,
    isLoading,
    error,
    addProduct: handleAddProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
  };
};
