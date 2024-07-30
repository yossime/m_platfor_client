import React from 'react';
import { IParams, IProductBoard, IDisplay, IProduct } from '@/components/editor/interface/paramsType';
import { useProject } from '@/context/useProjectContext';
import { useEditor } from '@/context/useEditorContext';
import Button from '@/components/Library/button/Button';
import { ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
import { IconName, IconSize } from '@constants/icon';
import Text from '@/components/Library/text/Text';
import { BoardButton, BoardsContainer, BoardsWrapper } from '../../CommonStyles';
import { FontWeight, TextSize } from '@constants/text';
import Icon from '@/components/Library/icon/Icon';
import { IconColor } from '@constants/colors';

interface DisplayProps {
    onEditDisplay: (index: number, display: IDisplay) => void;
}

export const DisplayList: React.FC<DisplayProps> = ({ onEditDisplay }) => {
    const { setDataParameters, dataParameters } = useEditor();
    const { activeBoardIndex } = useEditor();
    const currentBoard = dataParameters?.boards[activeBoardIndex] as IProductBoard;

    const handleEditDisplay = (index: number, display: IDisplay) => {
        onEditDisplay(index, display);
    };

    const handleAddDisplay = () => {
        setDataParameters((prevParams) => {
            if (!prevParams || activeBoardIndex < 0 || !prevParams.boards[activeBoardIndex]) return prevParams;
            const board = prevParams.boards[activeBoardIndex] as IProductBoard;
            if (!board.displays || board.displays.length >= (board.maxDisplay || 0)) return prevParams;

            const product: IProduct = {
                type: board.displayType as string,
                title: { text: 'Product Title' },
                description: { text: 'Product Description' },
                SKU: { text: 'Product SKU' },
                // price:{text: '100'},

            };
            const newDisplay: IDisplay = {
                title: { text: `Display ${board.displays.length + 1}` },
                type: board.displayType as string,
                products: [product]
            };

            const updatedBoards = prevParams.boards.map((b, index) =>
                index === activeBoardIndex ? {
                    ...b,
                    displays: [...(b as IProductBoard).displays, newDisplay]
                } : b
            );

            const updatedParams = {
                ...prevParams,
                boards: updatedBoards
            };

            onEditDisplay(board.displays.length, newDisplay);

            return updatedParams;
        });
    };

    return (
        <div>
            <Text size={TextSize.TEXT2} weight={FontWeight.NORMAL}>
                Displays: {currentBoard.displays?.length || 0} of {currentBoard.maxDisplay || 0}
            </Text>
        <BoardsWrapper>
            <BoardsContainer>
                {currentBoard.displays?.map((display, index) => (
                    <BoardButton
                        key={index}
                        onClick={() => handleEditDisplay(index, display)}
                    >
                        <Text size={TextSize.TEXT2}> Display {index + 1}</Text>
                        <Icon name={IconName.EDIT} color={IconColor.PRIMARY} size={IconSize.SMALL} />
                    </BoardButton>
                ))}
                {(currentBoard.displays?.length || 0) < (currentBoard.maxDisplay || 0) && (
                       <Button
                       type={ButtonType.PRIMARY}
                       variant={ButtonVariant.SECONDARY}
                       size={ButtonSize.LARGE}
                       icon={IconName.PLUSCIRCLE}
                       iconPosition='left'
                       onClick={handleAddDisplay}
                       fullWidth={true}
                     />
                )}
            </BoardsContainer>
        </BoardsWrapper>
        </div>
    );
};