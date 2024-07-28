import React from 'react';
import { IParams, IProductBoard, IDisplay, IProduct }  from '@/components/editor/interface/paramsType';
import { useProject } from '@/context/useProjectContext';
import { useEditor } from '@/context/useEditorContext';
import Button from '@/components/Library/button/Button';
import { ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
import { IconName } from '@constants/icon';

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
                price:{text: '100'},
                buttons: {
                    addToCart: 'Add to Cart',
                    quickView: 'Quick View',
                    buyNow: 'Buy Now',
                },
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
        <div className="space-y-4">
            <div className="text-sm font-medium">
                Displays: {currentBoard.displays?.length || 0} of {currentBoard.maxDisplay || 0}
            </div>
            <div className="space-y-2">
                {currentBoard.displays?.map((display, index) => (
                    <Button
                        key={index}
                        onClick={() => handleEditDisplay(index, display)}
                        size={ButtonSize.SMALL}
                        variant={ButtonVariant.SECONDARY}
                        type={ButtonType.PRIMARY}
                        fullWidth={true}
                        text={display.title?.text || `Display ${index + 1}`}
                    />
                ))}
                {(currentBoard.displays?.length || 0) < (currentBoard.maxDisplay || 0) && (
                    <Button
                        onClick={handleAddDisplay}
                        size={ButtonSize.SMALL}
                        variant={ButtonVariant.PRIMARY}
                        type={ButtonType.PRIMARY}
                        text='Add Display'
                        icon={IconName.PLUS}
                    />
                )}
            </div>
        </div>
    );
};