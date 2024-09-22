import React from 'react';
import styled from 'styled-components';
import { Product } from '../types/product.types';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const ProductInfo = styled.span`
  flex-grow: 1;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const EditButton = styled(Button)`
  background-color: #4CAF50;
  color: white;
`;

const DeleteButton = styled(Button)`
  background-color: #f44336;
  color: white;
`;

interface ProductListProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onUpdateProduct, onDeleteProduct }) => {
  return (
    <List>
      {products.map((product) => (
        <ListItem key={product.SKU}>
          <ProductInfo>{product.name} - ${product.price}</ProductInfo>
          <EditButton onClick={() => onUpdateProduct(product)}>Edit</EditButton>
          <DeleteButton onClick={() => onDeleteProduct(product.id!)}>Delete</DeleteButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ProductList;