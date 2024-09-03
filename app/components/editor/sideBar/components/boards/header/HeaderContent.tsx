import React, { useState } from 'react';
import { Container, Divider } from '../../CommonStyles';
import { ContentFileUpload, ContentInput } from '../../GenericBoardComponents';
// import { IContentMaterialType, IContentTextType } from '@/components/editor/interface/models';
import DataObfuscator from '@/components/Library/general/DataObfuscator';
import { IContentMaterialType, IContentTextType } from '@/components/editor/interface/types';

export const HeaderContentComponent: React.FC = () => {
  const [openSections, setOpenSections] = useState({
    title: true,
    subtitle: true,
    image: true,
    button: true,
  });

  const handleSectionToggle = (section: keyof typeof openSections) => (isOpen: boolean) => {
    setOpenSections(prev => ({ ...prev, [section]: isOpen }));
  };

  return (
    <Container>
      <DataObfuscator
        title='Title'
        isOpen={openSections.title}
        onToggle={handleSectionToggle('title')}
      >
        <ContentInput
          type={IContentTextType.TITLE}
          placeholder='Enter title'
        />
      </DataObfuscator>

      <DataObfuscator
        title='Subtitle'
        isOpen={openSections.subtitle}
        onToggle={handleSectionToggle('subtitle')}
      >
        <ContentInput
          type={IContentTextType.SUB_TITLE}
          placeholder='Enter subtitle'
        />
      </DataObfuscator>

      <Divider />
    
      <DataObfuscator
            title='Image'
            isOpen={openSections.image}
            onToggle={handleSectionToggle('image')}
      >
        <ContentFileUpload type={IContentMaterialType.IMAGE} />
      </DataObfuscator>

      <Divider />

      <DataObfuscator
        title='Button'
        isOpen={openSections.button}
        onToggle={handleSectionToggle('button')}
      >
        <ContentInput
          type={IContentTextType.BUTTON}
          placeholder='Enter button text'
        />
      </DataObfuscator>
    </Container>
  );
};