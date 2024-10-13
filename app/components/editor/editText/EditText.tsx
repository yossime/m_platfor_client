import React from "react";
import {
  ContentDataType,
  Font,
  FontWeight,
  ISceneObject,
  TextAlign,
  TextParams,
} from "../types";
import { useEditor } from "@/context/useEditorContext";
import PopupTextEditor from "./PopupTextEditor";
import Input from "@/components/Library/input/Input";
import SelectInput from "@/components/Library/input/SelectInput";
import { InputSize } from "@constants/input";
import { useSelectedObject } from "../context/Selected.context";

interface TextSettingsProps {
  dataType: ContentDataType;
}

const TextSettings: React.FC<TextSettingsProps> = ({ dataType }) => {
  // const { sceneModel } = useEditor();
  const { selectedObject, setSelectedObject} = useSelectedObject();

  // const selectedObject: ISceneObject | null =
  //   sceneModel?.getSelectedObject() || null;

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
    <PopupTextEditor onClose={() => {}}>
      <SelectInput
        options={Object.values(Font).map((font) => ({
          value: font,
          label: font,
        }))}
        value={""}
        onChange={(value) => handleChange("font", value as Font)}
      />

      <SelectInput
        options={Object.values(FontWeight).map((weight) => ({
          value: weight,
          label: weight,
        }))}
        value={""}
        onChange={(value) => handleChange("fontWeight", value as FontWeight)}
      />

      <SelectInput
        options={Array.from({ length: 16 }, (_, i) => ({
          value: (i + 1).toString(),
          label: (i + 1).toString(),
        }))}
        value={""}
        onChange={(value) => handleChange("fontSize", Number(value))}
      />

      <SelectInput
        options={[
          { value: "1", label: "1" },
          { value: "1.5", label: "1.5" },
          { value: "2", label: "2" },
        ]}
        value={""}
        onChange={(value) => handleChange("lineHeight", Number(value))}
      />

      <SelectInput
        options={Object.values(TextAlign).map((align) => ({
          value: align,
          label: align,
        }))}
        value={""}
        onChange={(value) => handleChange("textAlign", value as TextAlign)}
        inputSize={InputSize.SMALL}
      />

      <Input
        inputSize={InputSize.SMALL}
        type="number"
        onChange={(e) => handleChange("maxWidth", Number(e.target.value))}
      />

      <Input
        inputSize={InputSize.SMALL}
        type="color"
        onChange={(e) => handleChange("color", e.target.value)}
      />
    </PopupTextEditor>
  );
};

export default TextSettings;
