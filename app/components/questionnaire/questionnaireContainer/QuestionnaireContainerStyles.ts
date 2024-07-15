import styled from 'styled-components';

export const ContainerWrapper = styled.div`
  height: 90%;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  /* background-color: green; */

  

  &::-webkit-scrollbar {
    display: none;
  }
  
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;