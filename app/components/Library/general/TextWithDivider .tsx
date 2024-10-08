import React from "react";
import styled from "styled-components";
import Text from "@components/Library/text/Text";
import { TextSize } from "@constants/text";



const TextWithDividerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap:4px;
`;


const Line = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: #e5e7eb;
`;

interface TextWithDividerProps {
  text: string;
}

const TextWithDivider: React.FC<TextWithDividerProps> = ({ text }) => (
  <TextWithDividerContainer>
    <Line />
    <Text size={TextSize.TEXT1}>{text}</Text>
    <Line />
  </TextWithDividerContainer>
);

export default TextWithDivider;
