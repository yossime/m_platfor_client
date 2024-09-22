import { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/services/product.service';
import { Product } from '@/(pages)/store/types/product.types';

export const useProducts = (storeId: string) => {
  const [products, setProducts] = useState<Product[]>([]);
    const [currStoreId, setCurrStoreId] = useState<string>(storeId);

  useEffect(() => {
    setCurrStoreId(storeId);
    fetchProducts();
  }, [storeId]);

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts(currStoreId);
    setProducts(fetchedProducts);
  };

  const handleAddProduct = async (product: Product) => {
    await addProduct(currStoreId, product);
    setProducts([...products, product]);
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    await updateProduct(currStoreId, updatedProduct);
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = async (productId: string) => {
    await deleteProduct(currStoreId, productId);
    setProducts(products.filter(p => p.id !== productId));
  };

  return {
    products,
    addProduct: handleAddProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
  };
};