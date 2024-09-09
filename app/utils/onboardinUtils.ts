import { OnboardingStatus, ContextDataType } from '@context/useOnboarding';

const enumValues = Object.values(OnboardingStatus);

export const getNextIndex = (currentIndex: OnboardingStatus | null, move: number) => {
  if (currentIndex === null) {
    return enumValues[1];
  }

  const currentIndexPosition = enumValues.indexOf(currentIndex);
  let newIndexPosition = currentIndexPosition + move;

  newIndexPosition = Math.max(0, Math.min(newIndexPosition, enumValues.length - 1));

  return enumValues[newIndexPosition];
};

export const isCurrentPageValid = (currentIndex: OnboardingStatus | null, contextData: ContextDataType): boolean => {
  switch (currentIndex) {
    case OnboardingStatus.BuildFor:
      return contextData.BuildFor.valid;
    case OnboardingStatus.WhoUsing:
      return contextData.WhoUsing.valid;
    case OnboardingStatus.WhoUsingjob:
      return contextData.WhoUsingjob.valid;
    default:
      return false;
  }
};