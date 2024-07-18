import React from 'react';
import Text from '@components/Library/text/Text';
import { useQuestionnaireIndex, QuestionnaireStatus } from '@context/useQuestionnaire';
import {
  IndexContainerWrapper, IndexWrapper,
  StageWrapper,
  StageFrame,
  Connector,
  ConnectorLine
} from './QuestionnaireIndexContainerStyles';
import { FontWeight, TextColor, TextSize } from '@constants/text';

const enumValues = Object.values(QuestionnaireStatus);

const QuestionnaireIndexContainer: React.FC = () => {
  const { currentIndex } = useQuestionnaireIndex();

  return (
    <IndexContainerWrapper>
      <IndexWrapper>
        {enumValues.map((status, index) => (
          <React.Fragment key={status}>
            <StageWrapper>
              <StageFrame isActive={currentIndex === status}>
                <Text
                  size={TextSize.TEXT1}
                  weight={currentIndex === status ? FontWeight.BOLD : FontWeight.NORMAL}
                  color={currentIndex === status ? TextColor.PRIMARY_TEXT: TextColor.SECONDARY_TEXT}
                >
                  {status.replace(/Questionnaire/, '')}
                </Text>
              </StageFrame>
            </StageWrapper>
            {index < enumValues.length - 1 && (
              <Connector>
                <ConnectorLine />
              </Connector>
            )}
          </React.Fragment>
        ))}
      </IndexWrapper>
    </IndexContainerWrapper>
  );
};

export default QuestionnaireIndexContainer;