import React from 'react';
import { HeaderType } from '../types';
import { InputSize, InputMode } from '@constants/input';
import SelectInput from '@/components/Library/input/SelectInput';
import { IParams, Skybox } from '@/components/editor/interface/paramsType';
import { useEditor } from '@/context/useEditorContext';


const options = [
  { value: Skybox.DEFAULT, label: "Defaultsky" },
  { value: Skybox.DARK, label: "Dark" },
];

export const ArchitectureComponent: React.FC = () => {
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
    <div>
      <SelectInput
        options={options}
        value={dataParameters?.sky || ''}
        onChange={handleChange}
        inputSize={InputSize.MEDIUM}
        mode={InputMode.DEFAULT}
        label="בחר רקע שמיים"
        placeholder="נא לבחור..."
        fullWidth={true}
      />
    </div>
  );
};