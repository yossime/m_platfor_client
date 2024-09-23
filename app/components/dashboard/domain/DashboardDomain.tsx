import React from "react";
import Text from "@/components/Library/text/Text";
import { TextSize } from "@constants/text";

import { ContentContainer, ProjectContainer, ProjectIcon, ProjectTitle, ScrollableContent, SideBarContainer } from "../DashboardStyles";
import DashboardDomainContainer from "./DashboardDomainContainer/DashboardDomainContainer";
import { ButtonsContainer } from "./buttonsContainer/ButtonsContainerStyles";


const DashboardDomain: React.FC = () => {


  const handleBack = () => {
  };



  return (
    <>
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
          <DashboardDomainContainer />
          <ButtonsContainer />
          </ScrollableContent>
        </ContentContainer>

    </>
  );
};

export default DashboardDomain;
