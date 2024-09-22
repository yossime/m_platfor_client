"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import { useProducts } from '@/(pages)/store/hooks/useProducts';
import ProductList from '../components/ProductList';
import AddProductForm from '../components/AddProductForm';


const PageContainer = styled.div`
max-width: 1200px;
margin: 0 auto;
padding: 20px;
`;

const SectionTitle = styled.h2`
color: #333;
margin-bottom: 20px;
`;

const Section = styled.section`
margin-bottom: 40px;
`;

const StoreSetup: React.FC = () => {
  const { id: storeId } = useParams();
  const [currStoreId, setCurrStoreId] = useState<string>(storeId as string);
  const { products, addProduct, updateProduct, deleteProduct } = useProducts(currStoreId);



  useEffect(() => {
    if (typeof storeId === 'string') {
      setCurrStoreId(storeId)
    }
  }, [storeId]);

  return (
    <PageContainer>
      <h1>Set Up Your Store</h1>
      {/* <h1>Dashboard: {storeData.name}</h1>
      <p>Total Sales: {storeData.ownerId}</p>
      <p>Number of Products: {storeData.status}</p> */}
      <Section>
        <SectionTitle>Products</SectionTitle>
        <ProductList
          products={products}
          onUpdateProduct={updateProduct}
          onDeleteProduct={deleteProduct}
        />
        <AddProductForm onAddProduct={addProduct} />
      </Section>
    </PageContainer>
  );
};

export default StoreSetup;