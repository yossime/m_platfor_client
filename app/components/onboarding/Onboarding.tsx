
import React, { ReactNode } from 'react';
import {
 OnboardingWrapper,
} from './OnboardingStyles';
import OnboardingContainer from './OnboardingContainer/OnboardingContainer';
import ButtonsContainer from './buttonsContainer/ButtonsContainer';



const Onboarding: React.FC = () => {
  return (
    <OnboardingWrapper>
      <OnboardingContainer />
      <ButtonsContainer />
    </OnboardingWrapper>
  );
};

export default Onboarding;
