
import React from 'react';
import { HeaderType } from '../types';
import { InputSize, InputMode } from '@constants/input';
import SelectInput from '@/components/Library/input/SelectInput';
import { IParams, Skybox } from '@/components/editor/interface/paramsType';
import { useEditor } from '@/context/useEditorContext';
import styled from 'styled-components';




export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  gap: 24px;
`;


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