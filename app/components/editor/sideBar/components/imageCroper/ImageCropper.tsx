import React, { useState, useCallback, useEffect, useRef } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import styled from "styled-components";
import Icon from "@/components/Library/icon/Icon";
import { IconName } from "@constants/icon";

const CropContainer = styled.div<{ width: number; height: number }>`
  position: relative;
  display: flex;
  flex-direction: row;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

const ButtonContainer = styled.div`
  left: -40px;
  top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CropPageContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  color: #555;
  cursor: pointer;
  font-size: 1.5em;
`;

const PreviewBox = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  overflow: hidden;
  border: 2px solid #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-top: 20px;
`;

const PreviewImage = styled.div`
  width: 100%;
  height: 100%;
  .img-preview {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

enum Axis {
  X = "X",
  Y = "Y",
}

interface ImageCropperProps {
  onClose?: () => void;
  imageUrl?: File | string;
  onCropComplete?: (croppedFile: File) => void;
  defaultAspectRatio?: number;
  outputWidth?: number;
  outputHeight?: number;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  imageUrl,
  onClose,
  onCropComplete,
  defaultAspectRatio = 16 / 9,
  outputWidth,
  outputHeight,}) => {
  const [cropperInstance, setCropperInstance] = useState<Cropper | null>(null);
  const [srcImageUrl, setSrcImageUrl] = useState<string>("");
  const cropperRef = useRef<ReactCropperElement>(null);

  const [isFlippedHorizontally, setIsFlippedHorizontally] = useState(false);
  const [isFlippedVertically, setIsFlippedVertically] = useState(false);
  
  // Calculate aspect ratio
  const aspectRatio = defaultAspectRatio;

  // Determine output dimensions
  const desiredOutputWidth = outputWidth || 1920; // Default width
  const desiredOutputHeight = outputHeight || desiredOutputWidth / aspectRatio;

  // Calculate scale factor for display purposes
  const maxDisplayWidth = 500; // Maximum width for display
  const scaleFactor = Math.min(1, maxDisplayWidth / desiredOutputWidth);

  // Calculate base dimensions for display
  const baseWidth = desiredOutputWidth * scaleFactor;
  const baseHeight = desiredOutputHeight * scaleFactor;

    const getOriginalFilename = (): string => {
      if (!imageUrl) return "image";
      if (typeof imageUrl === "string") {
        const urlParts = imageUrl.split("/");
        const filenameWithParams = urlParts[urlParts.length - 1];
        const [filename] = filenameWithParams.split("?");
        return filename || "image";
      } else if (imageUrl instanceof File) {
        return imageUrl.name || "image";
      }
  
      return "image";
    };
  
function generateCroppedFilename(originalName: string): string {
  const dotIndex = originalName.lastIndexOf(".");
  if (dotIndex === -1) {
    return `${originalName}_cropped`;
  } else {
    const namePart = originalName.substring(0, dotIndex);
    const extension = originalName.substring(dotIndex);
    return `${namePart}_cropped${extension}`;
  }
}



  
  useEffect(() => {
    if (imageUrl) {
      if (typeof imageUrl === "string") {
        setSrcImageUrl(imageUrl);
      } else if (imageUrl instanceof File) {
        const reader = new FileReader();
        reader.onload = () => {
          setSrcImageUrl(reader.result as string);
        };
        reader.readAsDataURL(imageUrl);
      }
    }
  }, [imageUrl]);

  const handleFlip = useCallback(
    (axis: Axis) => {
      if (cropperInstance) {
        const scaleValue =
          axis === Axis.X ? isFlippedHorizontally : isFlippedVertically;
        cropperInstance[`scale${axis}`](scaleValue ? 1 : -1);
        axis === Axis.X
          ? setIsFlippedHorizontally(!scaleValue)
          : setIsFlippedVertically(!scaleValue);
      }
    },
    [cropperInstance, isFlippedHorizontally, isFlippedVertically]
  );

  const handleRotate = useCallback(
    () => cropperInstance?.rotate(90),
    [cropperInstance]
  );

  const handleCrop = useCallback(() => {
    if (cropperInstance) {
      const croppedCanvas = cropperInstance.getCroppedCanvas({
        width: desiredOutputWidth,
        height: desiredOutputHeight,
      });
      croppedCanvas.toBlob(
        (blob) => {
          if (blob) {
            const originalFilename = getOriginalFilename();
            const newFilename = generateCroppedFilename(originalFilename);
  
            const croppedFile = new File([blob], newFilename, {
              type: blob.type,
            });
            onCropComplete && onCropComplete(croppedFile);
          } else {
            console.error("Failed to create blob from canvas");
          }
        },
        "image/png",
        1
      );
    }
  }, [cropperInstance, onCropComplete, baseWidth, baseHeight]);
  

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSrcImageUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };




  useEffect(() => {
    return () => {
      cropperInstance?.destroy();
    };
  }, [cropperInstance]);

  const handleCropperReady = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const imageData = cropper.getImageData();
      const cropBoxData = cropper.getCropBoxData();
  
      const widthRatio = cropBoxData.width / imageData.naturalWidth;
      const heightRatio = cropBoxData.height / imageData.naturalHeight;
  
      const zoomRatio = Math.max(widthRatio, heightRatio);
  
      cropper.zoomTo(zoomRatio);
  
      const canvasData = cropper.getCanvasData();
      const offsetX =
        cropBoxData.left +
        cropBoxData.width / 2 -
        (canvasData.left + canvasData.width / 2);
      const offsetY =
        cropBoxData.top +
        cropBoxData.height / 2 -
        (canvasData.top + canvasData.height / 2);
  
      cropper.move(offsetX / zoomRatio, offsetY / zoomRatio);
    }
  };
  
  

  return (
    <CropPageContainer>
      <CloseButton onClick={onClose}>×</CloseButton>
      {!srcImageUrl && (
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      )}
      {srcImageUrl && (
        <CropContainer width={baseWidth} height={baseHeight}>
          <Cropper
            ref={cropperRef}
            src={srcImageUrl}
            style={{ width: "100%", height: "100%" }}
            aspectRatio={defaultAspectRatio}
            initialAspectRatio={defaultAspectRatio}
            guides={false}
            preview=".img-preview"
            background={false}
            onInitialized={(instance) => {
              setCropperInstance(instance);
              handleCropperReady;
            }}
                    />
        </CropContainer>
      )}
      <ButtonContainer>
        <Icon
          name={IconName.ARROWLINELEFT}
          onClick={() => handleFlip(Axis.X)}
        />
        <Icon
          name={IconName.ARROWLINEDOWN}
          onClick={() => handleFlip(Axis.Y)}
        />
        <Icon name={IconName.REFRESH} onClick={handleRotate} />
        <Icon name={IconName.CLOUD} onClick={handleCrop} />
      </ButtonContainer>
      <PreviewBox width={baseWidth / 2} height={baseHeight / 2}>
        <PreviewImage>
          <div className="img-preview" />
        </PreviewImage>
      </PreviewBox>
    </CropPageContainer>
  );
};

export default ImageCropper;
