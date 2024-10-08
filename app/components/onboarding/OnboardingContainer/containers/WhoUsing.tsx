import React, { useState } from 'react';
import BoardBox from '@/components/Library/boxes/boardBox/BoardBox';
import Text from '@components/Library/text/Text';
import { Container, TextContainer, ItemsContainer, IndexContainer, ContentWrapper } from './CommonStyles';
import QuestionnaireIndexContainer from '../../OnboardingIndexContainer/OnboardingIndexContainer';
import { FontFamily, FontWeight,  TextSize } from '@constants/text';
import { TextColor } from '@constants/colors';
import { useOnboardingIndex } from '@/context/useOnboarding';
import { getNextIndex } from '@/utils/onboardinUtils';



interface BoxData {
    title: string;
  
  }
  
  const data: BoxData[] = [
    {
      title: "Team Player",
    },
    {
      title: "Freelancer",
    },
    {
      title: "Student",
    },
    {
      title: "Hobbyist",
    },
    {
        title: "Teacher",
      },
      {
        title: "Manager",
      },
      {
        title: "Founder",
      },
      {
        title: "Other",
      }
  ];
  
  

const WhoUsing: React.FC = () => {          
    const { contextData, setContextData } = useOnboardingIndex();
    const [selected, setSelected] = useState<string>(contextData.WhoUsing.value);
    const { currentIndex, setIndex } = useOnboardingIndex();


    const handleClick = (type: string) => {
        setSelected(type);
        setContextData({
          ...contextData,
          WhoUsing: {
            ...contextData.WhoUsing,
            value: type,
            valid: true
          }
        });
        const newIndex = getNextIndex(currentIndex, 1);
        setIndex(newIndex);
      };

    return (
        <Container>
            <IndexContainer>
                <QuestionnaireIndexContainer />
            </IndexContainer>
            <TextContainer>
            <Text size={TextSize.D1} $family={FontFamily.Poppins} $weight={FontWeight.SEMI_BOLD}
                  color={TextColor.PRIMARY_TEXT}>Who is using Mocart?</Text>
              <Text size={TextSize.H3} $family={FontFamily.Poppins} $weight={FontWeight.NORMAL}
                  color={TextColor.PRIMARY_TEXT}>Knowing this will help us improve.</Text>
            </TextContainer>
            <ContentWrapper>
            <TextContainer>
                    <Text size={TextSize.TEXT2} $family={FontFamily.Poppins} $weight={FontWeight.NORMAL}
                        color={TextColor.PRIMARY_TEXT}>What describes you best?</Text>
                </TextContainer>
                <ItemsContainer>
                    {data.map((item, index) => (
                        <BoardBox
                            key={index}
                            title={item.title}
                            onClick={() => handleClick(item.title)}
                            clicked={selected.includes(item.title)}
                        />
                    ))}
                </ItemsContainer>
            </ContentWrapper>
        </Container>
    );
};

export default WhoUsing;