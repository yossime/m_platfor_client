import styled from 'styled-components';

export const IndexContainerWrapper = styled.div`
  width: 20%;
  min-width: 200px;
  max-width: 300px;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    max-width: none;
  }
`;