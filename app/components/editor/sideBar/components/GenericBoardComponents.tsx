import React, { ChangeEvent, useState } from 'react';
import Input from '@/components/Library/input/Input';
import SelectInput from '@/components/Library/input/SelectInput';
import { InputMode, InputSize } from '@constants/input';
import { DeleteIcon, FileDisplay, FileName } from './CommonStyles';
import DragAndDrop from '@/components/Library/general/DragAndDrop';
import {   ContentDataType, InputLabelType } from '../../types';
import { uploadFile } from '../../utils/fileUploadService';
import { useBoardContent } from './useBoardContent';




interface ContentInputProps {
  type: ContentDataType;
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

interface ContentInputProps {
  type: ContentDataType;
  placeholder: string;
  label?: string;
}

export const ContentInputForm: React.FC<ContentInputProps> = ({ type, placeholder, label }) => {
  const { getFormInput, setFormInput } = useBoardContent();
  return (
    <Input
      placeholder={placeholder}
      inputSize={InputSize.SMALL}
      mode={InputMode.NORMAL}
      value={getFormInput(type,label as InputLabelType)?.placeholder?.text}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setFormInput(type,label as InputLabelType ,{label:{text: e.target.value}})}
    />
  );
};

interface ContentSelectProps {
  type: ContentDataType;
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



export const ContentImageUpload: React.FC<{
  type: ContentDataType;
}> = ({ type }) => {
  const { getContentMaterial, setContentMaterial } = useBoardContent();
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const file = getContentMaterial(type)?.customMaterial?.diffuse?.map as File;

  const handleFileAdded = async (newFile: File) => {

    setContentMaterial(type, { customMaterial: { diffuse: { map: newFile } } });
    try {
      await uploadFile(newFile, type, {
        onSuccess: (url, contentType) => {
          if (typeof url === 'string') {
            setContentMaterial(type, { customMaterial: { diffuse: { map: url } } });
          }

          setUploadProgress(0);
        },
        onError: (error, contentType) => {
          console.error(`Error uploading file for ${contentType}:`, error);
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


export const ContentVideoUpload: React.FC<{
  type: ContentDataType;
}> = ({ type }) => {
  const { getContentMaterial, setContentMaterial } = useBoardContent();
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const file = getContentMaterial(type)?.customMaterial?.diffuse?.map as File;

  const handleFileAdded = async (newFile: File) => {

    setContentMaterial(type, {video : newFile} );
    try {
      await uploadFile(newFile, type, {
        onSuccess: (url, contentType) => {
          if (typeof url === 'string') {
            setContentMaterial(type, {video : url} );
          }

          setUploadProgress(0);
        },
        onError: (error, contentType) => {
          console.error(`Error uploading file for ${contentType}:`, error);
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
          type='video'
          onFileAdded={handleFileAdded}
          buttonOnly={true}
        />
      )}
      {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
    </>
  );
};


export const ContentModelUpload: React.FC<{
  type: ContentDataType;
}> = ({ type }) => {
  const { getContentMaterial, setContentMaterial } = useBoardContent();
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const file = getContentMaterial(type)?.customMaterial?.diffuse?.map as File;

  const handleFileAdded = async (newFile: File) => {

    // setContentMaterial(type, { customMaterial: { diffuse: { map: newFile } } });
    try {
      await uploadFile(newFile, type, {
        onSuccess: (url, contentType) => {
          if (typeof url === 'string') {
            setContentMaterial(type, { customMaterial: { diffuse: { map: url } } });
          }

          setUploadProgress(0);
        },
        onError: (error, contentType) => {
          console.error(`Error uploading file for ${contentType}:`, error);
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
          type='model'
          onFileAdded={handleFileAdded}
          buttonOnly={true}
        />
      )}
      {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
    </>
  );
};