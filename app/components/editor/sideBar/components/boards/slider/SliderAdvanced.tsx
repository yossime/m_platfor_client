import React, { useState } from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  background: ${props => props.checked ? '#4F46E5' : '#fff'};
  border: 2px solid #4F46E5;
  border-radius: 4px;
  transition: all 150ms;
  display: flex;
  align-items: center;
  justify-content: center;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
  }

  &::after {
    content: '✔';
    display: ${props => props.checked ? 'block' : 'none'};
    color: white;
    font-size: 14px;
  }
`;

const LabelText = styled.span`
  margin-left: 8px;
  font-size: 16px;
  color: #333;
`;

export const SliderAdvancedComponent: React.FC = () => {
  const [isCyclic, setIsCyclic] = useState(false);

  const handleCheckboxChange = () => {
    setIsCyclic(!isCyclic);
  };

  return (
    <CheckboxContainer>
      <CheckboxLabel>
        <HiddenCheckbox checked={isCyclic} onChange={handleCheckboxChange} />
        <StyledCheckbox checked={isCyclic} />
        <LabelText>Cyclic</LabelText>
      </CheckboxLabel>
    </CheckboxContainer>
  );
};

export default SliderAdvancedComponent;