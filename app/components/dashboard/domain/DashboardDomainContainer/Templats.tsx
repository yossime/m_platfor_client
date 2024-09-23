

"use client"

import React, { useState } from 'react';
import TemplateBox from '@/components/Library/boxes/templateBox/TemplateBox';
import Text from '@components/Library/text/Text';
import { useQuestionnaireIndex } from '@/context/useQuestionnaire';
import { Container, ContentWrapper, TextContainer, ItemsContainer, IndexContainer } from './CommonStyles';
import { FontFamily, FontWeight, TextSize } from '@constants/text';
import { TextColor } from '@constants/colors';
import QuestionnaireIndexContainer from '@/components/questionnaire/questionnaireIndexContainer/QuestionnaireIndexContainer';

const data = [
  { "title": "Playful", "backgroundImage": "/images/Nostalgic.jpg" },
  { "title": "Innovative", "backgroundImage": "/images/Sci-fi.jpg" },
  { "title": "Luxurious", "backgroundImage": "/images/Luxurious.jpg" },
];

const Design: React.FC = () => {
  const { contextData, setContextData } = useQuestionnaireIndex();
  const [selected, setSelected] = useState<string | null>(contextData.Templates.value);

  const handleClick = (type: string) => {
    setSelected(type);
    setContextData({
      ...contextData,
      Templates: {
        ...contextData.Templates,
        value: type,
        valid: true
      }
    });
  };

  return (
    <Container>
      <IndexContainer>
        <QuestionnaireIndexContainer />
      </IndexContainer>
      <TextContainer>
        <Text size={TextSize.D1} $family={FontFamily.Poppins} $weight={FontWeight.SEMI_BOLD}
          color={TextColor.PRIMARY_TEXT}> Choose a template to start designing with:
        </Text>
        <Text size={TextSize.H3} $family={FontFamily.Poppins} $weight={FontWeight.NORMAL}
          color={TextColor.PRIMARY_TEXT}> Give your web space a matching theme
        </Text>
      </TextContainer>
      <ContentWrapper>
        <ItemsContainer>
          {data.map((item, index) => (
            <TemplateBox
              key={index}
              title={item.title}
              onClick={() => handleClick(item.title)}
              clicked={item.title === selected}
              backgroundImage={item.backgroundImage}
            />
          ))}
        </ItemsContainer>
      </ContentWrapper>
    </Container>
  );
};

export default Design;