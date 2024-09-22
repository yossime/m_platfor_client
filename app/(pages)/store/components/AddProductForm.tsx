import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { CurrencyType, Product } from './types/product.types';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 20px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;


const SubmitButton = styled.button`
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #a9a9a9;
    cursor: not-allowed;
  }
`;

const RandomSkuButton = styled(Button)`
  background-color: #2196f3;
  margin-top: 0;

  &:hover {
    background-color: #1e88e5;
  }
`;


interface AddProductFormProps {
  onAddProduct: (product: Product) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [SKU, setSKU] = useState('');
  const [price, setPrice] = useState('');
  const [currencyType, setCurrencyType] = useState<CurrencyType>('USD');

  const generateRandomSKU = () => {
    setSKU(uuidv4());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddProduct({ name, SKU: SKU || uuidv4(), price: parseFloat(price), currencyType });
    setName('');
    setPrice('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
        required
      />
      <Input
        type="text"
        value={SKU}
        onChange={(e) => setSKU(e.target.value)}
        placeholder="SKU"
        required
      />
      <RandomSkuButton type="button" onClick={generateRandomSKU}>
        Generate Random SKU
      </RandomSkuButton>
      <Input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <Select
        value={currencyType}
        onChange={(e) => setCurrencyType(e.target.value as CurrencyType)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </Select>
      <SubmitButton type="submit" disabled={price.length === 0}>Add Product</SubmitButton>
    </Form>
  );
};

export default AddProductForm;