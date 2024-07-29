import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useEditor } from '@/context/useEditorContext';
import { Skybox } from '../../interface/paramsType';
import { InputMode, InputSize } from '@constants/input';
import { ButtonMode, ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
import { FontWeight, TextSize } from '@constants/text';
import { IconName, IconSize } from '@constants/icon';
import SelectInput from '@/components/Library/input/SelectInput';
import Icon from '@/components/Library/icon/Icon';
import Button from '@/components/Library/button/Button';
import Text from '@/components/Library/text/Text';
import { IconColor } from '@constants/colors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  gap: 24px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
`;

const BoardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BoardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: start;
`;
const BoardButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 3px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }
`;


const options = [
  { value: Skybox.DEFAULT, label: "Default" },
  { value: Skybox.DARK, label: "Dark" },
];

interface ArchitectureComponentProps {
  setActiveSidebarHeader: (header: any) => void;
  handleBackOrAdd: () => void;
}

export const ArchitectureComponent: React.FC<ArchitectureComponentProps> = ({ handleBackOrAdd, setActiveSidebarHeader }) => {
  const { setActiveBoardIndex, dataParameters } = useEditor();
  const [availableIndex, setAvailableIndex] = useState<number | null>(null);

  useEffect(() => {
    if (dataParameters?.boards) {
      const index = dataParameters.boards.findIndex(board => board.type === null);
      setAvailableIndex(index !== -1 ? index : null);
    }
  }, [dataParameters]);

  const handleSelect = (name: string | null, index: number) => {
    setActiveSidebarHeader(`Edit ${name}`);
    setActiveBoardIndex(index);
  };

  if (!dataParameters || !dataParameters.boards) {
    return <Container>No boards available</Container>;
  }

  return (
    <Container>
      <SelectInput
        options={options}
        value={dataParameters?.sky || ''}
        onChange={() => { }}
        inputSize={InputSize.SMALL}
        mode={InputMode.DEFAULT}
        placeholder="Default Material"
        fullWidth={true}
      />

      <Divider />
      <BoardsWrapper>
          <Text weight={FontWeight.SEMI_BOLD} size={TextSize.TEXT2}>
            My Boards
          </Text>
        <BoardsContainer>
          {dataParameters.boards.map((board, index) => {
            if (board.type !== null) {
              return (
                <BoardButton
                  key={index}
                  onClick={() => handleSelect(board.name, index)}
                >
                  <Text size={TextSize.TEXT2}>Board {index + 1}: {board.name}</Text>
                  <Icon name={IconName.EDIT} color={IconColor.PRIMARY} size={IconSize.SMALL} />
                </BoardButton>
              );
            }
            return null;
          })}
        </BoardsContainer>
      </BoardsWrapper>
      <Button
        type={ButtonType.PRIMARY}
        variant={ButtonVariant.SECONDARY}
        size={ButtonSize.LARGE}
        icon={IconName.PLUSCIRCLE}
        iconPosition='left'
        onClick={handleBackOrAdd}
        text='Add Board'
        mode={(availableIndex === null) ? ButtonMode.DISABLED : ButtonMode.NORMAL}
        fullWidth={true}
      />
    </Container>
  );
};

export default ArchitectureComponent;