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

interface MenuItemContainerProps {
  selected: boolean;
}

export const MenuItemContainer = styled.div<MenuItemContainerProps>`
  width: 314px;
  height: 32px;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap:8px;
  background-color: ${({ selected }) =>
    selected ? BackgroundColor.PRIMARY_SELECTED_COLOR : "white"};
  ${({ selected }) =>
    !selected &&
    `
      &:hover {
        background-color: ${BackgroundColor.PRIMARY_BACKGROUND_HOVER};
      }
    `}
`;

export const ActiveMenuItem = styled(MenuItemContainer)`
  background-color: #1890ff;
  color: #fff;
  font-weight: bold;
  &:hover {
    background-color: white;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  text-align: center;
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
export const DashboardTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

export const ProjectIcon = styled.div`
  cursor: pointer;
`;

export const DashboardIcon = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

export const SubHeaderContainer = styled.div`
  &:empty {
    display: none;
    height: 0;
    overflow: hidden;
  }
`;

export const ScrollableContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
`;

export const PaymentContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

`;
export const DomainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 16px 32px;
  width: 100%;
  background-color: white;
  overflow: hidden;
`;

export const DomainInputContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  width: 100%;
`;
export const DividerDomain = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
`;

export const StripContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  /* height: 208px; */
  background-color: white;
  border-radius: 8px;
  padding: 24px;

`;

export const StripMassegContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap:24px;
  width: 100%;
  height: 100%;
`;
export const StripContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
`;
export const CardContent = styled.div`
  display: flex;
  justify-content: center;
  top:0;
  width: 144px;
  height: 100px;

`;
export const TextContent = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: column;
  width: 250px;
  gap: 8px;

`;
export const ButtonContent = styled.div`
  margin: 8px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const ProductListContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
