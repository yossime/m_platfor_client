import React, { ChangeEvent, useState } from 'react';
import Input from '@/components/Library/input/Input';
import SelectInput from '@/components/Library/input/SelectInput';
import { InputMode, InputSize } from '@constants/input';
import DataObfuscator from '@/components/Library/general/DataObfuscator';
import { DeleteIcon, FileDisplay, FileName } from './CommonStyles';
import DragAndDrop from '@/components/Library/general/DragAndDrop';
import { useEditor } from '@/context/useEditorContext';
import { EConfigType, EConfiguration, ERenderType, IContentMaterial, IContentMaterialType, IContentText, IContentTextType, ISceneObject } from '../../interface/types';
// import { EConfigType, EConfiguration, ERenderType, IContentMaterial, IContentMaterialType, IContentTextType } from '../../interface/models';
import { uploadFile } from '../../utils/fileUploadService';
import { IBoard } from '../../types/borad';
import { Board } from '../../interface/models/Board';




export const useBoardContent = () => {
  const { sceneModel } = useEditor();

  const getSelectedObject = (): ISceneObject | null => {
    if (!sceneModel) {
      console.warn('Scene model is not initialized');
      return null;
    }
    return sceneModel.getSelectedObject();
  };

  const getContentText = (type: IContentTextType): IContentText | null => {
    const selectedObject = getSelectedObject();
    if (!selectedObject) {
      console.warn('No object selected');
      return null;
    }
    return selectedObject.getContentText?.(type) ?? null;
  };

  const setContentText = (type: IContentTextType, value: string): void => {
    const selectedObject = getSelectedObject();
    if (!selectedObject) {
      console.warn('No object selected');
      return;
    }
    if (selectedObject.setContentText) {
      selectedObject.setContentText(type, { text: value });
    } else {
      console.warn('Selected object does not support setting content text');
    }
  };

  const getContentMaterial = (type: IContentMaterialType): IContentMaterial | null => {
    const selectedObject = getSelectedObject();
    if (!selectedObject) {
      console.warn('No object selected');
      return null;
    }
    return selectedObject.getContentMaterial?.(type) ?? null;
  };

  const setContentMaterial = (type: IContentMaterialType, material: IContentMaterial): void => {
    const selectedObject = getSelectedObject();
    if (!selectedObject) {
      console.warn('No object selected');
      return;
    }
    if (selectedObject.setContentMaterial) {
      try {
    // const testMaterial = {
    //   render: ERenderType.IRON
    // };
        selectedObject.setContentMaterial(type, material);
        // selectedObject.setContentMaterial(IContentMaterialType.SELF, testMaterial);
      } catch (error) {
        console.error('Error setting content material:', error);
      }
    } else {
      console.warn('Selected object does not support setting content material');
    }
  };

  // const setContentMaterial = (type: IContentMaterialType, material: IContentMaterial) => {
  //   const testMaterial = ERenderType.IRON;
  //   console.log(`selectedObject selectedObject`, selectedObject);
  //   console.log(`setContentMaterial type`, type);
  //   if(material) {
  //     selectedObject?.setContentMaterial(type, material);
  //   }
  // };

  const setConfiguration = (type: EConfigType, config: EConfiguration) => {
    const selectedObject = getSelectedObject();
    if (!selectedObject) {
      console.warn('No object selected');
      return null;
    }
    (selectedObject as Board).setConfiguration(type, config);
  };

  // const setConfiguration = (type: EConfigType, config: EConfiguration) => {
  //   console.log(`selectedObject selectedObject`, selectedObject);
  //   (selectedObject as IBoard).setConfiguration(type, config);
  // };

  return {
    getContentText,
    setContentText,
    getContentMaterial,
    setContentMaterial,
    setConfiguration,
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

// export const ContentFileUpload: React.FC<{
//   type: IContentMaterialType;
// }> = ({ type }) => {
//   const { getContentMaterial, setContentMaterial } = useBoardContent();

//   const file = getContentMaterial(type)?.diffuse?.file;

//   const handleFileAdded = (newFile: File) => {
//     setContentMaterial(type, { diffuse: { file: newFile } });
//   };

//   const handleFileDelete = () => {
//     setContentMaterial(type, {});
//   };

//   return (
//     <>
//       {file ? (
//         <FileDisplay>
//           <FileName>{file.name}</FileName>
//           <DeleteIcon size={20} onClick={handleFileDelete} />
//         </FileDisplay>
//       ) : (
//         <DragAndDrop
//           type='image'
//           onFileAdded={handleFileAdded}
//           buttonOnly={true}
//         />
//       )}
//     </>
//   );
// };


export const ContentFileUpload: React.FC<{
  type: IContentMaterialType;
}> = ({ type }) => {
  const { getContentMaterial, setContentMaterial } = useBoardContent();
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const file = getContentMaterial(type)?.customMaterial?.diffuse?.map as File;

  // setContentMaterial(type, { customMaterial: { diffuse: { url: 'https://storage.googleapis.com/barbiz-side/images/Bar10_L.jpeg' } }  });
  const handleFileAdded = async (newFile: File) => {

    // setContentMaterial(type, { diffuse: { file: newFile } });
    // console.log(`Setting type type`, IContentMaterialType.IMAGE)

    setContentMaterial(type, { customMaterial: { diffuse: { map: newFile } } });
    try {
      await uploadFile(newFile, type, {
        onSuccess: (url, contentType) => {
          console.log(url, contentType, '')

          if (typeof url === 'string') {
            setContentMaterial(type, { customMaterial: { diffuse: { map: url } } });
            console.log(`Upload successfully ${url}`)
          }

          setUploadProgress(0);
        },
        onError: (error, contentType) => {
          console.error(`Error uploading file for ${contentType}:`, error);
          // Handle error (e.g., show error message to user)
          setUploadProgress(0);
        },
        onProgress: (progress) => {
          setUploadProgress(progress);
        },
      });
    } catch (error) {
      console.error('Unexpected error during file upload:', error);
    }
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
      {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
    </>
  );
};