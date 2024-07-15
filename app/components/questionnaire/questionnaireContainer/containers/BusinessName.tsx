

import React from 'react';
import Text from '@components/Library/text/Text';
import Input from '@components/Library/input/Input';
import { useQuestionnaireIndex } from '@/context/useQuestionnaire';
import { Container, ContentWrapper, TextContainer } from './CommonStyles';
import { InputSize, InputMode } from '@constants/input';
import styled from 'styled-components';


const BusinessName: React.FC = () => {
  const { contextData, setContextData } = useQuestionnaireIndex();

  const handleChange = (value: string) => {
    setContextData({
      ...contextData,
      Name: {
        ...contextData.Name,
        value: value,
        valid: value !== ''
      }
    });
  };

  return (
    <Container>
      <ContentWrapper>
        <TextContainer>
          <Text size="H1" weight="SEMIBLOB" color="primary_text">What's the name of your business?</Text>
          <Text size="TEXT1" weight="NORMAL" color="primary_text">You can add your existing restaurant or brand name, or create a new one.</Text>
        </TextContainer>
      </ContentWrapper>
        <Input
          size={InputSize.LARGE}
          mode={InputMode.NORMAL}
          placeholder="Enter your business name"
          value={contextData.Name.value || ''}
          onChange={handleChange}
          fullWidth
        />
    </Container>
  );
};

export default BusinessName;