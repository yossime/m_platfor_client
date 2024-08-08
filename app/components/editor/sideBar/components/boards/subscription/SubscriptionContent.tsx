import React, { ChangeEvent, useState } from 'react';
import Input from '@/components/Library/input/Input';
import { InputMode, InputSize } from '@constants/input';
import { Container, Divider, SubContainer, SubWrapper } from '../../CommonStyles';
import DataObfuscator from '@/components/Library/general/DataObfuscator';
import Collapsible from '@/components/Library/general/Collapsible';
import { FontWeight, TextSize } from '@constants/text';
import Text from '@/components/Library/text/Text'
import styled from 'styled-components';

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

interface IPlaceholder {
  name: string;
  email: string;
}

interface ISubscription {
  title: string;
  subtitle: string;
  button: string;
  placeholders: IPlaceholder;
}

export const SubscriptionContentComponent: React.FC = () => {
  const [subscription, setSubscription] = useState<ISubscription>({
    title: 'Subscribe to our newsletter!',
    subtitle: 'Join us to hear about upcoming deals and promotions!',
    button: 'Submit!',
    placeholders: { name: 'Your Name', email: 'Your Email' },
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
  const handlePlaceholderChange = (field: keyof IPlaceholder) => (e: ChangeEvent<HTMLInputElement>) => {
    setSubscription(prev => ({
      ...prev,
      placeholders: { ...prev.placeholders, [field]: e.target.value },
    }));
  };

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
        <SubWrapper>
          <Text weight={FontWeight.SEMI_BOLD} size={TextSize.TEXT2}>Fields</Text>
          <SubContainer>
            <Collapsible title="Name Field">
              <FieldWrapper>
                <Input
                  placeholder='Enter your name here'
                  inputSize={InputSize.SMALL}
                  mode={InputMode.NORMAL}
                  value={subscription.placeholders.name}
                  onChange={handlePlaceholderChange('name')}
                />
              </FieldWrapper>
            </Collapsible>
            <Divider />
            <Collapsible title="Email Field">
              <FieldWrapper>
                <Input
                  placeholder='Enter email placeholder'
                  inputSize={InputSize.SMALL}
                  mode={InputMode.NORMAL}
                  value={subscription.placeholders.email}
                  onChange={handlePlaceholderChange('email')}
                />
              </FieldWrapper>
            </Collapsible>
          </SubContainer>
        </SubWrapper>
      <DataObfuscator
        title='Button'
        isOpen={openSections.button}
        onToggle={handleSectionToggle('button')}
      >
        <Input
          placeholder='Enter button text'
          inputSize={InputSize.SMALL}
          mode={InputMode.NORMAL}
          value={subscription.button}
          onChange={handleInputChange('button')}
        />
      </DataObfuscator>
    </Container>
  );
};