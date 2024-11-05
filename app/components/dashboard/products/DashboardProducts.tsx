
import React, { useEffect, useState } from "react";
import Text from "@/components/Library/text/Text";
import { FontWeight, TextSize } from "@constants/text";
import {
  ContentContainer,
  DashboardIcon,
  ProductListContent,
  TopLineContainer,
} from "../DashboardStyles";
import Button from "@/components/Library/button/Button";
import { ButtonSize, ButtonType } from "@constants/button";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import { IconName } from "@constants/icon";
import Icon from "@/components/Library/icon/Icon";
import { Product } from "../types/product.types";

const DashboardProducts: React.FC = () => {
  const [addProduct, setAddProduct] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [title, setTitle] = useState<string>("Products");

  const handleBack = () => {
    setAddProduct(false);
    setSelectedProduct(null);
  };

  const handleProductClick = (product: Product): void => {
    setSelectedProduct(product);
    setAddProduct(true);
  };

  useEffect(() => {
    if (addProduct && selectedProduct) {
      setTitle("Edit Product");
    } else if (addProduct) {
      setTitle("Create a New Product");
    } else {
      setTitle("Products");
    }
  }, [addProduct, selectedProduct]);

  return (
    <ContentContainer>
      <TopLineContainer>
        <DashboardIcon>
          {addProduct && (
            <Icon name={IconName.ARROWLEFT} onClick={handleBack} />
          )}
          <Text $weight={FontWeight.SEMI_BOLD} size={TextSize.D3}>{title}</Text>
        </DashboardIcon>
        {!addProduct && (
          <Button
            size={ButtonSize.MEDIUM}
            type={ButtonType.PRIMARY}
            icon={IconName.PLUS}
            text={"Create a new product"}
            onClick={() => setAddProduct(true)}
          />
        )}
      </TopLineContainer>

      {!addProduct ? (
        <ProductListContent>
          <ProductList handleProductClick={handleProductClick} />
        </ProductListContent>
      ) : (
        <AddProduct
          setAddProduct={setAddProduct}
          onSetTitle={setTitle}
          product={selectedProduct}
        />
      )}
    </ContentContainer>
  );
};

export default DashboardProducts;
