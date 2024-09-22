import React from "react";
import Text from "@/components/Library/text/Text";
import { TextSize } from "@constants/text";
import Icon from "@/components/Library/icon/Icon";
import { IconName } from "@constants/icon";
import { ContentContainer, ProjectContainer, ProjectIcon, ProjectTitle, ScrollableContent, SideBarContainer } from "../DashboardStyles";


const DashboardProducts: React.FC = () => {


  const handleBack = () => {
  };



  return (
        <ContentContainer>
          <ProjectContainer>
            {/* <ProjectIcon>
              <Icon name={IconName.PLUS} onClick={handleBack} />
            </ProjectIcon> */}
            <ProjectTitle>
              <Text size={TextSize.TEXT2}>{"Dashboard"}</Text>
            </ProjectTitle>
          </ProjectContainer>




          <ScrollableContent>
            {/* <ContentArea
              activeSidebarHeader={activeSidebarHeader}
              activeSidebarSubMenu={activeSidebarSubMenu}
              setActiveSidebarHeader={setActiveSidebarHeader}
              handleBackOrAdd={handleBackOrAdd}
            /> */}
          </ScrollableContent>
        </ContentContainer>

  );
};

export default DashboardProducts;
