import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  SetStateAction,
} from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import {
  CurrencyType,
  Product,
  Section,
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
  max-width: 1004px;
  flex-wrap: wrap;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 640px;
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
  setAddProduct: (add: boolean) => void;
}

const AddProduct: React.FC<AddProductProps> = ({
  onSetTitle,
  product,
  setAddProduct,
}) => {
  const { currentProject } = useProject();
  const { addProduct, updateProduct } = useProducts(currentProject!);

  const [formData, setFormData] = useState<Partial<Product>>({
    title: product?.title || "",
    SKU: product?.SKU || "",
    price: product?.price || 0,
    currencyType: product?.currencyType || "USD",
    description: product?.description || "",
    barcode: product?.barcode || "",
    quantity: product?.quantity || 0,
    sections: product?.sections || [
      { id: uuidv4(), title: "PRODUCT INFO", body: "", isVisible: true },
    ],
    image: product?.image || "",
    model: product?.model || "",
    images: product?.images || [],
  });

  const [imagesFile, setImagesFile] = useState<File | null>(null);
  const [modelFile, setModelFile] = useState<File | null>(null);

  useEffect(() => {
    onSetTitle(product ? formData.title || "" : "Create a New Product");
  }, [product, onSetTitle, formData.title]);

  const generateRandomSKU = useCallback(() => {
    setFormData((prev) => ({ ...prev, SKU: uuidv4() }));
  }, []);

const handleSubmit = useCallback(
  (e: React.FormEvent) => {
    e.preventDefault(); 
    if (product) {
      updateProduct({
        ...product,
        ...formData,
      });
    } else {
      addProduct(formData as Product);
    }
    setAddProduct(false);
  },
  [product, formData, updateProduct, addProduct, setAddProduct]
);


  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleImagesUpload = useCallback((file: File) => {
    setImagesFile(file);
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), URL.createObjectURL(file)],
    }));
  }, []);

  const handleModelUpload = (file: File) => {
    setModelFile(file);
    // setFormData((prev) => ({ ...prev, model: URL.createObjectURL(file) }));
  };

  const addSection = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      sections: [
        ...(prev.sections || []),
        { id: uuidv4(), title: "", body: "", isVisible: true },
      ],
    }));
  }, []);

  const handleSectionUpdate = (updater: SetStateAction<Section[]>) => {
    setFormData((prev) => ({
      ...prev,
      sections:
        typeof updater === "function" ? updater(prev.sections || []) : updater,
    }));
  };

  const isFormValid = useMemo(() => {
    return formData.title && formData.SKU && formData.price !== undefined;
  }, [formData.title, formData.SKU, formData.price]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          label="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
        />
        <Input
          label="Description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
        />

        <DragContainer>
          {modelFile ? (
            <ModelViewer
              setModelResponse={(model) =>
                setFormData((prev) => ({ ...prev, model }))
              }
              setScreenshotResponse={(image) =>
                setFormData((prev) => ({ ...prev, image }))
              }
              model={modelFile}
              type={modelFile.name.endsWith(".fbx") ? "fbx" : "gltf"}
            />
          ) : (
            <>
              <DragAndDrop type="model" onFileAdded={handleModelUpload} />
              <DisableButtons>
                <Text>Don't have a 3D model yet?</Text>
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
          {formData.sections?.map((section) => (
            <SectionLine
              key={section.id}
              id={section.id || ""}
              title={section.title || ""}
              body={section.body || ""}
              isVisible={section.isVisible || false}
              setSections={handleSectionUpdate} 
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
              name="SKU"
              value={formData.SKU}
              onChange={handleInputChange}
              placeholder="00000000"
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
              name="barcode"
              value={formData.barcode}
              onChange={handleInputChange}
              placeholder="Barcode"
            />
            <QuantityInput
              quantity={formData.quantity || 0}
              setQuantity={(quantity) =>
                setFormData((prev) => ({ ...prev, quantity }))
              }
            />
          </div>
        </Box>

        <Box>
          <Text $weight={FontWeight.BOLD}>Pricing</Text>
          <Input
            label="Price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="$"
            min="0"
          />
        </Box>
        <Button
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.SECONDARY}
          text="Submit"
          fullWidth={false}
          onClick={handleSubmit}
          mode={isFormValid ? ButtonMode.NORMAL : ButtonMode.DISABLED}
        />
      </Form>

      <DragImageContainer>
        {imagesFile ? (
          <ImagePreview
            src={URL.createObjectURL(imagesFile)}
            alt="Product Image"
          />
        ) : (
          <DragAndDrop type="image" onFileAdded={handleImagesUpload} />
        )}
      </DragImageContainer>
    </Container>
  );
};

export default AddProduct;
