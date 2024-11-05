
import React, { InputHTMLAttributes, ChangeEvent } from "react";
import styled from "styled-components";

const Container = styled.span`
  display: inline-flex;
  align-items: center;
  /* width: 150px; */
  /* max-width: 150px; */
  padding: 4px 12px;
  border: 1px solid #bfc9d9;
  border-radius: 4px;

  input[type="color"] {
    margin-right: 8px;
    border: none;
    width: auto;
    height: auto;
    cursor: pointer;
    background: none;
    &::-webkit-color-swatch-wrapper {
      padding: 0;
      width: 14px;
      height: 14px;
    }
    &::-webkit-color-swatch {
      border: 1px solid #bfc9d9;
      border-radius: 4px;
      padding: 0;
    }
  }

  input[type="text"] {
    border: none;
    width: 100%;
    font-size: 14px;
    background-color: transparent;
  }
`;

interface ColorPickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, ...props }) => {
  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Container>
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        {...props}
      />
      <input
        type="text"
        value={color}
        onChange={handleColorChange}
        {...props}
      />
    </Container>
  );
};

export default ColorPicker;