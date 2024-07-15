import React from 'react';

interface AddCubeButtonProps {
  onClick: () => void;
}

const AddCubeButton: React.FC<AddCubeButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ position: 'absolute', top: '50px', left: '10px', zIndex: 999 }}
    >
      Add Cube
    </button>
  );
};

export default AddCubeButton;


