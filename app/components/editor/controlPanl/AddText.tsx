import React, { useState } from 'react';

interface AddTextProps {
  setExternalText: React.Dispatch<React.SetStateAction<string>>;
}

const AddText: React.FC<AddTextProps> = ({ setExternalText }) => {
  const [inputText, setInputText] = useState<string>('');

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
    setExternalText(event.target.value); // Update external text state
  };

  return (
    <input
      type="text"
      value={inputText}
      onChange={handleTextChange}
      style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 999 }}
    />
  );
};

export default AddText;
