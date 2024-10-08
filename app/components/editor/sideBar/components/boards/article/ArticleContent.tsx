
import React, { ChangeEvent, useState } from 'react';
import Input from '@/components/Library/input/Input';
import { InputMode, InputSize } from '@constants/input';
import { Container, Divider} from '../../general/CommonStyles';
import DataObfuscator from '@/components/Library/general/DataObfuscator';






interface ISubscription {
  title: string;
  subtitle: string;
  text: string;
}

export const ArticleContentComponent: React.FC = () => {
  const [subscription, setSubscription] = useState<ISubscription>({
    title: 'Subscribe to our newsletter!',
    subtitle: 'Join us to hear about upcoming deals and promotions!',
    text: 'Submit!',
  });

  const [openSections, setOpenSections] = useState({
    title: true,
    subtitle: true,
    text: true,
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
          value={subscription.title}
          onChange={handleInputChange('title')}
        />
      </DataObfuscator>
      <DataObfuscator
        title='Subtitle'
        isOpen={openSections.subtitle}
        onToggle={handleSectionToggle('subtitle')}
      >
        <Input
          placeholder='Enter subtitle'
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          value={subscription.subtitle}
          onChange={handleInputChange('subtitle')}
        />
      </DataObfuscator>
      
      <DataObfuscator
        title='Button'
        isOpen={openSections.text}
        onToggle={handleSectionToggle('text')}
      >
        <Input
          placeholder='Enter button text'
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          value={subscription.text}
          onChange={handleInputChange('text')}
        />
      </DataObfuscator>
    </Container>
  );
};