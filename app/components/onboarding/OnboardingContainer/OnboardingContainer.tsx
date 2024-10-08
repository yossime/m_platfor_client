
"use client"
import React, { ReactNode } from 'react';
import { ContainerWrapper } from './OnboardingContainerStyles';
import { OnboardingStatus, useOnboardingIndex,  } from '@context/useOnboarding';
import BuildFor from './containers/BuildFor';
import WhoUsing from './containers/WhoUsing';
import WhoUsingjob from './containers/WhoUsingjob';

const componentMap: { [key in OnboardingStatus]: ReactNode } = {
  [OnboardingStatus.BuildFor]: <BuildFor />,
  [OnboardingStatus.WhoUsing]: <WhoUsing />,
  [OnboardingStatus.WhoUsingjob]: <WhoUsingjob />,
};

const OnboardingContainer: React.FC = () => {
  const { currentIndex } = useOnboardingIndex();

  return (
    <>
      <ContainerWrapper>
        {currentIndex && componentMap[currentIndex]}
      </ContainerWrapper></>

  );
}

export default OnboardingContainer;