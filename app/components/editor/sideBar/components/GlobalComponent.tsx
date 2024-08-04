
import React from 'react';
import { InputSize, InputMode } from '@constants/input';
import SelectInput from '@/components/Library/input/SelectInput';
import {  Skybox } from '@/components/editor/interface/paramsType';
import { useEditor } from '@/context/useEditorContext';
import { Container } from './CommonStyles';



const options = [
  { value: Skybox.DEFAULT, label: "Default Sky" },
  { value: Skybox.DARK, label: "Dark" },
];



export const GlobalComponent: React.FC = () => {
  const { setDataParameters, dataParameters } = useEditor();


  const handleChange = (value: Skybox) => {
    setDataParameters((prevParams) => {
      if (!prevParams) return null;
      return {
        ...prevParams,
        sky: value
      };
    });
  };

  return (
    <Container>
      <SelectInput
        options={options}
        value={dataParameters?.sky || ''}
        onChange={handleChange}
        inputSize={InputSize.MEDIUM}
        mode={InputMode.DEFAULT}
        placeholder="Default Sky box"
        fullWidth={true}
      />
      <SelectInput
        options={options}
        value={dataParameters?.sky || ''}
        onChange={handleChange}
        inputSize={InputSize.MEDIUM}
        mode={InputMode.DEFAULT}
        label='Choose Font'
        placeholder="Default"
        fullWidth={true}
      />
    </Container>
  );
};