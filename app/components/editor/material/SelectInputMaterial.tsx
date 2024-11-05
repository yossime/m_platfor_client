"use client"

import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  useMemo,
  useCallback,
} from "react";
import styled from "styled-components";
import {
  InputSize,
  InputMode,
  InputSizeConfig,
  getInputColors,
} from "@constants/input";
import { FontFamily, TextSize, FontWeight } from "@constants/text";
import { IconColor, TextColor } from "@constants/colors";
import {
  materialMap,
  MaterialNames,
} from "@/components/editor/material/materials";
import Icon from "../../Library/icon/Icon";
import { IconName, IconSize } from "@constants/icon";
import TextureUploadComponent from "@/components/editor/material/LoadTexturePopup";
import {
  ContentDataType,
  ContentMaterial,
  ICustomMaterial,
} from "@/components/editor/types";
import { useBoardContent } from "@/components/editor/sideBar/components/general/useBoardContent";
import { Divider } from "@/components/dashboard/payments/StripComponent";
import Text from "@components/Library/text/Text";
import ContextMenu from "../../Library/contextMenu/ContextMenu";

type MaterialOptionProps = {
  material: ContentMaterial;
  onSelect: (material: ContentMaterial) => void;
  onEdit?: (material: ContentMaterial) => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  selected?: boolean;
};

const MaterialOption: React.FC<MaterialOptionProps> = React.memo(
  ({ material, onSelect, onEdit, onContextMenu, selected = false }) => (
    <MaterialOptionRow
      selected={selected}
      onClick={() => onSelect(material)}
      onContextMenu={onContextMenu}
    >
      <MaterialImage src={material.materialImage} alt={material.materialName} />
      <OptionLabel>{material.materialName}</OptionLabel>
      {onEdit && (
        <EditIcon
          name={IconName.EDIT}
          size={IconSize.SMALL}
          onClick={() => onEdit(material)}
        />
      )}
    </MaterialOptionRow>
  )
);

export const SelectInputMaterial: React.FC<SelectInputProps> = ({
  value = "",
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

  const materialsArray = useMemo(() => Object.values(materialMap), []);
  const [showUploadTexture, setShowUploadTexture] = useState(false);
  const [currentMaterial, setCurrentMaterial] =
    useState<ContentMaterial | null>(null);
  const { setContentMaterial } = useBoardContent();
  const [firstList, setFirstList] = useState<ContentMaterial[]>([]);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    material: ContentMaterial | null;
  } | null>(null);

  const handleRightClick = useCallback(
    (event: React.MouseEvent, material: ContentMaterial) => {
      event.preventDefault();
      const x = event.clientX;
      const y = event.clientY;
      setContextMenu({ x, y, material });
    },
    []
  );

  const handleDuplicate = useCallback(() => {
    if (contextMenu?.material) {
      const randomNumber = Math.floor(Math.random() * 90) + 10;
      const duplicatedMaterial = {
        ...contextMenu.material,
        materialName: `${contextMenu.material.materialName}_${randomNumber}`,
      };

      setFirstList((prevList) => [...prevList, duplicatedMaterial]);
    }
  }, [contextMenu]);

  const handleDelete = useCallback(() => {
    if (contextMenu?.material) {
      setFirstList((prevList) =>
        prevList.filter((mat) => mat !== contextMenu.material)
      );
    }
  }, [contextMenu]);

  const handleEdit = useCallback(() => {
    if (contextMenu?.material) {
      handleEditMaterial(contextMenu.material);
    }
  }, [contextMenu]);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  const handleSelect = useCallback(
    (material: ContentMaterial) => {
      setCurrentMaterial(material);
      onChange(material);
    },
    [onChange]
  );

  const handleSelectAdd = useCallback((material: ContentMaterial) => {
    setFirstList((prevList) => [...prevList, material]);
  }, []);

  const handleEditMaterial = useCallback((material: ContentMaterial) => {
    setCurrentMaterial(material);
    setShowUploadTexture(true);
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleTextureUpdate = (newTexture: ContentMaterial) => {
    setContentMaterial(ContentDataType.SELF, {
      customMaterial: newTexture.customMaterial,
    });
    const name = newTexture.materialName;
    const randomNumber = Math.floor(Math.random() * 90) + 10;
    newTexture.materialName = `${name}_${randomNumber}`;

    setFirstList((prevList) => {
      const exists = prevList.some(
        (material) => material.materialName === name
      );
      if (exists) {
        return prevList.map((material) =>
          material.materialName === name ? newTexture : material
        );
      } else {
        return [...prevList, newTexture];
      }
    });
    setShowUploadTexture(false);
  };

  return (
    <SelectWrapper $fullWidth={fullWidth} ref={selectRef}>
      {showUploadTexture && (
        <TextureUploadComponent
          parentRef={selectRef}
          onClose={() => setShowUploadTexture(false)}
          onSave={handleTextureUpdate}
          initialTexture={currentMaterial}
        />
      )}
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
        <MaterialsContainer>
          <MaterialTitle>
          <Text $weight={FontWeight.SEMI_BOLD} size={TextSize.TEXT1}>
            My Materials
          </Text>
          <Icon
            name={IconName.PLUSCIRCLE}
            onClick={() => {
              setCurrentMaterial(null), setShowUploadTexture(true);
            }}
          />
          </MaterialTitle>
          <Divider />
          <OptionsList $size={inputSize}>
            {firstList.map((material, index) => (
              <MaterialOption
                key={`${material.materialName}-${index}`}
                material={material}
                onSelect={handleSelect}
                onEdit={handleEditMaterial}
                onContextMenu={(e) => handleRightClick(e, material)}
                selected={currentMaterial === material}
              />
            ))}
            {contextMenu && (
              <ContextMenu
                items={[
                  { label: "Edit", action: handleEdit },
                  { label: "Duplicate", action: handleDuplicate },
                  { label: "Delete", action: handleDelete },
                ]}
                position={{ x: contextMenu.x, y: contextMenu.y }}
                onClose={closeContextMenu}
              />
            )}
          </OptionsList>
          <Text $weight={FontWeight.SEMI_BOLD} size={TextSize.TEXT1}>
            Mocart materials
          </Text>
          <Divider />
          <OptionsList $size={inputSize}>
            {materialsArray.map((material, index) => (
              <MaterialOption
                key={`${material.materialName}-${index}`}
                material={material}
                onSelect={handleSelectAdd}
              />
            ))}
          </OptionsList>
        </MaterialsContainer>
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

const MaterialTitle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const MaterialOptionRow = styled.li<{ selected: boolean }>`
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

const EditIcon = styled(Icon)`
  cursor: pointer;
  margin-left: 8px;
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
};
