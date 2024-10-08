import React, { useState } from 'react';
import BoardBox from '@/components/Library/boxes/boardBox/BoardBox';
import Text from '@components/Library/text/Text';
import { Container, TextContainer, ItemsContainer, IndexContainer, ContentWrapper } from './CommonStyles';
import { IconName, IconSize } from '@constants/icon';
import QuestionnaireIndexContainer from '../../OnboardingIndexContainer/OnboardingIndexContainer';
import { FontFamily, FontWeight,  TextSize } from '@constants/text';
import { TextColor } from '@constants/colors';
import { useOnboardingIndex } from '@/context/useOnboarding';
import { getNextIndex } from '@/utils/onboardinUtils';



interface BoxData {
  title: string;
  iconName: any;

}

const data: BoxData[] = [
  {
    title: "Designer",
    iconName: IconName.PENNIBSTRAIGHT,
  },
  {
    title: "Developer",
    iconName: IconName.DEVICES,
  },
  {
    title: "Marketer",
    iconName: IconName.CHARTLINEUP,
  },
  {
    title: "Other",
    iconName: IconName.DETECTIVE,
  }
];




const WhoUsingjob: React.FC = () => {
    const { contextData, setContextData } = useOnboardingIndex();
    const [selected, setSelected] = useState<string>(contextData.WhoUsingjob.value);
    const { currentIndex, setIndex } = useOnboardingIndex();


    const handleClick = (type: string) => {
        setSelected(type);
        setContextData({
          ...contextData,
          WhoUsingjob: {
            ...contextData.WhoUsingjob,
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
                        color={TextColor.PRIMARY_TEXT}>Whats your occupation?</Text>
                </TextContainer>
                <ItemsContainer>
                    {data.map((item, index) => (
                        <BoardBox
                            key={index}
                            title={item.title}
                            onClick={() => handleClick(item.title)}
                            clicked={selected.includes(item.title)}
                            iconName={item.iconName}
                        />
                    ))}
                </ItemsContainer>
            </ContentWrapper>
        </Container>
    );
};

export default WhoUsingjob;