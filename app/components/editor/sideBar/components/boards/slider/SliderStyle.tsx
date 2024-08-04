import React from 'react';
import { InputSize, InputMode } from '@constants/input';
import SelectInput from '@/components/Library/input/SelectInput';
import { ButtonStyle, ImageStyle, IParams, Skybox, ITextStyle, BaseSize, IHeaderBoard, IThreeDModelStyle }  from '@/components/editor/interface/paramsType';
import { useProject } from '@/context/useProjectContext';
import { useEditor } from '@/context/useEditorContext';
import { Container, Divider } from '../../CommonStyles';


const textStyleOptions = [
  { value: BaseSize.SMALL, label: "Default board Material" },
  { value: BaseSize.MEDIUM, label: "Medium" },
];

const imageStyleOptions = [
  { value: ImageStyle.CROP, label: "Crop" },
  { value: ImageStyle.FIT, label: "Fit" },
];

export const SliderStyleComponent: React.FC = () => {

  function handleChange(arg0: string, value: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Container>
      <SelectInput
        options={textStyleOptions}
        value={''}
        onChange={(value) => handleChange('textStyle',  value )}
        inputSize={InputSize.SMALL}
        mode={InputMode.DEFAULT}
        label="Background board"
        placeholder="Default board Material"
        fullWidth={true}
      />
      <Divider/>
      <SelectInput
        options={imageStyleOptions}
        value={ ''}
        onChange={(value) => handleChange('imageStyle', value)}
        inputSize={InputSize.SMALL}
        mode={InputMode.DEFAULT}
        label="Arrows"
        placeholder="Default button style"
        fullWidth={true}
      />
    </Container>
  );};








