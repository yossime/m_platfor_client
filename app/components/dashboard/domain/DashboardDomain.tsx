import React, { useEffect, useState } from "react";
import Text from "@/components/Library/text/Text";
import { FontFamily, FontWeight, TextSize } from "@constants/text";
import {
  ContentContainer,
  ProjectContainer,
  DashboardTitle,
  ScrollableContent,
  PaymentContent,
  DomainContent,
  DomainInputContent,
  DividerDomain,
} from "../DashboardStyles";
import DashboardDomainContainer from "./DashboardDomainContainer/DashboardDomainContainer";
import { DomainProvider } from "@/context/useDomain";
import ButtonsContainer from "./ButtonsContainer";
import DashboardDomainIndexContainer from "./DashboardDomainIndexContainer/DashboardDomainIndexContainer";
import {
  Container,
  TextContainer,
} from "./DashboardDomainContainer/CommonStyles";
import Input from "@/components/Library/input/Input";

const UpgradeDomain: React.FC = () => {
  return (
    <DomainProvider>
      <ContentContainer>
        <DashboardTitle>
          <Text $weight={FontWeight.SEMI_BOLD} size={TextSize.D3}>
            {"Connect a domain"}
          </Text>
        </DashboardTitle>
        <DomainContent>
          <DashboardDomainIndexContainer />
          <DashboardDomainContainer />
          <ButtonsContainer onBeforeNext={()=>{}} />
        </DomainContent>
      </ContentContainer>
    </DomainProvider>
  );
};
interface ConnectDomainProps {
  isFirstTime: boolean;
  setDomain: (domain: string) => void;
}

const ConnectDomain: React.FC<ConnectDomainProps> = ({
  isFirstTime: firstTime,
  setDomain,
}) => {
  return (
    <Container>
      <TextContainer>
        <Text
          size={TextSize.H3}
          $family={FontFamily.Poppins}
          $weight={FontWeight.SEMI_BOLD}
        >
          {firstTime ? "Connect an existing domain" : "Domain Not Found"}
        </Text>
        <Text size={TextSize.TEXT1}>
          {firstTime
            ? "Secure the perfect domain for your store—one that customers can trust and find easily. Connect an existing domain you’ve purchased from a third-party provider like Google Domains or GoDaddy directly to Mocart."
            : "The domain you entered does not appear to be registered or associated with any owner. Please check the domain name for any errors or consider registering it if it's available."}
        </Text>
      </TextContainer>
      <DomainInputContent>
      <Input placeholder="e.g., mywebspace.com" fullWidth={false} onChange={(e) => setDomain(e.target.value)} />
      <DividerDomain />

      </DomainInputContent>
    </Container>
  );
};

const DashboardDomain: React.FC = () => {
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const [domain, setDomain] = useState<string>("");
  const [domainExists, setDomainExists] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const checkDomainExists = async (domain: string) => {
    setLoading(true);
    console.log(domain)
    try {
      const response = await fetch(`/api/check-domain?domain=${domain}`);
      const data = await response.json();
      console.log(data);
      setDomainExists(data.available);
    } catch (error) {
      console.error("Error checking domain:", error);
      setDomainExists(false);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (domain) {
  //     checkDomainExists(domain);
  //   }
  // }, [domain]);

  const BeforeNextConnect = () => {
     checkDomainExists(domain)
    setIsFirstTime(false)
  }


  return (
    <DomainProvider>
      <ContentContainer>
        <DashboardTitle>
          <Text $weight={FontWeight.SEMI_BOLD} size={TextSize.D3}>
            {"Connect a domain"}
          </Text>
        </DashboardTitle>
        {domainExists ? (
          <DomainContent>
            <DashboardDomainIndexContainer />
            <DashboardDomainContainer />
            <ButtonsContainer onBeforeNext={()=>{}}  />
          </DomainContent>
        ) : (
          <DomainContent>
            <ConnectDomain isFirstTime={isFirstTime} setDomain={setDomain} />
            <ButtonsContainer onBeforeNext={BeforeNextConnect} />
          </DomainContent>
        )}
      </ContentContainer>
    </DomainProvider>
  );
};

export default DashboardDomain;
