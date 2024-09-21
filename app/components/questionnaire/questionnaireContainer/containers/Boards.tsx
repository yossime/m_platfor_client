import React, { useState } from 'react';
import BoardBox from '@/components/Library/boxes/boardBox/BoardBox';
import Text from '@components/Library/text/Text';
import { useQuestionnaireIndex } from '@/context/useQuestionnaire';
import { Container, TextContainer, ItemsContainer, IndexContainer, ContentWrapper } from './CommonStyles';
import { IconName, IconSize } from '@constants/icon';
import QuestionnaireIndexContainer from '../../questionnaireIndexContainer/QuestionnaireIndexContainer';
import { FontFamily, FontWeight,  TextSize } from '@constants/text';
import { TextColor } from '@constants/colors';



interface BoxData {
    title: string;
    body: string;
    iconName: any;
    disabled : boolean;
}

const data: BoxData[] = [
    {
        title: "Header",
        body: "Clickable social media icons",
        iconName: IconName.ALIGNTOP,
        disabled: false,
    },
    {
        title: "Form",
        body: "promote easy subscription",
        iconName: IconName.TABLE,
        disabled: false,

    },
    {
        title: "Image",
        body: "Display an \n image",
        iconName: IconName.IMAGE,
        disabled: false,

    }

];

const data2: BoxData[] = [
    {
        title: "Testimonials",
        body: "quote your customers",
        iconName: IconName.QUOTES,
        disabled: false,

    },
    {
        title: "Video",
        body: "show a video including 360°",
        iconName: IconName.VIDEO,
        disabled: false,

    },
    {
        title: "Article",
        body: "Add textual content",
        iconName: IconName.ARTICLE,
        disabled: false,

    },
    {
        title: "eComm",
        body: "Create and display products",
        iconName: IconName.STOREFRONT,
        disabled: false,

    },
    {
        title: "Services",
        body: "Showcase your best features",
        iconName: IconName.SQUARESFOUR,
        disabled: false,

    },
    {
        title: "Slider",
        body: "Display content with a slider",
        iconName: IconName.SLIDESHOW,
        disabled: false,

    },
    {
        title: "Socials",
        body: "Make it easy to contact with you",
        iconName: IconName.SMILEY,
        disabled: false,

    },
    {
        title: "Gamification",
        body: "Add a captivating  interaction",
        iconName: IconName.GAMECONTROLLER,
        disabled: true,

    },
    {
        title: "Team",
        body: "show your team members",
        iconName: IconName.USERSTHREE,
        disabled: true,

    },
    {
        title: "Showroom",
        body: "Create and display models",
        iconName: IconName.BANK,
        disabled: true,

    },  {
        title: "Blog",
        body: "Display updating  content",
        iconName: IconName.BOOKOPENTEXT,
        disabled: true,

    },  {
        title: "Menu/Catalogue",
        body: "Create and display products",
        iconName: IconName.COOKIE,
        disabled: true,

    },  {
        title: "events Schedule ",
        body: "Show a calendar, Promote booking ",
        iconName: IconName.CHEERS,
        disabled: true,

    }
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
                <Text size={TextSize.D1} $family={FontFamily.Poppins} $weight={FontWeight.SEMI_BOLD}
                    color={TextColor.PRIMARY_TEXT}>Choose widgets you’d like to add</Text>
                <Text size={TextSize.H3} $family={FontFamily.Poppins} $weight={FontWeight.NORMAL}
                    color={TextColor.PRIMARY_TEXT}>Give your site more functionality with Mocart business solutions.</Text>
            </TextContainer>
            <ContentWrapper>
                <TextContainer>
                    <Text size={TextSize.H3} $family={FontFamily.Poppins} $weight={FontWeight.NORMAL}
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
                            disabled={item.disabled}
                        />
                    ))}
                </ItemsContainer>
                <TextContainer>
                    <Text size={TextSize.H3} $family={FontFamily.Poppins} $weight={FontWeight.NORMAL}
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
                            disabled={item.disabled}
                        />
                    ))}
                </ItemsContainer>
            </ContentWrapper>
        </Container>
    );
};

export default Boards;