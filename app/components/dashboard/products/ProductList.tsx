import React from "react";
import styled from "styled-components";
import { useProducts } from "../../../context/useProducts";
import { useProject } from "@/context/useProjectContext";
import { Product } from "../types/product.types";

const Table = styled.div`
  width: 100%;
  display: table;
  border-collapse: collapse;
`;

const HeaderRow = styled.div`
  display: table-row;
  background-color: #e0e0e0;
  font-weight: bold;
`;

const TableRow = styled.div`
  display: table-row;
  cursor: pointer;
  background-color: #ffffff;
  min-height: 60px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const TableCell = styled.div`
  display: table-cell;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
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
}

const ProductList: React.FC<ProductListProps> = ({ handleProductClick }) => {
  const { currentProject } = useProject();
  const { products } = useProducts(currentProject!);

  return (
    <>
      {products.length ? (
        <Table>
          <HeaderRow>
            <TableCell>Image</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Inventory</TableCell>
          </HeaderRow>
          {products.map((product, index) => (
            <TableRow
              key={`${product.SKU}-${index}`}
              onClick={() => handleProductClick(product)}
            >
              <TableCell>
                {/* <ProductImage src={product.id} alt={product.title} /> */}
              </TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.SKU}</TableCell>
              <TableCell>{product.barcode}</TableCell>
              <TableCell>{product.quantity}</TableCell>
            </TableRow>
          ))}
        </Table>
      ) : (
        <CenteredMessage>
          "Seems like you haven’t added any products yet"
        </CenteredMessage>
      )}
    </>
  );
};

export default ProductList;
