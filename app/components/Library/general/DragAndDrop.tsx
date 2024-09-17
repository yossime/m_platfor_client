import { BackgroundColor } from '@constants/colors';
import Button from '../button/Button';
import { ButtonMode, ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
import React, { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { IconName } from '@constants/icon';

interface FileUploadProps {
  onFileAdded: (file: File) => void;
  type: 'image' | 'model' | 'any';
  buttonOnly?: boolean; 
}

const acceptedTypes = {
  image: { 'image/*': [] },
  model: {
    'model/fbx': ['.fbx'],
    'model/gltf-binary': ['.glb'],
    'model/gltf+json': ['.gltf'],
    'model/obj': ['.obj']
  },
  any: {}
};

const DragAndDrop: React.FC<FileUploadProps> = ({ onFileAdded, type, buttonOnly = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileAdded(acceptedFiles[0]);
    }
  }, [onFileAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes[type],
    multiple: false,
    noClick: true, 
  });

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    fileInputRef.current?.click();
  };

  const renderButton = () => (
    <Button
      type={ButtonType.PRIMARY}
      variant={ButtonVariant.SECONDARY}
      size={ButtonSize.MEDIUM}
      text="Upload image"
      icon={IconName.CLOUDARROWUP}
      onClick={handleButtonClick}
      mode={ButtonMode.NORMAL}
      fullWidth={true}    />
  );

  if (buttonOnly) {
    return (
      <div style={{ width: '100%' }}>
      {renderButton()}
    <input {...getInputProps()} ref={fileInputRef} style={{ display: 'none' }} />
    </div>
    );
  }

  return (
    <Container>
      <Dropzone {...getRootProps()} $isDragActive={isDragActive}>
        <input {...getInputProps()} ref={fileInputRef} />
        {renderButton()}
        <DropzoneText>or drag and drop a file here</DropzoneText>
      </Dropzone>
    </Container>
  );
};

const Container = styled.div`
  background-color:${BackgroundColor.GREY_BACKGROUND};
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  height: 268px;
`;

const Dropzone = styled.div<{ $isDragActive: boolean }>`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed ${props => props.$isDragActive ? '#4CAF50' : '#cccccc'};
  border-radius: 10px;
  background-color: ${props => props.$isDragActive ? '#f0f8ff' : 'transparent'};
  transition: all 0.3s ease;
`;

const DropzoneText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #666;
`;

export default DragAndDrop;






// import React, { useState, useCallback, useRef } from 'react';
// import styled from 'styled-components';
// import { useDropzone } from 'react-dropzone';
// import Cropper from 'react-easy-crop';
// import Button from '../button/Button';
// import { ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
// import { BackgroundColor } from '@constants/colors';

// interface FileUploadProps {
//   onFileProcessed: (file: File) => void;
//   type: 'image' | 'model' | 'any';
//   cropWidth?: number;
//   cropHeight?: number;
// }

// const acceptedTypes = {
//   image: { 'image/*': [] },
//   model: {
//     'model/fbx': ['.fbx'],
//     'model/gltf-binary': ['.glb'],
//     'model/gltf+json': ['.gltf'],
//     'model/obj': ['.obj']
//   },
//   any: {}
// };

// const DragAndDrop: React.FC<FileUploadProps> = ({
//   onFileProcessed,
//   type,
//   cropWidth = 300,
//   cropHeight = 300
// }) => {
//   const [file, setFile] = useState<File | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     if (acceptedFiles.length > 0) {
//       setFile(acceptedFiles[0]);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: acceptedTypes[type],
//     multiple: false,
//     noClick: true,
//   });

//   const handleButtonClick = useCallback((event: React.MouseEvent) => {
//     event.stopPropagation();
//     fileInputRef.current?.click();
//   }, []);

//   const onCropComplete = useCallback(async (croppedArea: any, croppedAreaPixels: any) => {
//     if (!file) return;

//     const image = new Image();
//     image.src = URL.createObjectURL(file);
    
//     await new Promise((resolve) => {
//       image.onload = resolve;
//     });

//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
    
//     canvas.width = cropWidth;
//     canvas.height = cropHeight;

//     if (ctx) {
//       ctx.fillStyle = 'white';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       const scaleX = image.naturalWidth / image.width;
//       const scaleY = image.naturalHeight / image.height;

//       ctx.drawImage(
//         image,
//         croppedAreaPixels.x * scaleX,
//         croppedAreaPixels.y * scaleY,
//         croppedAreaPixels.width * scaleX,
//         croppedAreaPixels.height * scaleY,
//         0,
//         0,
//         cropWidth,
//         cropHeight
//       );
//     }

//     canvas.toBlob((blob) => {
//       if (blob) {
//         const croppedFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
//         onFileProcessed(croppedFile);
//       }
//     }, 'image/jpeg');
//   }, [file, cropWidth, cropHeight, onFileProcessed]);

//   const handleCrop = () => {
//     onCropComplete({}, {}); // This will trigger the crop with the current crop area
//   };

//   const handleCancel = () => {
//     setFile(null);
//   };

// const renderButton = (text: string, onClick: (event: React.MouseEvent) => void) => (
//     <Button
//       type={ButtonType.PRIMARY}
//       variant={ButtonVariant.SECONDARY}
//       size={ButtonSize.SMALL}
//       text={text}
//       onClick={onClick}
//     />
//   );

//   return (
//     <Container>
//       {!file ? (
//         <Dropzone {...getRootProps()} $isDragActive={isDragActive}>
//           <input {...getInputProps()} ref={fileInputRef} />
//           {renderButton("Select File", handleButtonClick)}
//           <DropzoneText>or drag and drop a file here</DropzoneText>
//         </Dropzone>
//       ) : (
//         <CropperContainer>
//           <StyledCropper
//             image={URL.createObjectURL(file)}
//             crop={crop}
//             zoom={zoom}
//             aspect={cropWidth / cropHeight}
//             onCropChange={setCrop}
//             onZoomChange={setZoom}
//             onCropComplete={onCropComplete}
//           />
//           <ButtonContainer>
//             {renderButton("Crop", handleCrop)}
//             {renderButton("Cancel", handleCancel)}
//           </ButtonContainer>
//         </CropperContainer>
//       )}
//     </Container>
//   );
// };

// const Container = styled.div`
//   background-color: ${BackgroundColor.GREY_BACKGROUND};
//   padding: 20px;
//   border-radius: 10px;
//   width: 100%;
//   height: 100%;
//   min-height: 268px;
// `;

// const Dropzone = styled.div<{ $isDragActive: boolean }>`
//   width: 100%;
//   height: 100%;
//   min-height: 200px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   border: 2px dashed ${props => props.$isDragActive ? '#4CAF50' : '#cccccc'};
//   border-radius: 10px;
//   background-color: ${props => props.$isDragActive ? '#f0f8ff' : 'transparent'};
//   transition: all 0.3s ease;
// `;

// const DropzoneText = styled.p`
//   margin-top: 10px;
//   font-size: 14px;
//   color: #666;
// `;

// const CropperContainer = styled.div`
//   position: relative;
//   width: 100%;
//   height: 300px;
// `;

// const StyledCropper = styled(Cropper)`
//   .reactEasyCrop_CropArea {
//     border: 2px solid #fff;
//     box-shadow: 0 0 0 9999em rgba(0, 0, 0, 0.5);
//   }
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 10px;
//   margin-top: 10px;
// `;

// export default DragAndDrop;