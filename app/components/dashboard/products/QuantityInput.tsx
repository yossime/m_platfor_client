import React from "react";
import styled from "styled-components";
import Input from "@/components/Library/input/Input";
import { InputSize } from "@constants/input";

const QuantityContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: center;
`;

const QuantityButton = styled.button`
  background-color: #ddd;
  border-radius: 4px;
  border: none;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  padding: 0;
  margin-bottom: 8px;
`;


interface QuantityInputProps {
  quantity: number;
  setQuantity: (value: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  quantity,
  setQuantity,
}) => {
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  return (
    <QuantityContainer>
      <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
      <Input
        inputSize={InputSize.NUM}
        fullWidth={false}
        // label="Quantity"
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
        placeholder="0"
        required
      />
      <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
    </QuantityContainer>
  );
};

export default QuantityInput;
