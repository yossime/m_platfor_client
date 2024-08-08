import React from 'react';
import styled from 'styled-components';
import { IconName, IconSize } from '@constants/icon';
import { TextColor } from '@constants/colors';
import { FontWeight, TextSize } from '@constants/text';
import Icon from '../icon/Icon';
import Text from '../text/Text';

interface DataObfuscatorProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

const DataObfuscatorWrapper = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
`;

const DataObfuscatorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const DataObfuscatorContent = styled.div<{ $isOpen: boolean }>`
  gap: 8px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
`;

const DataObfuscator: React.FC<DataObfuscatorProps> = ({ title, children, isOpen, onToggle }) => {
  const handleToggle = () => {
    onToggle(!isOpen);
  };

  return (
    <DataObfuscatorWrapper>
      <DataObfuscatorHeader onClick={handleToggle}>
        <Text
          size={TextSize.TEXT2}
          weight={FontWeight.SEMI_BOLD}
          color={TextColor.PRIMARY_TEXT}
        >
          {title}
        </Text>
        <Icon
          name={isOpen ? IconName.MINUS : IconName.PLUS}
          size={IconSize.SMALL}
          onClick={handleToggle}
        />
      </DataObfuscatorHeader>
      <DataObfuscatorContent $isOpen={isOpen}>
        {children}
      </DataObfuscatorContent>
    </DataObfuscatorWrapper>
  );
};

export default DataObfuscator;