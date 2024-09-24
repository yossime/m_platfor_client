import React from "react";
import Text from "@/components/Library/text/Text";
import { TextSize } from "@constants/text";
import { ContentContainer, ProjectContainer, ProjectTitle, ScrollableContent } from "../DashboardStyles";
import DashboardDomainContainer from "./DashboardDomainContainer/DashboardDomainContainer";
import { ButtonsContainer } from "./buttonsContainer/ButtonsContainerStyles";
import { DomainProvider } from "@/context/useDomain";


const DashboardDomain: React.FC = () => {



  return (
    <>
    <DomainProvider>
        <ContentContainer>
          <ProjectContainer>

            <ProjectTitle>
              <Text size={TextSize.TEXT2}>{"Domain"}</Text>
            </ProjectTitle>
          </ProjectContainer>


          <ScrollableContent>
          <DashboardDomainContainer />
          <ButtonsContainer />
          </ScrollableContent>
        </ContentContainer>
        </DomainProvider>
    </>
  );
};

export default DashboardDomain;
