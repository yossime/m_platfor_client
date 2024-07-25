import React, { useEffect } from 'react';
import { HeaderType } from '../types';
import { InputSize, InputMode } from '@constants/input';
import SelectInput from '@/components/Library/input/SelectInput';
import { Params, Skybox } from '@/context/editorTypes';
import { useProject } from '@/context/useProjectContext';

interface ArchitectureComponentProps {
  header: HeaderType;
}

const options = [
  { value: Skybox.DEFAULT, label: "Defaultsky" },
  { value: Skybox.DARK, label: "Dark" },
];

export const ArchitectureComponent: React.FC<ArchitectureComponentProps> = ({ header }) => {
  const { setDataParameters, dataParameters } = useProject();


  const handleChange = (value: Skybox) => {
    setDataParameters((prevParams: Params | null) => {
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