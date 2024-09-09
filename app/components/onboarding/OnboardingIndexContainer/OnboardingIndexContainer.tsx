import React from 'react';
import { useOnboardingIndex, OnboardingStatus } from '@context/useOnboarding';
import {
  IndexContainerWrapper,
  IndexWrapper,
  StageWrapper,
  StageIndicator,
} from './OnboardingIndexContainerStyles';


const enumValues = Object.values(OnboardingStatus);

const OnboardingIndexContainer: React.FC = () => {
  const { currentIndex } = useOnboardingIndex();

  const getStageStatus = (index: number, currentStatus: OnboardingStatus | null) => {
    if (!currentStatus) return 'upcoming';
    const currentStageIndex = enumValues.indexOf(currentStatus);
    if (index < currentStageIndex) return 'completed';
    if (index === currentStageIndex) return 'current';
    return 'upcoming';
  };

  return (
    <IndexContainerWrapper>
      <IndexWrapper>
        {enumValues.map((status, index) => {
          const stageStatus = getStageStatus(index, currentIndex);
          return (
            <React.Fragment key={status}>
              <StageWrapper>
                <StageIndicator $status={stageStatus}/>
              </StageWrapper>
            </React.Fragment>
          );
        })}
      </IndexWrapper>
    </IndexContainerWrapper>
  );
};

export default OnboardingIndexContainer;