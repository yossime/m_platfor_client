"use client";
import React from "react";
import Text from "@/components/Library/text/Text";
import { FontWeight, TextSize } from "@constants/text";
import {
  HeaderContainer,
  ProjectContainer,
  ProjectIcon,
  ProjectTitle,
  ScrollableContent,
  SideBarContainer,
  MenuItemContainer,
  ActiveMenuItem 
} from "./DashboardStyles";
import { Divider2 } from "../editor/sideBar/components/CommonStyles";
import { useMenuContext } from "@/context/MenuContext ";
import { useProject } from "@/context/useProjectContext";
import { useRouter } from "next/navigation";

const DashboardSideBar: React.FC = () => {
  const { menuItems, currentSelection, setCurrentSelection } = useMenuContext();
  const { projectName } = useProject();


  const router = useRouter();
  
  const handleItemClick = (name: string) => {
    setCurrentSelection(name);
  
  
    switch (name) {
      case 'Products':
        router.push('/dashboard/products');
        break;
      case 'Accept payments':
        router.push('/dashboard/payments');
        break;
      case 'Connect a domain':
        router.push('/dashboard/domain');
        break;
      default:
        router.push('/');
    }
  };
  

  return (
    <>
      <SideBarContainer>
        <ProjectContainer>
          <ProjectIcon>
            {/* <Icon name={IconName.PLUS} onClick={handleAdd} /> */}
          </ProjectIcon>
          <ProjectTitle>
            <Text size={TextSize.TEXT2}>{projectName}</Text>
          </ProjectTitle>
          <ProjectIcon></ProjectIcon>
        </ProjectContainer>

        <Divider2 />
        <HeaderContainer>
          <ProjectTitle>
            <Text $weight={FontWeight.BOLD} size={TextSize.TEXT1}>
              {"Dashboard"}
            </Text>
          </ProjectTitle>
        </HeaderContainer>

        <ScrollableContent>
          {menuItems.map((item) => (
            <MenuItemContainer
              key={item.name}
              onClick={() => handleItemClick(item.name)}
              style={{
                fontWeight: currentSelection === item.name ? "bold" : "normal",
              }}
            >
              <Text
                size={TextSize.TEXT2}
                $weight={currentSelection === item.name ? FontWeight.BOLD : FontWeight.NORMAL}
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
