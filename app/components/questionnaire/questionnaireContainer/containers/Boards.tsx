import React, { useState } from 'react';
import BoardBox from '@/components/Library/boxes/boardBox/BoardBox';
import Text from '@components/Library/text/Text';
import { useQuestionnaireIndex } from '@/context/useQuestionnaire';
import { Container, TextContainer, ItemsContainer, IndexContainer, ContentWrapper } from './CommonStyles';
import { IconName, IconSize, IconColor } from '@constants/icon';
import QuestionnaireIndexContainer from '../../questionnaireIndexContainer/QuestionnaireIndexContainer';
import { FontFamily, FontWeight, TextColor, TextSize } from '@constants/text';



interface BoxData {
    title: string;
    body: string;
    iconName: any;
    iconSize: any;
    iconColor: any;
}

const data: BoxData[] = [
    {
        title: "Header",
        body: "Clickable social media icons",
        iconName: IconName.CODE,
        iconSize: IconSize.MEDIUM,
        iconColor: IconColor.PRIMARY
    },
    {
        title: "Form",
        body: "promote easy subscription",
        iconName: IconName.INFO,
        iconSize: IconSize.MEDIUM,
        iconColor: IconColor.PRIMARY
    },
    {
        title: "Testimonials",
        body: "quote your customers",
        iconName: IconName.PHONE,
        iconSize: IconSize.MEDIUM,
        iconColor: IconColor.PRIMARY
    },
    {
        title: "Image",
        body: "Display an image",
        iconName: IconName.SHARE,
        iconSize: IconSize.MEDIUM,
        iconColor: IconColor.PRIMARY
    },
];

const data2: BoxData[] = [
    {
        title: "Testimonials",
        body: "Show what Clients have said about your business",
        iconName: IconName.STAR,
        iconSize: IconSize.MEDIUM,
        iconColor: IconColor.PRIMARY
    },
    {
        title: "Features",
        body: "Showcase your best features",
        iconName: IconName.PAUSE,
        iconSize: IconSize.MEDIUM,
        iconColor: IconColor.PRIMARY
    },
    {
        title: "3D object",
        body: "Display a 3D object with interaction",
        iconName: IconName.STOP,
        iconSize: IconSize.MEDIUM,
        iconColor: IconColor.PRIMARY
    },
    {
        title: "Media",
        body: "Display image or video with a description",
        iconName: IconName.TRASH,
        iconSize: IconSize.MEDIUM,
        iconColor: IconColor.PRIMARY
    },
    {
        title: "Article",
        body: "Add textual content with media",
        iconName: IconName.VOLUME,
        iconSize: IconSize.MEDIUM,
        iconColor: IconColor.PRIMARY
    },
    {
        title: "FAQ",
        body: "Display frequently asked questions about your business",
        iconName: IconName.QUESTION,
        iconSize: IconSize.MEDIUM,
        iconColor: IconColor.PRIMARY
    },
    {
        title: "Team",
        body: "Show your team",
        iconName: IconName.X,
        iconSize: IconSize.MEDIUM,
        iconColor: IconColor.PRIMARY
    },
    {
        title: "Image Gallery",
        body: "Display images atmosphere",
        iconName: IconName.STAR,
        iconSize: IconSize.MEDIUM,
        iconColor: IconColor.PRIMARY
    },
    {
        title: "Testimonials",
        body: "Show what Clients have said about your business",
        iconName: IconName.STAR,
        iconSize: IconSize.MEDIUM,
        iconColor: IconColor.PRIMARY
    },
];
const Boards: React.FC = () => {
    const { contextData, setContextData } = useQuestionnaireIndex();
    const [selected, setSelected] = useState<string[]>(contextData.Boards.value);

    const handleClick = (type: string) => {
        const newSelected = selected.includes(type)
            ? selected.filter(item => item !== type)
            : [...selected, type];
        setSelected(newSelected);
        const isValid = newSelected.length > 0;

        setContextData({
            ...contextData,
            Boards: {
                ...contextData.Boards,
                value: newSelected,
                valid: isValid
            }
        });
    };

    return (
        <Container>
            <IndexContainer>
                <QuestionnaireIndexContainer />
            </IndexContainer>
            <TextContainer>
                <Text size={TextSize.D1} family={FontFamily.Poppins} weight={FontWeight.SEMI_BOLD}
                    color={TextColor.PRIMARY_TEXT}>    Choose widgets you’d like to add</Text>
                <Text size={TextSize.H3} family={FontFamily.Poppins} weight={FontWeight.NORMAL}
                    color={TextColor.PRIMARY_TEXT}>  Give your site more functionality with Mocart business solutions.</Text>
            </TextContainer>
            <ContentWrapper>
                <TextContainer>
                    <Text size={TextSize.H3} family={FontFamily.Poppins} weight={FontWeight.NORMAL}
                        color={TextColor.PRIMARY_TEXT}>  Recommended for you</Text>
                </TextContainer>
                <ItemsContainer>
                    {data.map((item, index) => (
                        <BoardBox
                            key={index}
                            title={item.title}
                            body={item.body}
                            onClick={() => handleClick(item.title)}
                            clicked={selected.includes(item.title)}
                            iconName={item.iconName}
                            iconSize={item.iconSize}
                            iconColor={item.iconColor}
                            disabled={false}
                        />
                    ))}
                </ItemsContainer>
                <TextContainer>
                    <Text size={TextSize.H3} family={FontFamily.Poppins} weight={FontWeight.NORMAL}
                        color={TextColor.PRIMARY_TEXT}>  Discover more boards</Text>
                </TextContainer>
                <ItemsContainer>
                    {data2.map((item, index) => (
                        <BoardBox
                            key={index}
                            title={item.title}
                            body={item.body}
                            onClick={() => handleClick(item.title)}
                            clicked={selected.includes(item.title)}
                            iconName={item.iconName}
                            iconSize={item.iconSize}
                            iconColor={item.iconColor}
                        />
                    ))}
                </ItemsContainer>
            </ContentWrapper>
        </Container>
    );
};

export default Boards;