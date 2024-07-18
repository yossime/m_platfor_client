import { QuestionnaireStatus, ContextDataType } from '@context/useQuestionnaire';

const enumValues = Object.values(QuestionnaireStatus);

export const getNextIndex = (currentIndex: QuestionnaireStatus | null, move: number) => {
  if (currentIndex === null) {
    return enumValues[1];
  }

  const currentIndexPosition = enumValues.indexOf(currentIndex);
  let newIndexPosition = currentIndexPosition + move;

  newIndexPosition = Math.max(0, Math.min(newIndexPosition, enumValues.length - 1));

  return enumValues[newIndexPosition];
};

export const isCurrentPageValid = (currentIndex: QuestionnaireStatus | null, contextData: ContextDataType): boolean => {
  switch (currentIndex) {
    case QuestionnaireStatus.WebsiteType:
      return contextData.Type.valid;
    case QuestionnaireStatus.QuestionnaireBusinessName:
      return contextData.Name.valid;
    // case QuestionnaireStatus.QuestionnaireApps:
      // return contextData.Apps.valid;
    case QuestionnaireStatus.QuestionnaireBoards:
      return contextData.Boards.valid;
    case QuestionnaireStatus.QuestionnaireTemplates:
      return contextData.Templates.valid;
    default:
      return false;
  }
};