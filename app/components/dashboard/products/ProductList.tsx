"use client";

import React from "react";
import styled from "styled-components";
import { useProducts } from "../../../context/useProducts";
import { useProject } from "@/context/useProjectContext";
import { Product } from "../types/product.types";
import Icon from "@/components/Library/icon/Icon";
import { IconName } from "@constants/icon";
import Text from "@/components/Library/text/Text";
import LoadingSpinner from "@/components/Library/general/LoadingSpinner";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
`;

const HeaderRow = styled.div`
  display: flex;
  font-weight: 600;
  color: #333;
  min-height: 50px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #eee;
  padding: 0 16px;
  background-color: #f7f8fa;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 12px 16px;
  &:hover {
    background-color: #f5f5f5;
  }
  &:nth-child(even) {
    background-color: #fafafa;
  }
`;

const Cell = styled.div`
  text-align: center;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #555;
  &:first-child {
    justify-content: flex-start;
  }
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CenteredMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  color: #777;
  padding: 20px;
  gap: 10px;
`;



interface ProductListProps {
  handleProductClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ handleProductClick }) => {
  const { currentProject } = useProject();
  const { products, isLoading } = useProducts(currentProject?.id!);

  return (
    <>
      {isLoading ? (
        <Container>
        <LoadingSpinner />
        </Container>
      ) : products.length ? (
        <Container>
          <HeaderRow>
            <Cell></Cell>
            <Cell>Product</Cell>
            <Cell>SKU</Cell>
            <Cell>Status</Cell>
            <Cell>Inventory</Cell>
          </HeaderRow>
          {products.map((product, index) => (
            <Row
              key={`${product.SKU}-${index}`}
              onClick={() => handleProductClick(product)}
            >
              <Cell>
                <ProductImage src={product.image} alt={product.title} />
              </Cell>
              <Cell>{product.title}</Cell>
              <Cell>{product.SKU}</Cell>
              <Cell>{product.barcode}</Cell>
              <Cell>{product.quantity}</Cell>
            </Row>
          ))}
        </Container>
      ) : (
        <CenteredMessage>
          <Icon name={IconName.EMPTY} />
          <Text>It looks like no products have been added yet.</Text>
        </CenteredMessage>
      )}
    </>
  );
};

export default ProductList;
