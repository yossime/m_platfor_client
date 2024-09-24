import React from 'react';
import Text from '@components/Library/text/Text';
import {  TextSize } from '@constants/text';
import {
  IndexContainerWrapper,
  IndexWrapper,
  StageWrapper,
  StageIndicator,
  InnerCircle,
  Connector
} from './DashboardDomainContainerStyles';
import Icon from '@/components/Library/icon/Icon';
import {  IconName, IconSize } from '@constants/icon';
import { IconColor, TextColor } from '@constants/colors';
import { DomainStatus, useDomainIndex } from '@/context/useDomain';

const enumValues = Object.values(DomainStatus);

const DashboardDomainIndexContainer: React.FC = () => {
  const { currentIndex } = useDomainIndex();

  const getStageStatus = (index: number, currentStatus: DomainStatus | null) => {
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
                <StageIndicator $status={stageStatus}>
                  {stageStatus === 'completed' ? (
                    <Icon name={IconName.CHECK} size={IconSize.SMALL} color={IconColor.LIGHT} />
                  ) : stageStatus === 'current' ? (
                    <InnerCircle>
                      <Text
                        size={TextSize.TEXT2}
                        color={TextColor.TEXT_ON_PRIMARY}
                      >
                        {index + 1}
                      </Text>
                    </InnerCircle>
                  ) : (
                    <Text
                      size={TextSize.TEXT2}
                      color={TextColor.PRIMARY_TEXT}
                    >
                      {index + 1}
                    </Text>
                  )}
                </StageIndicator>
                <Text
                  size={TextSize.TEXT2}
                >
                  {status.replace(/Questionnaire/, '')}
                </Text>
              </StageWrapper>
              {index < enumValues.length - 1 && <Connector />}
            </React.Fragment>
          );
        })}
      </IndexWrapper>
    </IndexContainerWrapper>
  );
};

export default DashboardDomainIndexContainer;