import { useProducts } from '@/(pages)/store/hooks/useProducts';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductList from './ProductList';
import AddProductForm from './AddProductForm';
import { useParams } from 'next/navigation';


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

const StoreManagementPage: React.FC = () => {
  const { id: storeId } = useParams();
  const [currStoreId, setCurrStoreId] = useState<string>(storeId as string);
  const { products, addProduct, updateProduct, deleteProduct } = useProducts(currStoreId);



  useEffect(() => {
    if (typeof storeId === 'string') {
      setCurrStoreId(storeId)
    }
  }, [storeId]);
//   const { orders, updateOrderStatus } = useOrders();

  return (
    <PageContainer>
      <h1>Store Management</h1>
      <Section>
        <SectionTitle>Products</SectionTitle>
        <ProductList 
          products={products} 
          onUpdateProduct={updateProduct} 
          onDeleteProduct={deleteProduct} 
        />
        <AddProductForm onAddProduct={addProduct} />
      </Section>
      <Section>
        {/* <SectionTitle>Orders</SectionTitle> */}
        {/* <OrderList orders={orders} onUpdateOrderStatus={updateOrderStatus} /> */}
      </Section>
    </PageContainer>
  );
};

export default StoreManagementPage;