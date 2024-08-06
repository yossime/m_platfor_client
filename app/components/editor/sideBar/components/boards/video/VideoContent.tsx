import React, { ChangeEvent, useState } from 'react';
import Input from '@/components/Library/input/Input';
import { InputMode, InputSize } from '@constants/input';
import { Container, Divider} from '../../CommonStyles';
import DataObfuscator from '@/components/Library/general/DataObfuscator';



interface FileData {
  id: string;
  name: string;
  content: ArrayBuffer;
}



interface ISubscription {
  Caption: string;
  video?: FileData;
}

export const VideoContentComponent: React.FC = () => {
  const [subscription, setSubscription] = useState<ISubscription>({
    Caption: 'Subscribe to our newsletter!',
  });

  const [openSections, setOpenSections] = useState({
    title: true,
    subtitle: true,
    button: true,
  });

 
  const handleInputChange = (field: keyof ISubscription) => (event: ChangeEvent<HTMLInputElement>) => {
    console.log('handle', event.target.value);
    setSubscription(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSectionToggle = (section: keyof typeof openSections) => (isOpen: boolean) => {
    setOpenSections(prev => ({ ...prev, [section]: isOpen }));
    if (!isOpen) {
      setOpenSections(prev => ({ ...prev, [section]: null }));
    }
  }


  return (
    <Container>
      <DataObfuscator
        title='Title'
        isOpen={openSections.title}
        onToggle={handleSectionToggle('title')}
      >
        <Input
          placeholder='Enter title'
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          value={subscription.Caption}
          onChange={handleInputChange('Caption')}
        />
      </DataObfuscator>

      <Divider/>
      
      <Divider/>
    </Container>
  );
};