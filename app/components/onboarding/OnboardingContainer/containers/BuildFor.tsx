import React, { useState } from "react";
import TypeBox from "@/components/Library/boxes/typeBox/TypeBox";
import Text from "@components/Library/text/Text";
import {
  Container,
  IndexContainer,
  TextContainer,
  ItemsContainer,
} from "./CommonStyles";
import QuestionnaireIndexContainer from "../../OnboardingIndexContainer/OnboardingIndexContainer";
import { FontFamily, FontWeight, TextSize } from "@constants/text";
import { TextColor } from "@constants/colors";
import { useOnboardingIndex } from "@/context/useOnboarding";
import { IconName } from "@constants/icon";
import BoardBox, {
  BoxSize,
} from "@/components/Library/boxes/boardBox/BoardBox";

interface BoxData {
  title: string;
  iconName: any;
}

const data: BoxData[] = [
  {
    title: "For my Business",
    iconName: IconName.BRIEFCASE,
  },
  {
    title: "For a client",
    iconName: IconName.HANDSHAKE,
  },
  {
    title: "For fun",
    iconName: IconName.FINNTHEHUMAN,
  },
];

const BuildFor: React.FC = () => {
  const { contextData, setContextData } = useOnboardingIndex();
  const [selected, setSelected] = useState<string>(contextData.BuildFor.value);

  const handleClick = (type: string) => {
    setSelected(type);
    setContextData({
      ...contextData,
      BuildFor: {
        ...contextData.BuildFor,
        value: type,
        valid: true,
      },
    });
  };

  return (
    <Container>
      <IndexContainer>
        <QuestionnaireIndexContainer />
      </IndexContainer>
      <TextContainer>
        <Text
          size={TextSize.H3}
          $family={FontFamily.Poppins}
          $weight={FontWeight.NORMAL}
          color={TextColor.PRIMARY_TEXT}
        >
          Let's dive in!
        </Text>
        <Text
          size={TextSize.D1}
          $family={FontFamily.Poppins}
          $weight={FontWeight.SEMI_BOLD}
          color={TextColor.PRIMARY_TEXT}
        >
          Who are you building this web space for?
        </Text>
      </TextContainer>
      <ItemsContainer>
        {data.map((item, index) => (
          <BoardBox
            size={BoxSize.MEDIUM}
            key={index}
            title={item.title}
            onClick={() => handleClick(item.title)}
            clicked={selected.includes(item.title)}
            iconName={item.iconName}
          />
        ))}
      </ItemsContainer>
    </Container>
  );
};

export default BuildFor;
