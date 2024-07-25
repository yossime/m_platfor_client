import styled from 'styled-components';

 export const SidebarContainer = styled.div`
margin-top:50px;
  width: 256px;
  background-color: #f3f4f6;
  height: 100vh;
  padding: 16px;
  margin-bottom: 40px;
  overflow-y: auto;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

export const BackButton = styled.button`
  padding: 4px;
  border-radius: 50%;
  &:hover {
    background-color: #e5e7eb;
  }
`;