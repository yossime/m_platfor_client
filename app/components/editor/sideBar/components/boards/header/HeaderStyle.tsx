import React, { useState, useRef } from 'react';
import { InputSize, InputMode } from '@constants/input';
import SelectInput from '@/components/Library/input/SelectInput';
import { Container, Divider } from '../../CommonStyles';
import DataObfuscator from '@/components/Library/general/DataObfuscator';
import { textSizeOptions, textStyleOptions, buttonStyleOptions, imageStyleOptions, BackgroundOptions } from '../../../types';
import AlignmentControl from '../../AlignmentControlComponent';
// import { EConfigType, EConfiguration, IContentMaterial, IContentMaterialType } from '@/components/editor/interface/models';
import { useBoardContent } from '../../GenericBoardComponents';
import TextureUploadComponent from '../../LoadTexturePopup';
import { IContentMaterialType, IContentMaterial, EConfigType, EConfiguration, ICustomMaterial } from '@/components/editor/interface/types';

export const HeaderStyleComponent: React.FC = () => {
  const { getContentMaterial, setContentMaterial, setConfiguration } = useBoardContent();
  const [openSections, setOpenSections] = useState({
    background: true,
    textStyle: true,
    imageStyle: true,
    buttonStyle: true,
  });
  const [showUploadTexture, setShowUploadTexture] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSectionToggle = (section: keyof typeof openSections) => (isOpen: boolean) => {
    setOpenSections(prev => ({ ...prev, [section]: isOpen }));
  };

  const handleStyleChange = (type: IContentMaterialType, value: string) => {
    if (value === "Create new") {
      setShowUploadTexture(true);
    } else {
      // setContentMaterial(type, { style: value });
    }
  };

  const handleTextureUpdate = (newTexture: ICustomMaterial) => {
    console.log("texture update", newTexture);
    // setContentMaterial(IContentMaterialType.TEST, newTexture );
    // setContentMaterial(IContentMaterialType.TEST, { diffuse: { file: newTexture.diffuse?.map } });

    setShowUploadTexture(false);
  };

  const handleAlignmentChange = (type: 'horizontal' | 'vertical', alignment: string) => {
    // setContentMaterial(IContentMaterialType.TEST, { [type + 'Alignment']: alignment });
    console.log("Alignment changed", alignment);
    console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} alignment set to: ${alignment}`);

    switch (type) {
      case 'horizontal':
        setConfiguration(EConfigType.HORIZONTAL, (alignment.toUpperCase() as EConfiguration));
        break;
      case 'vertical':
        setConfiguration(EConfigType.VERTICAL, (alignment.toUpperCase() as EConfiguration));
        break;
    }
  };

  return (
    <Container ref={ref}>
      <DataObfuscator
        title='Background board'
        isOpen={openSections.background}
        onToggle={handleSectionToggle('background')}
      >
        <SelectInput
          options={BackgroundOptions}
          value={''}
          onChange={(value) => handleStyleChange(IContentMaterialType.TEST, value)}
          inputSize={InputSize.SMALL}
          mode={InputMode.DEFAULT}
          placeholder="System Gradient"
          fullWidth={true}
        />
      </DataObfuscator>

      {showUploadTexture && (
        <TextureUploadComponent
          parentRef={ref}
          onClose={() => setShowUploadTexture(false)}
          onSave={handleTextureUpdate}
        />
      )}

      <Divider />

      <AlignmentControl
        onHorizontalAlignmentChange={(alignment) => handleAlignmentChange('horizontal', alignment)}
        onVerticalAlignmentChange={(alignment) => handleAlignmentChange('vertical', alignment)}
      />

      <DataObfuscator
        title='Text style'
        isOpen={openSections.textStyle}
        onToggle={handleSectionToggle('textStyle')}
      >
        <SelectInput
          options={textSizeOptions}
          value={''}
          onChange={(value) => handleStyleChange(IContentMaterialType.TITLE, value)}
          inputSize={InputSize.SMALL}
          mode={InputMode.DEFAULT}
          placeholder="Choose..."
          fullWidth={true}
        />
        <SelectInput
          options={textStyleOptions}
          value={''}
          onChange={(value) => handleStyleChange(IContentMaterialType.SUB_TITLE, value)}
          inputSize={InputSize.SMALL}
          mode={InputMode.DEFAULT}
          placeholder="Choose..."
          fullWidth={true}
        />
      </DataObfuscator>

      <Divider />

      <DataObfuscator
        title='Image style'
        isOpen={openSections.imageStyle}
        onToggle={handleSectionToggle('imageStyle')}
      >
        <SelectInput
          options={imageStyleOptions}
          value={''}
          onChange={(value) => handleStyleChange(IContentMaterialType.IMAGE_CONTENT, value)}
          inputSize={InputSize.SMALL}
          mode={InputMode.DEFAULT}
          placeholder="Choose..."
          fullWidth={true}
        />
      </DataObfuscator>

      <Divider />

      <DataObfuscator
        title='Button style'
        isOpen={openSections.buttonStyle}
        onToggle={handleSectionToggle('buttonStyle')}
      >
        <SelectInput
          options={buttonStyleOptions}
          value={''}
          onChange={(value) => handleStyleChange(IContentMaterialType.BUTTON, value)}
          inputSize={InputSize.SMALL}
          mode={InputMode.DEFAULT}
          placeholder="Choose..."
          fullWidth={true}
        />
      </DataObfuscator>
    </Container>
  );
};