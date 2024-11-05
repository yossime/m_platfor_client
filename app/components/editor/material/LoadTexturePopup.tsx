"use client"

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DragAndDrop from "@/components/Library/general/DragAndDrop";
import ColorPicker from "@/components/Library/general/ColorPicker";
import Collapsible from "@/components/Library/general/Collapsible";
import { DeleteIcon, FileName, FileDisplay, Divider } from "../sideBar/components/general/CommonStyles";
import { ContentMaterial, ICustomMaterial, ITextureSource } from "../types";
import ThreeDMaterial from "./ThreeDMaterial";
import MaterialPopup from "@/components/Library/general/MaterialPopup";
import StrengthComponent from "@/components/Library/general/StrengthComponent ";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  min-height: 24px;
  justify-content: flex-end;
`;

const Label = styled.span`
  margin-right: 10px;
`;

const RowContent = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 50%;
`;

const ColorBoxWrapper = styled.div`
  position: relative;
  border: none;
  width: 100%;
  height: 100%;
`;

const initialImageState: ContentMaterial = {
  customMaterial: {
    diffuse: { color: "#808080", map: undefined, intensity: 50 },
    opacity: { color: "#ffffff", map: undefined, intensity: 50 },
    roughness: { color: "#808080", map: undefined, intensity: 50 },
    normal: { color: "#8080ff", map: undefined, intensity: 50 },
    metallic: { color: "#000000", map: undefined, intensity: 50 },
    emission: { color: "#000000", map: undefined, intensity: 50 },
    tint: { color: "#ffffff", map: undefined, intensity: 50 },
  },
  materialName: "new material",
};

interface ImageUploadProps {
  onClose?: () => void;
  onSave?: (texture: ContentMaterial) => void;
  parentRef?: React.RefObject<HTMLElement>;
  initialTexture?: ContentMaterial | null;
}
const TextureUploadComponent: React.FC<ImageUploadProps> = ({
  onClose,
  onSave,
  parentRef,
  initialTexture,
}) => {
  const [texture, setTexture] = useState<ContentMaterial>(
    initialTexture ?? initialImageState
  );
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initialTexture?.customMaterial) {
      setTexture((prevTexture) => ({
        ...prevTexture,
        customMaterial: initialTexture.customMaterial ?? initialImageState.customMaterial,
      }));
    }
    setIsLoading(false);
  }, [initialTexture]);

  const updateImage = (
    key: keyof ICustomMaterial,
    field: keyof ITextureSource,
    value: any
  ) => {
    setTexture((prevTexture) => ({
      ...prevTexture,
      customMaterial: {
        ...prevTexture.customMaterial ?? {}, 
        [key]: {
          ...prevTexture.customMaterial?.[key],
          [field]: value,
        },
      },
    }));
  };

  const renderSection = (key: keyof ICustomMaterial) => {
    if (!texture.customMaterial) return null;
    return (
      <div key={key}>
      <Collapsible title={key}>
          <Section>
            <Row>
              <Label>Color</Label>
              <RowContent>
                <ColorBoxWrapper>
                  <ColorPicker
                    color={texture.customMaterial[key]?.color ?? "#ffffff"}
                    onChange={(color) => updateImage(key, "color", color)}
                  />
                </ColorBoxWrapper>
              </RowContent>
            </Row>

            <Row>
              <Label>Map</Label>
              <RowContent>
                {texture.customMaterial[key]?.map ? (
                  <FileDisplay>
                    <FileName>{(texture.customMaterial[key].map as File)?.name}</FileName>
                    <DeleteIcon size={20} onClick={() => updateImage(key, "map", undefined)} />
                  </FileDisplay>
                ) : (
                  <DragAndDrop
                    type="image"
                    onFileAdded={(file) => updateImage(key, "map", file)}
                    buttonOnly={true}
                  />
                )}
              </RowContent>
            </Row>

            <Row>
              <Label>Strength</Label>
              <RowContent>
                <StrengthComponent
                  initialValue={texture.customMaterial[key]?.intensity ?? 50}
                  onChange={(newValue) => updateImage(key, "intensity", newValue)}
                />
              </RowContent>
            </Row>
          </Section>
        </Collapsible>
        <Divider />
      </div>
    );
  };

  const handleSave = () => {
    if (onSave) {
      onSave(texture);
    }
    if (onClose) {
      onClose();
    }
  };

  const content = (
    <Container>
      {texture.customMaterial && (
        <ThreeDMaterial material={texture.customMaterial} windowSize={170} />
      )}
      <Collapsible title="Advanced">
        {Object.keys(texture.customMaterial ?? {}).map((key) =>
          renderSection(key as keyof ICustomMaterial)
        )}
      </Collapsible>
    </Container>
  );

  if (onClose) {
    return (
      <MaterialPopup
        isCentered={false}
        parentRef={parentRef}
        onClose={onClose}
        onSave={handleSave}
      >
        {content}
      </MaterialPopup>
    );
  }
  return <Container>{content}</Container>;
};

export default TextureUploadComponent;
