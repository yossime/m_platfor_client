import React, { ChangeEvent } from 'react';
import Input from '@/components/Library/input/Input';
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
    return selectedObject?.getContentText().get(type)?.text || '';
  };

  const setContentText = (type: IContentTextType, value: string) => {
    selectedObject?.setContentText(type, { text: value });
  };

  const getContentMaterial = (type: IContentMaterialType) => {
    return selectedObject?.getContentMaterial().get(type);
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
      value={getContentText(type)}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setContentText(type, e.target.value)}
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