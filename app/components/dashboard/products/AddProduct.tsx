import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import {
  CurrencyType,
  Product,
} from "@/components/dashboard/types/product.types";
import { useProducts } from "@/context/useProducts";
import DragAndDrop from "@/components/Library/general/DragAndDrop";
import Input from "@/components/Library/input/Input";
import Button from "@/components/Library/button/Button";
import Text from "@/components/Library/text/Text";
import { FontWeight } from "@constants/text";
import { useProject } from "@/context/useProjectContext";
import SectionLine from "./SectionLine";
import QuantityInput from "./QuantityInput";
import { ButtonMode, ButtonType, ButtonVariant } from "@constants/button";
import { InputSize } from "@constants/input";
import ModelViewer from "@/components/Library/general/ModelViewer";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 32px;
  width: 1004px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const DragContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 32px;
  padding: 16px;
  width: 100%;
`;

const DisableButtons = styled.div`
  width: 292px;
  height: 176px;
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DragImageContainer = styled.div`
  min-width: 302px;
  min-height: 310px;
`;

const Box = styled.div`
  width: 100%;
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  text-align: start;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  height: auto;
`;

const ModelPreview = styled.div`
  width: 300px;
  height: 300px;
  background-color: #f0f0f0;
`;

interface AddProductProps {
  onSetTitle: (title: string) => void;
  product: Product | null;
}
const AddProduct: React.FC<AddProductProps> = ({ onSetTitle, product }) => {
  const { currentProject } = useProject();
  const { addProduct,updateProduct } = useProducts(currentProject!);

  const [title, setTitle] = useState(product?.title || "");
  const [SKU, setSKU] = useState(product?.SKU || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [currencyType, setCurrencyType] = useState<CurrencyType>(
    product?.currencyType || "USD"
  );
  const [barcode, setBarcode] = useState(product?.barcode || "");
  const [description, setDescription] = useState(product?.description || "");
  const [quantity, setQuantity] = useState(product?.quantity || 0);
  const [sections, setSections] = useState(
    product?.sections || [
      { id: uuidv4(), title: "PRODUCT INFO", body: "", isVisible: true },
    ]
  );
  const [image, setImage] = useState<File | null>(null);
  const [model, setModel] = useState<File | null>(null);



  useEffect(() => {
    onSetTitle(product ? title : "Create a New Product");
  }, [product, onSetTitle]);

  const generateRandomSKU = () => setSKU(uuidv4());



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (product) {
      updateProduct({
        ...product,
        title,
        SKU,
        price,
        description,
        barcode,
        quantity,
        sections,
      });
    } else {
      addProduct({
        title,
        SKU: SKU || uuidv4(),
        price,
        currencyType,
        description,
        barcode,
        quantity,
        sections,
      });
    }

    setTitle("");
    setPrice(0);
  };


  const handleImageUpload = (file: File) => {
    setImage(file);
  };

  const handleModelUpload = (file: File) => {
    setModel(file);
  };

  const addSection = () => {
    setSections([
      ...sections,
      { id: uuidv4(), title: "", body: "", isVisible: true },
    ]);
  };
  const handlePriceChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setPrice(value);
    }
  };
  

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Product Name"
          required
        />
        <Input
          label="Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />

        <DragContainer>
          {model ? (
            <>
              <ModelViewer
                model={model}
                type={model.name.endsWith(".fbx") ? "fbx" : "gltf"}
              />
            </>
          ) : (
            <>
              <DragAndDrop type="model" onFileAdded={handleModelUpload} />
              <DisableButtons>
                <Text>Don’t have a 3D model yet?</Text>
                {[...Array(3)].map((_, index) => (
                  <Button
                    key={index}
                    fullWidth={true}
                    text="Generate from images - Beta"
                    mode={ButtonMode.DISABLED}
                  />
                ))}
              </DisableButtons>
            </>
          )}
        </DragContainer>

        <SectionsContainer>
          {sections.map((section) => (
            <SectionLine
              key={section.id}
              id={section.id || ""}
              title={section.title || ""}
              body={section.body || ""}
              isVisible={section.isVisible || false}
              setSections={setSections}
            />
          ))}
          <Button
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.SECONDARY}
            onClick={addSection}
            fullWidth={false}
            text="Add Section"
          />
        </SectionsContainer>

        <Box>
          <Text $weight={FontWeight.BOLD}>Inventory</Text>

          <div style={{ display: "flex", gap: "16px" }}>
            <Input
              inputSize={InputSize.SMALL}
              fullWidth={false}
              label="SKU"
              type="text"
              value={SKU}
              onChange={(e) => setSKU(e.target.value)}
              placeholder="00000000"
              required
            />
            <Button
              type={ButtonType.PRIMARY}
              variant={ButtonVariant.SECONDARY}
              text="Generate"
              onClick={generateRandomSKU}
            />
            <Input
              inputSize={InputSize.SMALL}
              fullWidth={false}
              label="Barcode (ISBN, UPC, GTIN, etc.)"
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              placeholder="Barcode"
              required
            />
            <QuantityInput quantity={quantity} setQuantity={setQuantity} />
          </div>
        </Box>

        <Box>
          <Text $weight={FontWeight.BOLD}>Pricing</Text>
          <Input
            label="Price"
            type="number"
            value={price}
            onChange={handlePriceChange}
            placeholder="$"
            required
            min="0" 
          />
        </Box>
        <Button
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.SECONDARY}
          text="Submit"
          fullWidth={false}
          onClick={() => addProduct}
        />
      </Form>

      <DragImageContainer>
        {image ? (
          <ImagePreview src={URL.createObjectURL(image)} alt="Product Image" />
        ) : (
          <DragAndDrop type="image" onFileAdded={handleImageUpload} />
        )}
      </DragImageContainer>
    </Container>
  );
};

export default AddProduct;
