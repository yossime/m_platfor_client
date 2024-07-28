import styled from 'styled-components';

export const SidebarContainer = styled.div`
  /* min-width: 392px; */
  width: 392px;
  resize: horizontal;
  overflow: auto;
`;

export const HeaderContainer = styled.div<{ isChooseBoardWidget: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  background-color: ${props => props.isChooseBoardWidget ? 'white' : 'transparent'};
`;

export const HeaderTitle = styled.div`
  flex-grow: 1;
  text-align: center;
`;

export const HeaderIcon = styled.div`
  cursor: pointer;
`;