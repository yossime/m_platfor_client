import React, { useState } from "react";
import styled from "styled-components";
import { useProject } from "@/context/useProjectContext";
import { Product } from "@/components/dashboard/types/product.types";
import { useProducts } from "@/context/useProducts";

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  background-color: #ffffff;
  min-height: 64px;
  padding: 10px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const TextCell = styled.div`
  padding: 10px;
  align-items: center;
  text-align: center;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-left: 10px;
`;

const CenteredMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  font-size: 18px;
  color: #555;
`;

interface ProductListProps {
  handleProductClick: (product: Product) => void;
  selectedProducts:Product[];
}

const ProductListSidebar: React.FC<ProductListProps> = ({
  handleProductClick,
  selectedProducts
}) => {
  const { currentProject } = useProject();
  const { products } = useProducts(currentProject!);
  

  return (
    <>
      {products.length ? (
        <ProductsContainer>
          {products.map((product, index) => (
            <ProductRow key={index}>
              {/* <ProductImage src={product.imageUrl} alt={product.title} /> */}
              <TextCell>{product.title}</TextCell>
              <Checkbox
                checked={selectedProducts.includes(product)}
                onChange={() => handleProductClick(product)}
              />
            </ProductRow>
          ))}
        </ProductsContainer>
      ) : (
        <CenteredMessage>
          "Seems like you haven’t added any products yet"
        </CenteredMessage>
      )}
    </>
  );
};

export default ProductListSidebar;
