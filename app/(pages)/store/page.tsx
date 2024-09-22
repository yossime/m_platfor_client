"use client"

import React, { useEffect, useState } from 'react';
import StoreList from './components/StoreList';
import CreateStoreForm from './components/CreateStoreForm';
import * as storeService from '@/services/storeService';
import { Store } from './types/store';
import styled from 'styled-components';


const Container = styled.div`

`;


const StorePage = () => {
  const [storesList, setStoresList] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStores = async () => {
    setIsLoading(true);
    try {
      const stores = await storeService.getStoresList();
      setStoresList(stores);
    } catch (error) {
      console.error('Failed to fetch stores:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleStoreCreated = () => {
    fetchStores();
  };

  return (
    <Container>
      <h1>Welcome to our Store Platform</h1>
      <CreateStoreForm onStoreCreated={handleStoreCreated} />
      {isLoading && <p>Loading stores...</p>}
      {storesList.length ? <StoreList storesList={storesList} /> : <p>No stores available</p>}
    </Container>
  );
};

export default StorePage;