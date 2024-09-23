import { BackgroundColor } from "@constants/colors";
import styled from "styled-components";

export const SideBarContainer = styled.div`
  border-radius: 8px;
  min-width: 362px;
  display: flex;
  flex-direction: column;
  background-color: ${BackgroundColor.ALL_GREY_BACKGROUND};
  flex-shrink: 0;
  bottom: 16px;
  left: 16px;
`;

export const ContentContainer = styled.div`
  border-radius: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${BackgroundColor.ALL_GREY_BACKGROUND};
  flex-grow: 1;
  bottom: 16px;
  right: 16px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 40px;
  gap: 40px;
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

export const MenuItemContainer = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e6f7ff;
  }
`;

export const ActiveMenuItem = styled(MenuItemContainer)`
  background-color: #1890ff;
  color: #fff;
  font-weight: bold;
  &:hover {
    background-color: #40a9ff;
  }
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

export const TopLineContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;
  margin: 16px;
  padding: 0 16px;
`;

export const ProjectTitle = styled.div`
  flex-grow: 1;
  text-align: center;
`;

export const ProjectIcon = styled.div`
  cursor: pointer;
`;

export const DashboardIcon = styled.div`
  gap: 16px;
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
export const ProductListContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
