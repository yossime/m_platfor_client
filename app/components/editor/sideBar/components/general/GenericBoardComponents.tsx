import React, { ChangeEvent, useRef, useState } from "react";
import Input from "@/components/Library/input/Input";
import SelectInput from "@/components/Library/input/SelectInput";
import { InputMode, InputSize } from "@constants/input";
import DragAndDrop from "@/components/Library/general/DragAndDrop";
import { ContentDataType, InputLabelType } from "@/components/editor/types";
import { useBoardContent } from "./useBoardContent";
import { DeleteIcon, FileDisplay, FileName } from "./CommonStyles";
import { uploadFileUtil } from "@/components/editor/utils/fileUploadService";
import Icon from "@/components/Library/icon/Icon";
import { IconName, IconSize } from "@constants/icon";
import { uploadFile } from "@/services/upload.service";
import ImageCropper from "../imageCroper/ImageCropper";
import styled from "styled-components";
import TextSettings from "@/components/editor/editText/EditText";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap:4px;
  padding: 4px;
`;

interface ContentInputProps {
  type: ContentDataType;
  placeholder: string;
  label?: string;
  edit?: boolean;
  onEditClick?: () => void;
}

export const ContentInput: React.FC<ContentInputProps> = ({
  type,
  placeholder,
  label,
  edit,
}) => {
  const { getContentText, setContentText } = useBoardContent();
  const [showEditText, setShowEditText] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  return (
    <InputContainer  ref={selectRef}>        

      {showEditText && <TextSettings parentRef={selectRef} dataType={type} />}

      <Input
        placeholder={placeholder}
        inputSize={InputSize.SMALL}
        mode={InputMode.NORMAL}
        label={label}
        value={getContentText(type)?.text}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setContentText(type, { text: e.target.value })
        }
      />
      {edit && (
        <Icon
          onClick={()=> setShowEditText(!showEditText)}
          size={IconSize.SMALL}
          name={IconName.EDIT}
        />
      )}
    </InputContainer>
  );
};


export const ContentInputForm: React.FC<ContentInputProps> = ({
  type,
  placeholder,
  label,
}) => {
  const { getFormInput, setFormInput } = useBoardContent();
  return (
    <Input
      placeholder={placeholder}
      inputSize={InputSize.SMALL}
      mode={InputMode.NORMAL}
      value={getFormInput(type, label as InputLabelType)?.placeholder?.text}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setFormInput(type, label as InputLabelType, {
          placeholder: { text: e.target.value },
        })
      }
    />
  );
};

interface ContentSelectProps {
  type: ContentDataType;
  options: { value: string; label: string }[];
  placeholder: string;
  label?: string;
}

export const ContentSelect: React.FC<ContentSelectProps> = ({
  type,
  options,
  placeholder,
  label,
}) => {
  const { getContentText, setContentText } = useBoardContent();

  return (
    <SelectInput
      options={options}
      value={getContentText(type)?.text || ""}
      onChange={(value) => setContentText(type, value)}
      inputSize={InputSize.SMALL}
      mode={InputMode.DEFAULT}
      label={label}
      placeholder={placeholder}
      fullWidth={true}
    />
  );
};

export const ContentImageLine: React.FC<{
  type: ContentDataType;
}> = ({ type }) => {
  const { getContentMaterial, setContentMaterial } = useBoardContent();
  const [file, SetFile] = useState<File | string | undefined>(
    getContentMaterial(type)?.customMaterial?.diffuse?.map
  );
  const [editImage, setEditImage] = useState<boolean>(false);

  const handleFileAdded = async (newFile: File) => {
    setContentMaterial(type, {
      customMaterial: { diffuse: { map: newFile }, emission: { map: newFile } },
    });
    try {
      const res = await uploadFile(newFile);
      SetFile(res);
      setContentMaterial(type, {
        customMaterial: { diffuse: { map: res }, emission: { map: res } },
      });
    } catch (error) {
      console.error("Unexpected error during file upload:", error);
    }
  };

  const getFileName = () => {
    if (typeof file === "string") {
      return file.split("/").pop();
    }
    return file?.name;
  };

  const handleFileDelete = () => {
    setContentMaterial(type, { customMaterial: {} });
    SetFile(undefined);
  };

  const handleCrop = async (croppedFile: File) => {
    try {
      const res = await uploadFile(croppedFile);
      SetFile(res);
      setContentMaterial(type, {
        customMaterial: { diffuse: { map: res }, emission: { map: res } },
      });
      setEditImage(false);
    } catch (error) {
      console.error("Unexpected error during file upload:", error);
    }
  };

  return (
    <>
      {editImage && (
        <ImageCropper
          imageUrl={file}
          onCropComplete={handleCrop}
          onClose={() => setEditImage(false)}
        />
      )}

      {file ? (
        <FileDisplay>
          <FileName>{getFileName()}</FileName>
          <Icon name={IconName.EDIT} onClick={() => setEditImage(true)} />
          <Icon name={IconName.TRASH} onClick={handleFileDelete} />
        </FileDisplay>
      ) : (
        <DragAndDrop
          type="image"
          onFileAdded={handleFileAdded}
          buttonOnly={true}
        />
      )}
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
    setContentMaterial(type, { video: newFile });
    try {
      await uploadFileUtil(newFile, type, {
        onSuccess: (url, contentType) => {
          if (typeof url === "string") {
            setContentMaterial(type, { video: url });
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
      console.error("Unexpected error during file upload:", error);
    }
  };

  const handleFileDelete = () => {
    setContentMaterial(type, { customMaterial: {} });
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
          type="video"
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
      await uploadFileUtil(newFile, type, {
        onSuccess: (url, contentType) => {
          if (typeof url === "string") {
            setContentMaterial(type, {
              customMaterial: { diffuse: { map: url } },
            });
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
      console.error("Unexpected error during file upload:", error);
    }
  };

  const handleFileDelete = () => {
    setContentMaterial(type, { customMaterial: {} });
  };

  return (
    <>
      {file ? (
        <FileDisplay>
          <FileName>{file.name}</FileName>
          <Icon name={IconName.TRASH} onClick={handleFileDelete} />
        </FileDisplay>
      ) : (
        <DragAndDrop
          type="model"
          onFileAdded={handleFileAdded}
          buttonOnly={true}
        />
      )}
      {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
    </>
  );
};
