import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import DragAndDrop, { FileData } from '@/components/Library/general/DragAndDrop';
import ColorPicker from '@/components/Library/general/ColorPicker';
import Collapsible from '@/components/Library/general/Collapsible';
import { ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
import Button from '@/components/Library/button/Button';
import StrengthComponent from '@/components/Library/general/StrengthComponent ';
import Popup from '@/components/Library/general/Popup';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  min-height: 24px;
  justify-content: flex-end;
`;

const Label = styled.span`
  margin-right: 10px;
`;



const RowContent = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 50%;
`;


const ColorBoxWrapper = styled.div`
  position: relative;
  border: none;
  width: 100%;
  height: 100%;
`;


const ImageContainer = styled.div`
  max-width: 100%;
  max-height: 196px;
`;



interface ImageUpload {
    color: string;
    image: FileData | null;
    strength: number;
}

interface Texture {
    Diffuse: ImageUpload;
    Opacity: ImageUpload;
    Roughness: ImageUpload;
    Normal: ImageUpload;
    Metallic: ImageUpload;
    Emission: ImageUpload;
    Tint: ImageUpload;
}

const initialImageState: Texture = {
    Diffuse: { color: '#ffffff', image: null, strength: 50 },
    Opacity: { color: '#ffffff', image: null, strength: 50 },
    Roughness: { color: '#808080', image: null, strength: 50 },
    Normal: { color: '#8080ff', image: null, strength: 50 },
    Metallic: { color: '#000000', image: null, strength: 50 },
    Emission: { color: '#000000', image: null, strength: 50 },
    Tint: { color: '#ffffff', image: null, strength: 50 },
};

interface ImageUploadProps {
    onClose?: () => void;
    parentRef?: React.RefObject<HTMLElement>;
}

const TextureUploadComponent: React.FC<ImageUploadProps> = ({ onClose, parentRef }) => {
    const [image, setImage] = useState<Texture>(initialImageState);
    const [fileData, setFileData] = useState<FileData | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);


    useEffect(() => {
        if (fileData?.content) {
            const blob = new Blob([fileData.content], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(blob);
            setImageSrc(imageUrl);

            return () => {
                URL.revokeObjectURL(imageUrl);
            };
        }
    }, [fileData]);

    const updateImage = (key: keyof Texture, field: keyof ImageUpload, value: any) => {
        setImage(prevImage => ({
            ...prevImage,
            [key]: {
                ...prevImage[key],
                [field]: value,
            },
        }));
    };

    const renderSection = (key: keyof Texture) => {
        const onDrop = useCallback((acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                updateImage(key, 'image', acceptedFiles[0]);
            }
        }, [key]);

        const { getInputProps, open } = useDropzone({ onDrop, noClick: true, noKeyboard: true });

        return (
            <Collapsible key={key} title={key}>
                <Section >
                    <Row>
                        <Label>Color</Label>
                        <RowContent>
                            <ColorBoxWrapper>
                                <ColorPicker
                                    color={image[key].color}
                                    onChange={(color) => updateImage(key, 'color', color)}
                                />
                            </ColorBoxWrapper>
                        </RowContent>
                    </Row>
                    <Row>
                        <Label>Map</Label>
                        <RowContent>
                            <Button
                                size={ButtonSize.SMALL}
                                type={ButtonType.PRIMARY}
                                variant={ButtonVariant.SECONDARY}
                                text={image[key].image ? image[key].image.name : 'Upload image'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    open();
                                }}
                                fullWidth={true}
                            />
                            <input {...getInputProps()} />
                        </RowContent>
                    </Row>
                    <Row>
                        <Label>Strength</Label>
                        <RowContent>
                            <StrengthComponent
                                initialValue={image[key].strength}
                                onChange={(newValue) => updateImage(key, 'strength', newValue)}
                            />
                        </RowContent>
                    </Row>
                </Section>
            </Collapsible>
        );
    };
    const content = (
        <Container>
            {imageSrc ? (
                <ImageContainer>
                    <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />
                </ImageContainer>
            ) : (
                <DragAndDrop type='image' onFileAdded={setFileData} />
            )}
            <Collapsible title="Advanced">
                {Object.keys(image).map((key) => renderSection(key as keyof Texture))}
            </Collapsible>

        </Container>
    );

    if (onClose) {
        return (
            <Popup isCentered={false} parentRef={parentRef} onClose={onClose} onSave={() => { }}
            >
                {content}
            </Popup>
        );
    }
    return <Container>{content}</Container>;
};

export default TextureUploadComponent;