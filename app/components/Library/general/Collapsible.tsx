import React, { useState } from 'react';
import styled from 'styled-components';
import { IconName, IconSize } from '@constants/icon';
import { TextColor } from '@constants/colors';
import { FontWeight, TextSize } from '@constants/text';
import Icon from '../icon/Icon';
import Text from '../text/Text';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleWrapper = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
`;

const CollapsibleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const CollapsibleContent = styled.div<{ $isOpen: boolean }>`
  padding: 1rem;
  gap: 8px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
`;

const Collapsible: React.FC<CollapsibleProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <CollapsibleWrapper>
      <CollapsibleHeader onClick={toggleOpen}>
        <Icon
          name={isOpen ? IconName.CARETDOWN : IconName.CARETRIGHT }
          size={IconSize.SMALL}
          onClick={toggleOpen}
        />
        <Text
          size={TextSize.TEXT2}
          $weight={FontWeight.NORMAL}
          color={TextColor.PRIMARY_TEXT}
        >
          {title}
        </Text>
      </CollapsibleHeader>
      <CollapsibleContent $isOpen={isOpen}>
        {children}
      </CollapsibleContent>
    </CollapsibleWrapper>
  );
};

export default Collapsible;