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

export const HeaderContainer = styled.div<{ $isChooseBoardWidget: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 48px;
  width: 100%;
  padding: 0 16px;
  background-color: ${(props) =>
    props.$isChooseBoardWidget ? "white" : "transparent"};
`;

export const HeaderTitle = styled.div`
  flex-grow: 1;
  text-align: center;
`;

export const HeaderIcon = styled.div`
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
