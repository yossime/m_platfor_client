import React from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const LoadingSpinner = ({ loading = true, size = 50, color = "#007bff", ariaLabel = "Loading" }) => {
  return (
    <LoaderContainer>
      {loading ? (
        <ClipLoader loading={loading} size={size} color={color} aria-label={ariaLabel} />
      ) : null}
    </LoaderContainer>
  );
};

export default LoadingSpinner;
