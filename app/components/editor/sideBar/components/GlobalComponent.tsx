
import React from 'react';
import { InputSize, InputMode } from '@constants/input';
import SelectInput from '@/components/Library/input/SelectInput';

import { useEditor } from '@/context/useEditorContext';
import { Container } from './CommonStyles';
import { ESkybox } from '../../interface/types';



const options = [
  { value: ESkybox.DEFAULT, label: "Default Sky" },
  { value: ESkybox.DARK, label: "Dark" },
];



export const GlobalComponent: React.FC = () => {
  // const { setDataParameters, dataParameters } = useEditor();


  const handleChange = (value: ESkybox) => {
    // setDataParameters((prevParams) => {
    //   if (!prevParams) return null;
    //   return {
    //     ...prevParams,
    //     sky: value
    //   };
    // });
  };

  return (
    <Container>
      {/* <SelectInput
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
      /> */}
    </Container>
  );
};