import React from "react";
import styled from "styled-components";
import { useProducts } from "../../../context/useProducts";
import { useProject } from "@/context/useProjectContext";
import { Product } from "../types/product.types";
import Icon from "@/components/Library/icon/Icon";
import { IconName } from "@constants/icon";
import Text from "@/components/Library/text/Text";

const Container = styled.div`
  width: 786px;
  gap:2px;
  display: flex;
  flex-direction: column;
`;

const HeaderRow = styled.div`
  display: flex;
  font-weight: bold;
  min-height: 40px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 0 16px;
`;

const Row = styled.div`
  display: flex;
  
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: #ffffff;
  min-height: 64px;
  padding: 0 16px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Cell = styled.div`
  text-align: center;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageCell = styled(Cell)`
  justify-content: flex-start;
`;

const ProductImage = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
`;

const CenteredMessage = styled.div`
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  color: #555;
  height: 100%;
`;

interface ProductListProps {
  handleProductClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ handleProductClick }) => {
  const { currentProject } = useProject();
  const { products } = useProducts(currentProject?.id!);

  return (
    <>
      {products.length ? (
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
              <ImageCell>
                <ProductImage src={product.image} alt={product.title} />
              </ImageCell>
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
          <Text>Seems like you haven't added any products yet</Text>
        </CenteredMessage>
      )}
    </>
  );
};

export default ProductList;
