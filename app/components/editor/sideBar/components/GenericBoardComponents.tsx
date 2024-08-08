import React, { ChangeEvent } from 'react';
import Input from '@/components/Library/input/Input';
import SelectInput from '@/components/Library/input/SelectInput';
import { InputMode, InputSize } from '@constants/input';
import DataObfuscator from '@/components/Library/general/DataObfuscator';
import { DeleteIcon, FileDisplay, FileName } from './CommonStyles';
import DragAndDrop from '@/components/Library/general/DragAndDrop';
import { useEditor } from '@/context/useEditorContext';
import { IContentMaterialType, IContentTextType } from '../../interface/models';

export const useBoardContent = () => {
  const { sceneModel } = useEditor();
  const selectedObject = sceneModel?.getSelectedObject();

  const getContentText = (type: IContentTextType) => {
    return selectedObject?.getContentText(type);
  };

  const setContentText = (type: IContentTextType, value: string) => {
    selectedObject?.setContentText(type, { text: value });
  };

  const getContentMaterial = (type: IContentMaterialType) => {
    return selectedObject?.getContentMaterial(type);
  };

  const setContentMaterial = (type: IContentMaterialType, material: any) => {
    console.log(`setContentMaterial ${type} ${material}`);
    selectedObject?.setContentMaterial(type, material);
  };

  return {
    getContentText,
    setContentText,
    getContentMaterial,
    setContentMaterial,
  };
};

interface ContentInputProps {
  type: IContentTextType;
  placeholder: string;
  label?: string;
}

export const ContentInput: React.FC<ContentInputProps> = ({ type, placeholder, label }) => {
  const { getContentText, setContentText } = useBoardContent();

  return (
    <Input
      placeholder={placeholder}
      inputSize={InputSize.SMALL}
      mode={InputMode.NORMAL}
      label={label}
      value={getContentText(type)?.text}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setContentText(type, e.target.value)}
    />
  );
};

interface ContentSelectProps {
  type: IContentTextType;
  options: { value: string; label: string }[];
  placeholder: string;
  label?: string;
}

export const ContentSelect: React.FC<ContentSelectProps> = ({ type, options, placeholder, label }) => {
  const { getContentText, setContentText } = useBoardContent();

  return (
    <SelectInput
      options={options}
      value={getContentText(type)?.text || ''}
      onChange={(value) => setContentText(type, value)}
      inputSize={InputSize.SMALL}
      mode={InputMode.DEFAULT}
      label={label}
      placeholder={placeholder}
      fullWidth={true}
    />
  );
};

export const ContentFileUpload: React.FC<{
  type: IContentMaterialType;
}> = ({ type }) => {
  const { getContentMaterial, setContentMaterial } = useBoardContent();
  
  const file = getContentMaterial(type)?.diffuse?.file;

  const handleFileAdded = (newFile: File) => {
    setContentMaterial(type, { diffuse: { file: newFile } });
  };

  const handleFileDelete = () => {
    setContentMaterial(type, {});
  };

  return (
    <>
      {file ? (
        <FileDisplay>
          <FileName>{file.name}</FileName>
          <DeleteIcon size={20} onClick={handleFileDelete} />
        </FileDisplay>
      ) : (
        <DragAndDrop
          type='image'
          onFileAdded={handleFileAdded}
          buttonOnly={true}
        />
      )}
    </>
  );
};