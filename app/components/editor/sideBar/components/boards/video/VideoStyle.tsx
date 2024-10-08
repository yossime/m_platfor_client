import React, { useState, useRef } from "react";
import { InputSize, InputMode } from "@constants/input";
import SelectInput from "@/components/Library/input/SelectInput";
import { Container, ContainerStyle, Divider } from "../../general/CommonStyles";
import DataObfuscator from "@/components/Library/general/DataObfuscator";
import {
  textSizeOptions,
  buttonStyleOptions,
  imageStyleOptions,
  BackgroundOptions,
} from "../../../types";
import AlignmentControl from "../../general/AlignmentControlComponent";
import TextureUploadComponent from "../../../../material/LoadTexturePopup";
import {
  EConfigType,
  EConfiguration,
  ICustomMaterial,
  ContentDataType,
  ERendererType,
  FormatBoard,
  ContentMaterial,
} from "@/components/editor/types/index";
import { FontWeight, TextSize } from "@constants/text";
import Text from "@/components/Library/text/Text";
import { useBoardContent } from "../../general/useBoardContent";
import { SelectInputMaterial } from "@/components/Library/input/SelectInputMaterial";

export const VideoStyleComponent: React.FC = () => {
  const {setLogoConfiguration ,getFormat, getContentMaterial, setContentMaterial, setConfiguration } =
    useBoardContent();

  const format = getFormat();

  const [openSections, setOpenSections] = useState({
    background: true,
    RimLamp: true,
    textStyle: true,
    buttonStyle: true,
  });
  const [showUploadTexture, setShowUploadTexture] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSectionToggle =
    (section: keyof typeof openSections) => (isOpen: boolean) => {
      setOpenSections((prev) => ({ ...prev, [section]: isOpen }));
    };

  const handleStyleChange = (type: ContentDataType, value: string) => {
    if (value === "Create new") {
      setShowUploadTexture(true);
    } else {
      setContentMaterial(type, { materialName: ERendererType.IRON });
    }
  };

  const handleTextureUpdate = (newTexture: ICustomMaterial) => {
    setShowUploadTexture(false);
  };

  const handleAlignmentChange = (
    type: "horizontal" | "vertical",
    alignment: string
  ) => {
    switch (type) {
      case "horizontal":
        setConfiguration(
          EConfigType.HORIZONTAL,
          alignment.toUpperCase() as EConfiguration
        );
        break;
      case "vertical":
        setConfiguration(
          EConfigType.VERTICAL,
          alignment.toUpperCase() as EConfiguration
        );
        break;
    }
  };
  const handleMaterialChange = (material: ContentMaterial) => {
    setContentMaterial(ContentDataType.SELF, material);
  };
  return (
    <Container ref={ref}>
      <AlignmentControl onHorizontalAlignmentChange={(alignment) =>
          handleAlignmentChange("horizontal", alignment)
        }
      />
      {format === FormatBoard.Simple && (
        <AlignmentControl
          onHorizontalAlignmentChange={(alignment) =>
            handleAlignmentChange("vertical", alignment)
          }
        />
      )}

      <Divider />
      <ContainerStyle>
        <Text size={TextSize.TEXT2} $weight={FontWeight.SEMI_BOLD}>
          Materials
        </Text>

        <DataObfuscator
          textweight={FontWeight.NORMAL}
          title="Background board"
          isOpen={openSections.background}
          onToggle={handleSectionToggle("background")}
        >
          <SelectInputMaterial
            value={""}
            onChange={handleMaterialChange}
            inputSize={InputSize.SMALL}
            mode={InputMode.DEFAULT}
            placeholder="System Gradient"
            fullWidth={true}
          />
        </DataObfuscator>

        <DataObfuscator
          title="Rim Lamp"
          isOpen={openSections.RimLamp}
          onToggle={handleSectionToggle("RimLamp")}
          textweight={FontWeight.NORMAL}
        >
          <SelectInput
            options={textSizeOptions}
            value={""}
            onChange={(value) =>
              handleStyleChange(ContentDataType.TITLE, value)
            }
            inputSize={InputSize.SMALL}
            mode={InputMode.DEFAULT}
            placeholder="Choose..."
            fullWidth={true}
          />
        </DataObfuscator>

        <DataObfuscator
          textweight={FontWeight.NORMAL}
          title="Text style"
          isOpen={openSections.textStyle}
          onToggle={handleSectionToggle("textStyle")}
        >
          <SelectInput
            options={imageStyleOptions}
            value={""}
            onChange={(value) =>
              handleStyleChange(ContentDataType.FRAME, value)
            }
            inputSize={InputSize.SMALL}
            mode={InputMode.DEFAULT}
            placeholder="Choose..."
            fullWidth={true}
          />
        </DataObfuscator>

        <DataObfuscator
          textweight={FontWeight.NORMAL}
          title="Button style"
          isOpen={openSections.buttonStyle}
          onToggle={handleSectionToggle("buttonStyle")}
        >
          <SelectInput
            options={buttonStyleOptions}
            value={""}
            onChange={(value) =>
              handleStyleChange(ContentDataType.BUTTON, value)
            }
            inputSize={InputSize.SMALL}
            mode={InputMode.DEFAULT}
            placeholder="Choose..."
            fullWidth={true}
          />
        </DataObfuscator>
      </ContainerStyle>
    </Container>
  );
};
