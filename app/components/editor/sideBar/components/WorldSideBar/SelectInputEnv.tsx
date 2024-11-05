"use client"

import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FontFamily, TextSize, FontWeight } from "@constants/text";
import { IconColor, TextColor } from "@constants/colors";
import { IconName } from "@constants/icon";
import { useEnvironmentContext } from "@/context/EnvironmentContext";
import Text from "@components/Library/text/Text";
import Icon from "@components/Library/icon/Icon";

type SelectInputProps = {
  label?: string;
};

export const SelectInputSky: React.FC<SelectInputProps> = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const {
    currentEnvironment,
    setCurrentEnvironment,
    environmentsPaths: filePaths,
    environment: textures,
    setEnvironment: loadTexturesByIndices,
  } = useEnvironmentContext();

  const toggleOpen = () => setIsOpen(!isOpen);

  const handlePathClick = async (index: number) => {
    await loadTexturesByIndices([index]);
  };

  const handleTextureClick = (textureIndex: number) => {
    setCurrentEnvironment(textures[textureIndex]);
  };

  return (
    <SelectWrapper ref={selectRef}>
      {label && (
        <LabelText
          $family={FontFamily.Poppins}
          size={TextSize.TEXT2}
          $weight={FontWeight.SEMI_BOLD}
          color={TextColor.PRIMARY_TEXT}
        >
          {label}
        </LabelText>
      )}
      <SelectButton onClick={toggleOpen}>
        <ArrowIcon $isOpen={isOpen} />
        {currentEnvironment?.name}
      </SelectButton>
      {isOpen && (
        <MaterialsContainer>
          <SectionTitle>Loaded Textures</SectionTitle>
          {textures.map((texture, index) => (
            <ItemRow key={index} onClick={() => handleTextureClick(index)}>
              <MaterialImage src={texture.image} alt={texture.name} />
              <OptionLabel>{texture.name}</OptionLabel>
              {currentEnvironment === texture && <Icon name={IconName.CHECK} />}
            </ItemRow>
          ))}
          <Divider />
          <SectionTitle>Available Paths</SectionTitle>
          {filePaths.map((path, index) => (
            <ItemRow key={index} >
              <OptionLabel>{path.name}</OptionLabel>
              <Icon name={IconName.PLUS} onClick={() => handlePathClick(index)}/>
            </ItemRow>
          ))}
        </MaterialsContainer>
      )}
    </SelectWrapper>
  );
};

const SelectWrapper = styled.div`
  text-align: start;
  width: 100%;
  position: relative;
`;

const SelectButton = styled.button`
  height: 40px;
  padding: 8px;
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MaterialsContainer = styled.div`
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

const SectionTitle = styled(Text)`
  font-weight: ${FontWeight.SEMI_BOLD};
  font-size: ${TextSize.TEXT1};
`;

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const MaterialImage = styled.img.attrs({
  onError: (e) => (e.currentTarget.src = "/default-image.png"),
})`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border-radius: 50%;
`;

const OptionLabel = styled.span`
  flex: 1;
  cursor: pointer;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #ccc;
  margin: 8px 0;
`;

const LabelText = styled(Text)`
  margin-bottom: 8px;
`;
