import { BackgroundColor } from "@constants/colors";
import styled from "styled-components";

export const SideBarContainer = styled.div`
  position: absolute;
  border-radius: 8px;
  width: 335px;
  min-width: 216px;
  max-width: 50%;
  height: calc(100% - 87px);
  resize: horizontal;
  display: flex;
  flex-direction: column;
  z-index: 1;
  bottom: 16px;
  left: 16px;
  background-color: ${BackgroundColor.ALL_GREY_BACKGROUND};
`;


// export const SideBarContainer = styled.div`
//   border-radius: 8px;
//   width: 335px;
//   min-width: 216px;
//   max-width: 50%;
//   height:70%;
//   display: flex;
//   flex-direction: column;
//   background-color: ${BackgroundColor.ALL_GREY_BACKGROUND};
//   flex-shrink: 0; 
//   bottom: 16px;
//   left: 16px;
// `;

export const SideBarContainerMini = styled.div`
  position: absolute;
  border-radius: 8px;
  /* width: 335px; */
  /* min-width: 216px; */
  /* max-width: 50%; */
  justify-content: end;
  resize: horizontal;
  display: flex;
  flex-direction: column;
  z-index: 1;
  top: 87px;
  left: 16px; 
  background-color: ${BackgroundColor.ALL_GREY_BACKGROUND};
  align-items: flex-end; 
`;


export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  width: 100%;
  padding: 0 16px;
`;

export const HeaderTitle = styled.div`
  flex-grow: 1;
  text-align: center;
`;

export const HeaderIcon = styled.div`
  cursor: pointer;
`;


export const ProjectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;
  width: 100%;
  padding: 0 16px;
`;

export const ProjectTitle = styled.div`
  flex-grow: 1;
  text-align: center;
`;

export const ProjectIcon = styled.div`
  cursor: pointer;
`;


export const SubHeaderContainer = styled.div`
  &:empty {
    display: none;
    height: 0;
    overflow: hidden;
  }
`;

export const ScrollableContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
