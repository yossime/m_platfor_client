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
import { TextContainer } from "./DashboardDomainContainer/CommonStyles";
import Input from "@/components/Library/input/Input";
import { useParams, useRouter, useSearchParams } from "next/navigation";

// const UpgradeDomain: React.FC = () => {
//   return (
//     <DomainProvider>
//       <ContentContainer>
//         <DashboardTitle>
//           <Text $weight={FontWeight.SEMI_BOLD} size={TextSize.D3}>
//             {"Connect a domain"}
//           </Text>
//         </DashboardTitle>
//         <DomainContent>
//           <DashboardDomainIndexContainer />
//           <DashboardDomainContainer />
//           <ButtonsContainer onBeforeNext={() => {}} />
//         </DomainContent>
//       </ContentContainer>
//     </DomainProvider>
//   );
// };

interface ConnectDomainProps {
  isFirstTime: boolean;
}

const ConnectDomain: React.FC<ConnectDomainProps> = ({
  isFirstTime: firstTime,
}) => {
  return (
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
  );
};

const DashboardDomain: React.FC = () => {
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const [domain, setDomain] = useState<string>("");
  const [domainExists, setDomainExists] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const checkDomainExists = async (domain: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/check-domain?domain=${domain}`);
      const data = await response.json();
      console.log(data);
      if (response.status == 200) setDomainExists(!data.available);
    } catch (error) {
      console.error("Error checking domain:", error);
      setDomainExists(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const  domainQuery  = searchParams?.get('domain');
    console.log(domainQuery,"domain")
    if (domainQuery) {
      setDomain(domainQuery as string)
      checkDomainExists(domainQuery);
    }
  }, []);

  const BeforeNextConnect = () => {
    checkDomainExists(domain);
    setIsFirstTime(false);
  };

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
            <ButtonsContainer shouldContinue={true} onBeforeNext={() => {}} />
          </DomainContent>
        ) : (
          <DomainContent>
            <ConnectDomain isFirstTime={isFirstTime} />
            <DomainInputContent>
              <Input
                placeholder="e.g., mywebspace.com"
                fullWidth={false}
                onChange={(e) => setDomain(e.target.value)}
              />
            </DomainInputContent>
            <DividerDomain />
            <ButtonsContainer
              shouldContinue={false}
              onBeforeNext={BeforeNextConnect}
            />
          </DomainContent>
        )}
      </ContentContainer>
    </DomainProvider>
  );
};

export default DashboardDomain;

// import React, { useEffect, useState } from "react";
// import Text from "@/components/Library/text/Text";
// import { FontFamily, FontWeight, TextSize } from "@constants/text";
// import {
//   ContentContainer,
//   DashboardTitle,
//   DomainContent,
//   DomainInputContent,
//   DividerDomain,
// } from "../DashboardStyles";
// import DashboardDomainContainer from "./DashboardDomainContainer/DashboardDomainContainer";
// import { DomainProvider } from "@/context/useDomain";
// import ButtonsContainer from "./ButtonsContainer";
// import Input from "@/components/Library/input/Input";
// import { useRouter } from "next/router";

// const ConnectDomain: React.FC<{ isFirstTime: boolean }> = ({ isFirstTime }) => (
//   <div>
//     <Text size={TextSize.H3} $family={FontFamily.Poppins} $weight={FontWeight.SEMI_BOLD}>
//       {isFirstTime ? "Connect an existing domain" : "Domain Not Found"}
//     </Text>
//     <Text size={TextSize.TEXT1}>
//       {isFirstTime
//         ? "Secure the perfect domain for your store—connect an existing domain you've purchased from a third-party provider directly to Mocart."
//         : "The domain you entered does not appear to be registered or associated with any owner. Please check or consider registering it if it's available."}
//     </Text>
//   </div>
// );

// const DashboardDomain: React.FC = () => {
//   const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
//   const [domain, setDomain] = useState<string>("");
//   const [domainExists, setDomainExists] = useState<boolean | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const checkDomainExists = async (domain: string) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/check-domain?domain=${domain}`);
//       const data = await response.json();
//       setDomainExists(response.status === 200 ? !data.available : false);
//     } catch (error) {
//       console.error("Error checking domain:", error);
//       setDomainExists(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isClient && router.isReady) {
//       const { domainQuery } = router.query;
//       if (domainQuery) {
//         setDomain(domainQuery as string);
//         checkDomainExists(domainQuery as string);
//       }
//     }
//   }, [isClient, router.isReady, router.query]);

//   const BeforeNextConnect = () => {
//     checkDomainExists(domain);
//     setIsFirstTime(false);
//   };

//   return (
//     <DomainProvider>
//       <ContentContainer>
//         <DashboardTitle>
//           <Text $weight={FontWeight.SEMI_BOLD} size={TextSize.D3}>Connect a domain</Text>
//         </DashboardTitle>
//         {domainExists ? (
//           <DomainContent>
//             <DashboardDomainContainer />
//             <ButtonsContainer shouldContinue={true} onBeforeNext={() => {}} />
//           </DomainContent>
//         ) : (
//           <DomainContent>
//             <ConnectDomain isFirstTime={isFirstTime} />
//             <DomainInputContent>
//               <Input
//                 placeholder="e.g., mywebspace.com"
//                 fullWidth={false}
//                 value={domain}
//                 onChange={(e) => setDomain(e.target.value)}
//               />
//             </DomainInputContent>
//             <DividerDomain />
//             <ButtonsContainer shouldContinue={!loading} onBeforeNext={BeforeNextConnect} />
//           </DomainContent>
//         )}
//       </ContentContainer>
//     </DomainProvider>
//   );
// };

// export default DashboardDomain;
