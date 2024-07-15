import React, { useState } from 'react';
import Board from '@/components/questionnaire/boxes/board/Board';
import Text from '@components/Library/text/Text';
import { useQuestionnaireIndex } from '@/context/useQuestionnaire';
import { Container, ContentWrapper, TextContainer, ItemsContainer } from './CommonStyles';
import styled from 'styled-components';
import { IconName, IconSize, IconColor } from '@constants/icon';



interface BoxData {
	title: string;
	body: string;
	iconName: keyof typeof IconName;
	iconSize: keyof typeof IconSize;
	iconColor: keyof typeof IconColor;
}



const data: BoxData[] = [
	{
		title: "Header",
		body: "introduce your business with media or 3D objects",
		iconName: "HOME",
		iconSize: "MEDIUM",
		iconColor: "primary_icon"
	}, {
		title: "About us",
		body: "tell people about your business",
		iconName: "HOME",
		iconSize: "MEDIUM",
		iconColor: "primary_icon"
	}, {
		title: "Contact information",
		body: "Let your visitors contact you easily",
		iconName: "HOME",
		iconSize: "MEDIUM",
		iconColor: "primary_icon"
	}, {
		title: "Socials",
		body: "Clickable social media icons",
		iconName: "HOME",
		iconSize: "MEDIUM",
		iconColor: "primary_icon"
	},
];

const data2: BoxData[] = [
	{
		title: "Testemonials",
		body: "Show what Clients have said about your business",
		iconName: "STAR",
		iconSize: "MEDIUM",
		iconColor: "primary_icon"
	}, {
		title: "Features",
		body: "Showcase your best features",
		iconName: "STAR",
		iconSize: "MEDIUM",
		iconColor: "primary_icon"
	}, {
		title: "3D object",
		body: "Display a 3D object with interaction",
		iconName: "STAR",
		iconSize: "MEDIUM",
		iconColor: "primary_icon"
	}, {
		title: "Media",
		body: "Display image or video with a description",
		iconName: "STAR",
		iconSize: "MEDIUM",
		iconColor: "primary_icon"
	}, {
		title: "Article",
		body: "Add textual content with media",
		iconName: "STAR",
		iconSize: "MEDIUM",
		iconColor: "primary_icon"
	}, {
		title: "FAQ",
		body: "Display frequently asked questions about your business",
		iconName: "STAR",
		iconSize: "MEDIUM",
		iconColor: "primary_icon"
	}, {
		title: "Team",
		body: "Show your team",
		iconName: "STAR",
		iconSize: "MEDIUM",
		iconColor: "primary_icon"
	}, {
		title: "Image Gallery",
		body: "Display images atmosphere",
		iconName: "STAR",
		iconSize: "MEDIUM",
		iconColor: "primary_icon"
	}, {
		title: "Testemonials",
		body: "Show what Clients have said about your business",
		iconName: "STAR",
		iconSize: "MEDIUM",
		iconColor: "primary_icon"
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
			<ContentWrapper>
				<TextContainer>
					<Text size="H1" weight="SEMIBLOB" color="primary_text">Choose boards to feature in your 3D environment</Text>
					<Text size="TEXT1" weight="NORMAL" color="primary_text">Display your information on 3D interface boards</Text>
				</TextContainer>
			</ContentWrapper>
			<div>
				<Text size="TEXT1" weight="SEMIBLOB" color="primary_text">Recommended for you:</Text>
				<ItemsContainer>
					{data.map((item, index) => (
						<Board
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
			</div>
			<div>
				<Text size="TEXT1" weight="SEMIBLOB" color="primary_text">Discover more boards:</Text>
				<ItemsContainer>
					{data2.map((item, index) => (
						<Board
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
			</div>
		</Container>
	);
};

export default Boards;