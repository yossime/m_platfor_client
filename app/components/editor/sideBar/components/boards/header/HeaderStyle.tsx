import React, { useRef, useState } from 'react';
import { InputSize, InputMode } from '@constants/input';
import SelectInput from '@/components/Library/input/SelectInput';
import { Container, Divider } from '../../CommonStyles';
import DataObfuscator from '@/components/Library/general/DataObfuscator';
import { textSizeOptions, textStyleOptions, buttonStyleOptions, imageStyleOptions, BackgroundOptions } from '../../../types';
import AlignmentControl from '../../AlignmentControlComponent';
import TextureUploadComponent from '../../LoadTexturePopup';

interface IHeaderStyle {
  titleSize: string;
  titleStyle: string;
  subtitleSize: string;
  subtitleStyle: string;
  buttonStyle: string;
  imageStyle: string;
  horizontalAlignment: 'left' | 'center' | 'right';
  verticalAlignment: 'top' | 'middle' | 'bottom';
  background: string;

}

const defaultStyle: IHeaderStyle = {
  titleSize: 'MEDIUM',
  titleStyle: 'DARK',
  subtitleSize: 'SMALL',
  subtitleStyle: 'DARK',
  buttonStyle: 'BLUE',
  imageStyle: 'CROP',
  horizontalAlignment: 'center',
  verticalAlignment: 'middle',
  background: 'System Gradient'
};


export const HeaderStyleComponent: React.FC = () => {
  const [style, setStyle] = useState<IHeaderStyle>(defaultStyle);
  const [openSections, setOpenSections] = useState({
    title: true,
    subtitle: true,
    button: true,
    image: true,
    Background: true
  });
  const ref = useRef<HTMLDivElement>(null);
  const [showUploadTexture, setShowUploadTexture] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const handleChange = (key: keyof IHeaderStyle, value: string) => {
    setStyle(prevStyle => ({ ...prevStyle, [key]: value }));
  };



  const handleBackgroundChange = (value: string) => {
    setStyle(prevStyle => ({ ...prevStyle, background: value }));
    if (value === "Create new") {
      setShowUploadTexture(true);
    } else if (value === "Add from library") {
      setShowLibrary(true);
    }
  };

  const handleSectionToggle = (section: keyof typeof openSections) => (isOpen: boolean) => {
    setOpenSections(prev => ({ ...prev, [section]: isOpen }));
    if (!isOpen) {
      if (section === 'Background') {
        setStyle(prevStyle => ({
          ...prevStyle,
          background: defaultStyle.background
        }));
      } else {
        setStyle(prevStyle => ({
          ...prevStyle,
          [`${section}Size`]: defaultStyle[`${section}Size` as keyof IHeaderStyle],
          [`${section}Style`]: defaultStyle[`${section}Style` as keyof IHeaderStyle],
        }));
      }
    }
  };

  return (
    <Container ref={ref}>
      <DataObfuscator
        title='Background board'
        isOpen={openSections.Background}
        onToggle={handleSectionToggle('Background')}
      >
        <SelectInput
          options={BackgroundOptions}
          value={style.background}
          onChange={handleBackgroundChange}
          inputSize={InputSize.SMALL}
          mode={InputMode.DEFAULT}
          placeholder="System Gradient"
          fullWidth={true}
        />
      </DataObfuscator>
      {showUploadTexture && <TextureUploadComponent parentRef={ref} onClose={() => setShowUploadTexture(false)} />}
      {showLibrary && <TextureUploadComponent parentRef={ref} onClose={() => setShowLibrary(false)} />}

      <Divider />
      <AlignmentControl
        onHorizontalAlignmentChange={(alignment) => handleChange('horizontalAlignment', alignment)}
        onVerticalAlignmentChange={(alignment) => handleChange('verticalAlignment', alignment)}
      />
      <DataObfuscator
        title='Text style'
        isOpen={openSections.title}
        onToggle={handleSectionToggle('title')}
      >
        <SelectInput
          options={textSizeOptions}
          value={style.titleSize}
          onChange={(value) => handleChange('titleSize', value)}
          inputSize={InputSize.SMALL}
          mode={InputMode.DEFAULT}
          placeholder="Choose..."
          fullWidth={true}

        />
        <SelectInput
          options={textStyleOptions}
          value={style.titleStyle}
          onChange={(value) => handleChange('titleStyle', value)}
          inputSize={InputSize.SMALL}
          mode={InputMode.DEFAULT}
          placeholder="Choose..."
          fullWidth={true}
        />
      </DataObfuscator>

      <Divider />

      <DataObfuscator
        title='Image'
        isOpen={openSections.subtitle}
        onToggle={handleSectionToggle('subtitle')}
      >
        <SelectInput
          options={imageStyleOptions}
          value={style.subtitleSize}
          onChange={(value) => handleChange('subtitleSize', value)}
          inputSize={InputSize.SMALL}
          mode={InputMode.DEFAULT}
          placeholder="Choose..."
          fullWidth={true}
        />
      </DataObfuscator>

      <Divider />

      <DataObfuscator
        title='Button'
        isOpen={openSections.image}
        onToggle={handleSectionToggle('image')}
      >
        <SelectInput
          options={buttonStyleOptions}
          value={style.imageStyle}
          onChange={(value) => handleChange('imageStyle', value)}
          inputSize={InputSize.SMALL}
          mode={InputMode.DEFAULT}
          placeholder="Choose..."
          fullWidth={true}
        />
      </DataObfuscator>
    </Container>
  );
};








