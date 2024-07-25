import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HeaderType, widgets } from '../types';
import { useProject } from '@/context/useProjectContext';
import { Params, Board, HeaderBoard, ImageBoard, ThreeDModelStyle, BaseSize, ButtonStyle, ImageStyle, ProductBoard, DisplayType, Display, Product,Text } from '@/context/editorTypes';
import { useEditor } from '@/context/useEditorContext';

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const WidgetButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

interface ChooseBoardWidgetComponentProps {
  onHeaderChange: (header: HeaderType) => void;
}

export const ChooseBoardWidgetComponent: React.FC<ChooseBoardWidgetComponentProps> = ({
  onHeaderChange
}) => {
  const { setActiveBoardIndex } = useEditor();
  const { setDataParameters, dataParameters } = useProject();
  const [boardIndex, setBoardIndex] = useState<number | ''>('');
  const [availableIndexes, setAvailableIndexes] = useState<number[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<ThreeDModelStyle>({
    textStyle: { scale: BaseSize.MEDIUM },
    buttonStyle: ButtonStyle.DEFAULT,
    imageStyle: ImageStyle.CROP
  });

  useEffect(() => {
    if (dataParameters?.boards) {
      const indexes = dataParameters.boards
        .map((board, index) => board.type === null ? index : -1)
        .filter(index => index !== -1);
      setAvailableIndexes(indexes);
      if (indexes.length > 0 && (boardIndex === '' || !indexes.includes(boardIndex as number))) {
        setBoardIndex(indexes[0]);
      }
    }
  }, [dataParameters, boardIndex]);

  const handle = (widget: typeof widgets[number]) => {
    if (boardIndex === '') return;
    setActiveBoardIndex(boardIndex);
    onHeaderChange(widget.editName as HeaderType);
    setDataParameters((prevParams: Params | null) => {
      if (!prevParams) return null;
      return {
        ...prevParams,
        boards: prevParams.boards.map((board, index) =>
          index === boardIndex
            ? createBoardByType(widget.name)
            : board
        )
      };
    });
  };


  const createBoardByType = (type: string): Board => {
    const baseBoard: Board = {
      type: type,
      style: selectedStyle,
    };

    const defaultText: Text = {
      text: '',
    };

    const product: Product = {
      type: "ttttt",
      title: { ...defaultText, text: 'Product Title' },
      description: { ...defaultText, text: 'Product Description' },
      SKU: { ...defaultText, text: 'Product SKU' },
      price: '100',
      buttons: {
        addToCart: 'Add to Cart',
        quickView: 'Quick View',
        buyNow: 'Buy Now',
      },
    };

    const display: Display = {
      type: "ttttt",
      title: { ...defaultText, text: 'Display Title' },
      products: [product],
    };


    switch (type) {
      case 'Header':
        return {
          ...baseBoard,
          title: { text: 'New Header' },
          subTitle: { text: 'Subtitle' },
          buttonTitle: { text: 'Button' },
        } as HeaderBoard;
      case 'Image':
        return {
          ...baseBoard,
          title: { text: 'Image Title' },
          subTitle: { text: 'Image Subtitle' },
          buttonTitle: { text: 'Button' },
        } as ImageBoard;
      case 'Product':
        return {
          ...baseBoard,
          title: { ...defaultText, text: 'ProductBoard Title' },
          displayType: DisplayType.STANDS,
          displays: [display],
          maxDisplay: 6,
        } as ProductBoard;
      default:
        return baseBoard;
    }
  };

  const handleIndexChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndex = parseInt(event.target.value, 10);
    setBoardIndex(isNaN(newIndex) ? '' : newIndex);
  };

  return (
    <div>
      <div>
        <label htmlFor="boardIndex">Select Empty Board: </label>
        <select
          id="boardIndex"
          value={boardIndex}
          onChange={handleIndexChange}
        >
          <option value="">Select a board</option>
          {availableIndexes.map(index => (
            <option key={index} value={index}>
              Board {index + 1}
            </option>
          ))}
        </select>
      </div>
      <WidgetContainer>
        {widgets.map((widget) => (
          <WidgetButton
            key={widget.name}
            onClick={() => handle(widget)}
            disabled={boardIndex === ''}
          >
            {widget.name}
          </WidgetButton>
        ))}
      </WidgetContainer>
    </div>
  );
};