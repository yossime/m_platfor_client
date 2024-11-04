import React, { useState, useRef, useCallback, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { InputSize, InputMode, InputSizeConfig, getInputColors } from "@constants/input";
import { FontFamily, TextSize, FontWeight } from "@constants/text";
import { IconColor, TextColor } from "@constants/colors";
import Text from "@components/Library/text/Text";

type OptionItemProps = {
  optionName: string;
  onSelect: (optionName: string) => void;
  selected?: boolean;
};

const OptionItem: React.FC<OptionItemProps> = React.memo(
  ({ optionName, onSelect, selected = false }) => (
    <OptionRow selected={selected} onClick={() => onSelect(optionName)}>
      <OptionLabel>{optionName}</OptionLabel>
    </OptionRow>
  )
);

export const SelectInput: React.FC<SelectInputProps> = ({
  optionList,
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
  const [currentOption, setCurrentOption] = useState<string | null>(null);

  const handleSelect = useCallback(
    (optionName: string) => {
      setCurrentOption(optionName);
      onChange(optionName);
    },
    [onChange]
  );

  const toggleOpen = () => setIsOpen(!isOpen);

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
        {placeholder}
        <ArrowIcon $isOpen={isOpen} />
      </SelectButton>
      {isOpen && (
        <OptionsContainer>
          <OptionsList $size={inputSize}>
            {optionList.map((optionName, index) => (
              <OptionItem
                key={`${optionName}-${index}`}
                optionName={optionName}
                onSelect={handleSelect}
                selected={currentOption === optionName}
              />
            ))}
          </OptionsList>
        </OptionsContainer>
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
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
  }}
`;

const OptionsList = styled.ul<{ $size: InputSize }>`
  width: 100%;
`;

const OptionsContainer = styled.div`
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
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

const OptionRow = styled.li<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${(props) => (props.selected ? "#d0eaff" : "transparent")};

  &:hover {
    background-color: ${(props) => (props.selected ? "#d0eaff" : "#f0f0f0")};
  }
`;

const OptionLabel = styled.span`
  flex: 1;
  cursor: pointer;
`;

const LabelText = styled(Text)`
  margin-bottom: 8px;
`;

const HelperText = styled(Text)`
  margin-top: 8px;
`;

type SelectInputProps = {
  value?: string;
  onChange: (value: string | any | ChangeEvent<HTMLInputElement>) => void;
  inputSize: InputSize;
  mode: InputMode;
  label?: string;
  placeholder?: string;
  helperText?: string;
  fullWidth?: boolean;
  optionList: string[];
};
