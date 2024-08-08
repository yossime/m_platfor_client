import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Cropper from 'react-easy-crop';

interface Props {
  imageFile: File;
  onCroppedImage: (croppedFile: File) => void;
}

const CROP_WIDTH = 300;
const CROP_HEIGHT = 300;

const CropperContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background-color: #333;
`;

const StyledCropper = styled(Cropper)`
  .reactEasyCrop_CropArea {
    border: 2px solid #fff;
    box-shadow: 0 0 0 9999em rgba(0, 0, 0, 0.5);
  }
`;

const CropButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #45a049;
  }
`;

const ImageCropper: React.FC<Props> = ({ imageFile, onCroppedImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback(async (croppedArea: any, croppedAreaPixels: any) => {
    const image = new Image();
    image.src = URL.createObjectURL(imageFile);
    
    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = CROP_WIDTH;
    canvas.height = CROP_HEIGHT;

    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x * scaleX,
        croppedAreaPixels.y * scaleY,
        croppedAreaPixels.width * scaleX,
        croppedAreaPixels.height * scaleY,
        0,
        0,
        CROP_WIDTH,
        CROP_HEIGHT
      );
    }

    canvas.toBlob((blob) => {
      if (blob) {
        const croppedFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
        onCroppedImage(croppedFile);
      }
    }, 'image/jpeg');
  }, [imageFile, onCroppedImage]);

  return (
    <div>
      <CropperContainer>
        <StyledCropper
          image={URL.createObjectURL(imageFile)}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          cropSize={{ width: CROP_WIDTH, height: CROP_HEIGHT }}
        />
      </CropperContainer>
      <CropButton onClick={() => onCropComplete({}, {})}>Crop Image</CropButton>
    </div>
  );
};

export default ImageCropper;