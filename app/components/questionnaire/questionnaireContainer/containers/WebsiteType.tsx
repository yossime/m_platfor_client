import React, { useState } from 'react';
import TypeBox from '@/components/Library/boxes/typeBox/TypeBox';
import Text from '@components/Library/text/Text';
import { useQuestionnaireIndex } from '@/context/useQuestionnaire';
import { Container, IndexContainer, TextContainer, ItemsContainer } from './CommonStyles';
import QuestionnaireIndexContainer from '../../questionnaireIndexContainer/QuestionnaireIndexContainer';
import { FontFamily, FontWeight,  TextSize } from '@constants/text';
import { TextColor } from '@constants/colors';

const data = [
  { "title": "Portfolio" },
  { "title": "Online Store" },
  { "title": "Boutique /Mini-store" },
  { "title": "Instructional Site" },
  { "title": "Showroom" },
  { "title": "Food delivery /Restaurant" },
  { "title": "Event agency" },
  { "title": "Blog" }, 
  { "title": "Services" },
  { "title": "Technology Company" }


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
      <IndexContainer>
        <QuestionnaireIndexContainer />
      </IndexContainer>
        <TextContainer>
          <Text
           size={TextSize.D1} $family={FontFamily.Poppins} $weight={FontWeight.SEMI_BOLD}
            color={TextColor.PRIMARY_TEXT}>What business type are you creating 3D web space for?
            </Text>
        </TextContainer>
        <ItemsContainer>
          {data.map((item, index) => (
            <TypeBox
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