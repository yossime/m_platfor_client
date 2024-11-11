"use client"
import { useState, useEffect } from 'react';
import { UserModel } from '@/components/editor/sideBar/components/model/models.types';
import { addModel, deleteModel, getModels } from '@/services/userModel.service';

export const useModels = (ProjectId: string) => {
  const [models, setModels] = useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchModelss();
  }, [ProjectId]);

  const fetchModelss = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedProducts = await getModels(ProjectId);
      setModels(fetchedProducts);
          } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddModel = async (product: UserModel) => {
    setIsLoading(true);
    setError(null);
    try {
      await addModel(ProjectId, product);
      setModels(prevProducts => [...prevProducts, product]);
    } catch (err) {
      setError('Failed to add product');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


  const handleDeleteModel = async (productId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteModel(ProjectId, productId);
      setModels(prevProducts => prevProducts.filter(p => p.id !== productId));
    } catch (err) {
      setError('Failed to delete product');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    models: models,
    isLoading,
    error,
    addModel: handleAddModel,
    deleteModel: handleDeleteModel,
  };
};
