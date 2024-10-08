import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import {
  InputSize,
  InputMode,
  InputSizeConfig,
  getInputColors,
} from "@constants/input";
import { FontFamily, TextSize, FontWeight } from "@constants/text";
import { IconColor, TextColor } from "@constants/colors";
import Text from "../text/Text";

type Option = {
  value: string;
  label: string;
};

type SelectInputProps = {
  options: Option[];
  value: string;
  onChange: (value: string | any | ChangeEvent<HTMLInputElement>) => void;
  inputSize: InputSize;
  mode: InputMode;
  label?: string;
  placeholder?: string;
  helperText?: string;
  fullWidth?: boolean;
};

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  value,
  onChange,
  inputSize,
  mode,
  label,
  placeholder,
  helperText,
  fullWidth = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <SelectWrapper $fullWidth={fullWidth} ref={selectRef}>
      {label && (
        <LabelText
          $family={FontFamily.Poppins}
          size={TextSize.TEXT2}
          $weight={FontWeight.SEMI_BOLD}
          color={
            mode === InputMode.DISABLED
              ? TextColor.DISABLED_TEXT
              : TextColor.PRIMARY_TEXT
          }
        >
          {label}
        </LabelText>
      )}
      <SelectButton
        onClick={toggleOpen}
        $size={inputSize}
        $mode={mode}
        $fullWidth={fullWidth}
        disabled={mode === InputMode.DISABLED}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <ArrowIcon $isOpen={isOpen} />
        {/* <Icon name={isOpen? IconName.isOpen}/>. */}
      </SelectButton>
      {isOpen && (
        <OptionsList $size={inputSize}>
          {options.map((option) => (
            <OptionItem
              key={option.value}
              onClick={() => handleSelect(option)}
              $isSelected={option.value === value}
            >
              {option.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}
      {helperText && mode === InputMode.ERROR && (
        <HelperText
          $family={FontFamily.Poppins}
          size={TextSize.TEXT2}
          $weight={FontWeight.NORMAL}
          color={
            mode === InputMode.ERROR
              ? TextColor.NEGATIVE
              : TextColor.SECONDARY_TEXT
          }
        >
          {helperText}
        </HelperText>
      )}
    </SelectWrapper>
  );
};





const SelectWrapper = styled.div<{ $fullWidth: boolean }>`
  text-align: start;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
  position: relative;
`;

const SelectButton = styled.button<{
  $size: InputSize;
  $mode: InputMode;
  $fullWidth: boolean;
}>`
  ${(props) => {
    const { height, padding, fontSize } = InputSizeConfig[props.$size];
    const { background, text, border } = getInputColors(props.$mode);
    return `
      height: ${height};
      padding: ${padding};
      background-color: ${background};
      color: ${text};
      border: 1px solid ${border};
      border-radius: 4px;
      width: ${props.$fullWidth ? "100%" : "auto"};
      font-size: ${TextSize[fontSize]};
      font-family: ${FontFamily.Figtree};
      margin: 8px 0;
      transition: all 0.3s ease;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      &:hover {
        border-color: #323338;
      }
      
      &:focus {
        border-color: #0073EA;
        outline: none;
      }
    `;
  }}
`;

const ArrowIcon = styled.span<{ $isOpen: boolean }>`
  border: solid ${IconColor.ICONCOLOR};
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: ${(props) =>
    props.$isOpen ? "rotate(-135deg)" : "rotate(45deg)"};
  transition: transform 0.3s ease;
`;

const OptionsList = styled.ul<{ $size: InputSize }>`
  list-style: none;
  padding: 0;
  margin: 0;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;
const OptionItem = styled.li<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$isSelected ? "#e6f7ff" : "transparent"};

  &:hover {
    background-color: #f5f5f5;
  }
`;

const LabelText = styled(Text)`
  margin-bottom: 8px;
  text-align: start;
`;

const HelperText = styled(Text)`
  margin-top: 8px;
`;

export default SelectInput;
