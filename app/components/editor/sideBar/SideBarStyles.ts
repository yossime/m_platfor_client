import { BackgroundColor } from "@constants/colors";
import styled from "styled-components";

export const SideBarContainer = styled.div`
  position: absolute;
  border-radius: 8px;
  width: 362px;
  height: calc(100% - 87px);
  resize: horizontal;
  display: flex;
  flex-direction: column;
  z-index: 1;
  bottom: 16px;
  left: 16px;
  background-color: ${BackgroundColor.ALL_GREY_BACKGROUND};
`;

export const SideBarContainerMini = styled.div`
  position: absolute;
  border-radius: 8px;
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
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  height: max-content;
`;

export const ProjectObj = styled.div`
  background-color: red;
`;

export const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  z-index: 1;
  gap: 4px;
  background-color: rebeccapurple;
`;
export const ProjectItem = styled.div`
  background-color: white;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
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
