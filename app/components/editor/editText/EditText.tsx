import React, { useState } from "react";
import {
  ContentDataType,
  Font,
  FontWeight,
  TextAlign,
  TextParams,
} from "../types";
import PopupTextEditor from "./PopupTextEditor";
import Input from "@/components/Library/input/Input";
import SelectInput from "@/components/Library/input/SelectInput";
import { InputSize } from "@constants/input";
import { useSelectedObject } from "../context/Selected.context";

interface TextSettingsProps {
  dataType: ContentDataType;
  parentRef: React.RefObject<HTMLDivElement>;
}

const TextSettings: React.FC<TextSettingsProps> = ({ parentRef, dataType }) => {
  const { selectedObject } = useSelectedObject();

  const [font, setFont] = useState<Font | null>(null);
  const [fontWeight, setFontWeight] = useState<FontWeight | null>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);
  const [lineHeight, setLineHeight] = useState<number | null>(null);
  const [textAlign, setTextAlign] = useState<TextAlign | null>(null);
  const [maxWidth, setMaxWidth] = useState<number | "">("");
  const [color, setColor] = useState<string>("");

  const handleChange = <K extends keyof TextParams>(
    field: K,
    value: TextParams[K]
  ) => {
    if (selectedObject && typeof selectedObject.setContentText === "function") {
      selectedObject.setContentText(dataType, {
        [field]: value,
      } as Partial<TextParams>);
    }
  };

  return (
    <PopupTextEditor  parentRef={parentRef}>
      <SelectInput
        options={Object.values(Font).map((font) => ({
          value: font,
          label: font,
        }))}
        value={font ?? ""}
        onChange={(value) => {
          setFont(value as Font);
          handleChange("font", value as Font);
        }}
      />

      <SelectInput
        options={Object.values(FontWeight).map((weight) => ({
          value: weight,
          label: weight,
        }))}
        value={fontWeight ?? ""}
        onChange={(value) => {
          setFontWeight(value as FontWeight);
          handleChange("fontWeight", value as FontWeight);
        }}
      />

      <SelectInput
        options={Array.from({ length: 16 }, (_, i) => ({
          value: (i + 1).toString(),
          label: (i + 1).toString(),
        }))}
        value={fontSize !== null ? fontSize.toString() : ""}
        onChange={(value) => {
          const size = Number(value);
          setFontSize(size);
          handleChange("fontSize", size);
        }}
      />

      <SelectInput
        options={[
          { value: "1", label: "1" },
          { value: "1.5", label: "1.5" },
          { value: "2", label: "2" },
        ]}
        value={lineHeight !== null ? lineHeight.toString() : ""}
        onChange={(value) => {
          const lineHeightValue = Number(value);
          setLineHeight(lineHeightValue);
          handleChange("lineHeight", lineHeightValue);
        }}
      />

      <SelectInput
        options={Object.values(TextAlign).map((align) => ({
          value: align,
          label: align,
        }))}
        value={textAlign ?? ""}
        onChange={(value) => {
          setTextAlign(value as TextAlign);
          handleChange("textAlign", value as TextAlign);
        }}
        inputSize={InputSize.SMALL}
      />

      <Input
        inputSize={InputSize.SMALL}
        type="number"
        value={maxWidth !== "" ? maxWidth.toString() : ""}
        onChange={(e) => {
          const width = Number(e.target.value);
          setMaxWidth(width);
          handleChange("maxWidth", width);
        }}
      />

      <Input
        inputSize={InputSize.SMALL}
        type="color"
        value={color}
        onChange={(e) => {
          const newColor = e.target.value;
          setColor(newColor);
          handleChange("color", newColor);
        }}
      />
    </PopupTextEditor>
  );
};

export default TextSettings;
