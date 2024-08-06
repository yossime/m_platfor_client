import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DragAndDrop from '@/components/Library/general/DragAndDrop';
import ColorPicker from '@/components/Library/general/ColorPicker';
import Collapsible from '@/components/Library/general/Collapsible';
import StrengthComponent from '@/components/Library/general/StrengthComponent ';
import Popup from '@/components/Library/general/Popup';
import { DeleteIcon, FileName, FileDisplay, Divider } from './CommonStyles'


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





interface IMapUpload {
    color: string | undefined;
    map: File | string | undefined;
    strength: number;
}

interface ITexture {
    Diffuse: IMapUpload;
    Opacity: IMapUpload;
    Roughness: IMapUpload;
    Normal: IMapUpload;
    Metallic: IMapUpload;
    Emission: IMapUpload;
    Tint: IMapUpload;
}

const initialImageState: ITexture = {
    Diffuse: { color: '#ffffff', map: undefined, strength: 50 },
    Opacity: { color: '#ffffff', map: undefined, strength: 50 },
    Roughness: { color: '#808080', map: undefined, strength: 50 },
    Normal: { color: '#8080ff', map: undefined, strength: 50 },
    Metallic: { color: '#000000', map: undefined, strength: 50 },
    Emission: { color: '#000000', map: undefined, strength: 50 },
    Tint: { color: '#ffffff', map: undefined, strength: 50 },
};

interface ImageUploadProps {
    onClose?: () => void;
    parentRef?: React.RefObject<HTMLElement>;
}




const TextureUploadComponent: React.FC<ImageUploadProps> = ({ onClose, parentRef }) => {
    const [texture, setTexture] = useState<ITexture>(initialImageState);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        if (uploadedFile) {
            const imageUrl = URL.createObjectURL(uploadedFile);
            setImageSrc(imageUrl);

            return () => {
                URL.revokeObjectURL(imageUrl);
            };
        }
    }, [uploadedFile]);

    const handleFileAdded = (file: File) => {
        setUploadedFile(file);
    };

    const updateImage = (key: keyof ITexture, field: keyof IMapUpload, value: any) => {
        setTexture(prevImage => ({
            ...prevImage,
            [key]: {
                ...prevImage[key],
                [field]: value,
            },
        }));
    };

    const renderSection = (key: keyof ITexture) => {
        const handleImageUpload = (file: File) => {
            updateImage(key, 'map', file);
        };
        const handleDeleteFile = () => {
            updateImage(key, 'map', undefined);
        };

        return (
            <>
            <Collapsible key={key} title={key}>
                <Section>
                    <Row>
                        <Label>Color</Label>
                        <RowContent>
                            <ColorBoxWrapper>
                                <ColorPicker
                                    color={texture[key].color as string}
                                    onChange={(color) => updateImage(key, 'color', color)}
                                />
                            </ColorBoxWrapper>
                        </RowContent>
                    </Row>
                    <Row>
                        <Label>Map</Label>
                        <RowContent>
                            {texture[key].map ? (
                                <FileDisplay>
                                    <FileName>{(texture[key].map as File).name}</FileName>
                                    <DeleteIcon size={20} onClick={handleDeleteFile} />
                                </FileDisplay>
                            ) : (
                                <DragAndDrop
                                    type='image'
                                    onFileAdded={handleImageUpload}
                                    buttonOnly={true}
                                />
                            )}
                        </RowContent>
                    </Row>
                    <Row>
                        <Label>Strength</Label>
                        <RowContent>
                            <StrengthComponent
                                initialValue={texture[key].strength}
                                onChange={(newValue) => updateImage(key, 'strength', newValue)}
                            />
                        </RowContent>
                    </Row>
                </Section>
            </Collapsible>
        <Divider />
        </>
        );
    };

    const content = (
        <Container>
            {imageSrc ? (
                <ImageContainer>
                    <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />
                </ImageContainer>
            ) : (
                <DragAndDrop type='image' onFileAdded={handleFileAdded} />
            )}
            <Collapsible title="Advanced">
                {Object.keys(texture).map((key) => renderSection(key as keyof ITexture))}
            </Collapsible>
        </Container>
    );

    if (onClose) {
        return (
            <Popup isCentered={false} parentRef={parentRef} onClose={onClose} onSave={() => { }}>
                {content}
            </Popup>
        );
    }
    return <Container>{content}</Container>;
};

export default TextureUploadComponent;








