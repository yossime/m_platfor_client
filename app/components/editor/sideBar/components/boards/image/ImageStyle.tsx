import React from 'react';
import { InputSize, InputMode } from '@constants/input';
import SelectInput from '@/components/Library/input/SelectInput';
import { ButtonStyle, ImageStyle, IParams, Skybox, ITextStyle, BaseSize, IHeaderBoard, IThreeDModelStyle }  from '@/components/editor/interface/paramsType';
import { useProject } from '@/context/useProjectContext';
import { useEditor } from '@/context/useEditorContext';
import { Container } from '../../CommonStyles';

const textStyleOptions = [
  { value: BaseSize.SMALL, label: "Small" },
  { value: BaseSize.MEDIUM, label: "Medium" },
  { value: BaseSize.LARGE, label: "Large" },
];

const buttonStyleOptions = [
  { value: ButtonStyle.DEFAULT, label: "Default" },
  { value: ButtonStyle.DARK, label: "Dark" },
];

const imageStyleOptions = [
  { value: ImageStyle.CROP, label: "Crop" },
  { value: ImageStyle.FIT, label: "Fit" },
];

export const ImageStyleComponent: React.FC = () => {
  const { setDataParameters, dataParameters } = useEditor();
  const { activeBoardIndex } = useEditor();

  const handleChange = (key: keyof IThreeDModelStyle, value: any) => {
    setDataParameters((prevParams) => {
      if (!prevParams || activeBoardIndex < 0 || !prevParams.boards[activeBoardIndex]) return prevParams;

      const currentBoard = prevParams.boards[activeBoardIndex] as IHeaderBoard;
      const updatedStyle = {
        ...currentBoard.style,
        [key]: value
      };

      return {
        ...prevParams,
        boards: prevParams.boards.map((board, index) => 
          index === activeBoardIndex 
            ? { ...board, style: updatedStyle } 
            : board
        )
      };
    });
  };

  const currentBoard = dataParameters?.boards[activeBoardIndex] as IHeaderBoard;

  return (
    <Container>
      <SelectInput
        options={textStyleOptions}
        value={currentBoard?.style?.textStyle?.scale || ''}
        onChange={(value) => handleChange('textStyle', { ...currentBoard?.style?.textStyle, scale: value })}
        inputSize={InputSize.SMALL}
        mode={InputMode.DEFAULT}
        label="Text style"
        placeholder="Choose..."
        fullWidth={true}
      />
      <SelectInput
        options={imageStyleOptions}
        value={currentBoard?.style?.imageStyle || ''}
        onChange={(value) => handleChange('imageStyle', value)}
        inputSize={InputSize.SMALL}
        mode={InputMode.DEFAULT}
        label="Image style"
        placeholder="Choose..."
        fullWidth={true}
      />
      <SelectInput
        options={buttonStyleOptions}
        value={currentBoard?.style?.buttonStyle || ''}
        onChange={(value) => handleChange('buttonStyle', value)}
        inputSize={InputSize.SMALL}
        mode={InputMode.DEFAULT}
        label="Button style"
        placeholder="Choose..."
        fullWidth={true}
      />
    </Container>
  );
};