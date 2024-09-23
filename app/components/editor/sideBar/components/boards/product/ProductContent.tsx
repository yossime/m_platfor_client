
import React, { useState } from 'react';
import { Container } from '../../CommonStyles';
import { ContentInput, ContentSelect } from '../../GenericBoardComponents';
import { ContentDataType } from '@/components/editor/types/index';
import ProductListSidebar from './ProductListSidebar';
import { Product } from '@/components/dashboard/types/product.types';



export const ProductContentComponent: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleProductSelect = (product: Product) => {
    const isSelected = selectedProducts.includes(product);
    if (isSelected) {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((p) => p !== product)
      );
    } else {
      setSelectedProducts((prevSelected) => [...prevSelected, product]);
    }
  };

  return (
    <Container>
      <ContentInput
        type={ContentDataType.TITLE}
        placeholder="Site Name"
        label="Title"
      />
                <ProductListSidebar selectedProducts={selectedProducts} handleProductClick={handleProductSelect} />

      {/* <DisplayList /> */}
    </Container>
  );
};