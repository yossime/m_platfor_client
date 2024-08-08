import React from 'react';
import { InputSize, InputMode } from '@constants/input';
import SelectInput from '@/components/Library/input/SelectInput';

import { Container, Divider } from '../../CommonStyles';
import { imageStyleOptions, textStyleOptions } from '../../../types';

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








