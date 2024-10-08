
"use client"
import React, { ReactNode } from 'react';
import { ContainerWrapper } from './DashboardDomainContainerStyles';
import Domain from './Domain';
import Domain4 from './Domain4';
import Domain2 from './Domain2';
import Domain3 from './Domain3';
import { DomainStatus, useDomainIndex } from '@/context/useDomain';

const componentMap: { [key in DomainStatus]: ReactNode } = {
  [DomainStatus.Domain1]: <Domain />,
  [DomainStatus.Domain2]: <Domain2 />,
  [DomainStatus.Domain3]: <Domain3 />,
  [DomainStatus.Domain4]: <Domain4 />,
};

const DashboardDomainContainer: React.FC = () => {
  const { currentIndex } = useDomainIndex();

  return (
    <>
      <ContainerWrapper>
        {currentIndex && componentMap[currentIndex]}
      </ContainerWrapper></>

  );
}

export default DashboardDomainContainer;