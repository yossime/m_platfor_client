import React from "react";
import { useOnboardingIndex, OnboardingStatus } from "@context/useOnboarding";
import {
  IndexContainerWrapper,
  IndexWrapper,
  StageWrapper,
  StageIndicator,
  getMotionProps
} from "./OnboardingIndexContainerStyles";

const enumValues = Object.values(OnboardingStatus);

const OnboardingIndexContainer: React.FC = () => {
  const { currentIndex } = useOnboardingIndex();

  const getStageStatus = (index: number, currentStatus: OnboardingStatus) => {
    const currentStageIndex = enumValues.indexOf(currentStatus);
  
    return index === currentStageIndex ? "current" : "notCurrent";
  };
  

  return (
    <IndexContainerWrapper>
      <IndexWrapper>
        {enumValues.map((status, index) => {
          const stageStatus = getStageStatus(index, currentIndex);
          return (
            <React.Fragment key={status}>
              <StageWrapper>
                <StageIndicator
                  $status={stageStatus}
                  {...getMotionProps(stageStatus)}
                />
              </StageWrapper>
            </React.Fragment>
          );
        })}
      </IndexWrapper>
    </IndexContainerWrapper>
  );
};

export default OnboardingIndexContainer;
