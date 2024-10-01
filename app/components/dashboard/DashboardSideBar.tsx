"use client";
import React from "react";
import Text from "@/components/Library/text/Text";
import { FontWeight, TextSize } from "@constants/text";
import {
  HeaderContainer,
  ProjectContainer,
  ProjectIcon,
  DashboardTitle,
  ScrollableContent,
  SideBarContainer,
  MenuItemContainer,
  ActiveMenuItem,
} from "./DashboardStyles";
import { Divider2 } from "../editor/sideBar/components/CommonStyles";
import { useMenuContext } from "@/context/MenuContext ";
import { useProject } from "@/context/useProjectContext";
import { useRouter } from "next/navigation";
import Icon from "../Library/icon/Icon";
import { IconName } from "@constants/icon";

const DashboardSideBar: React.FC = () => {
  const { menuItems, currentSelection, setCurrentSelection } = useMenuContext();
  const { projectName } = useProject();

  const router = useRouter();

  const handleItemClick = (name: string) => {
    setCurrentSelection(name);

    switch (name) {
      case "Products":
        router.push("/dashboard/products");
        break;
      case "Accept payments":
        router.push("/dashboard/payments");
        break;
      case "Connect a domain":
        router.push("/dashboard/domain");
        break;
      default:
        router.push("/");
    }
  };

  return (
    <>
      <SideBarContainer>
        <ProjectContainer>
          <Text size={TextSize.TEXT2}>{projectName}</Text>
          <ProjectIcon>
            <Icon
              name={IconName.EDIT}
              onClick={() => {
                router.push("/editor");
              }}
            />
          </ProjectIcon>
        </ProjectContainer>

        <Divider2 />

        <HeaderContainer>
          <DashboardTitle>
            <Text $weight={FontWeight.BOLD} size={TextSize.TEXT1}>
              {"Dashboard"}
            </Text>
          </DashboardTitle>
        </HeaderContainer>

        <Divider2 />

        <ScrollableContent>
          {menuItems.map((item) => (
            <MenuItemContainer
              selected={currentSelection ===item.name }
              key={item.name}
              onClick={() => handleItemClick(item.name)}
            >
              <Icon name={item.icon} />
              <Text
                size={TextSize.TEXT2}
                $weight={
               FontWeight.NORMAL
                }
              >
                {item.name}
              </Text>
            </MenuItemContainer>
          ))}
        </ScrollableContent>
      </SideBarContainer>
    </>
  );
};

export default DashboardSideBar;
