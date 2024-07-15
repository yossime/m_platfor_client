import React, { useState } from 'react';
import Type from '@/components/questionnaire/boxes/type/Type';
import Text from '@components/Library/text/Text';
import { useQuestionnaireIndex } from '@/context/useQuestionnaire';
import { Container, ContentWrapper, TextContainer, ItemsContainer } from './CommonStyles';

const data = [
  { "title": "portfolio" },
  { "title": "online store" },
  { "title": "instructional site" },
  { "title": "showroom" },
  { "title": "food delivery" },
  { "title": "event" },
  { "title": "restaurant" },
  { "title": "technology company" }
];

const WebsiteType: React.FC = () => {
  const { contextData, setContextData } = useQuestionnaireIndex();
  const [selected, setSelected] = useState<string | null>(contextData.Type.value);

  const handleClick = (type: string) => {
    setSelected(type);
    setContextData({
      ...contextData,
      Type: {
        ...contextData.Type,
        value: type,
        valid: true
      }
    });
  };

  return (
    <Container>
      <ContentWrapper>
        <TextContainer>
          <Text size="H1" weight="SEMIBLOB" color="primary_text">What type of 3D website do you want to create?</Text>
        </TextContainer>
      </ContentWrapper>
      <ItemsContainer>
        {data.map((item, index) => (
          <Type
            key={index}
            title={item.title}
            onClick={() => handleClick(item.title)}
            clicked={item.title === selected}
          />
        ))}
      </ItemsContainer>
    </Container>
  );
};

export default WebsiteType;