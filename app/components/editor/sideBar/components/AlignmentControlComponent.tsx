import React from 'react';
import styled from 'styled-components';
import Button from '@/components/Library/button/Button';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode } from '@constants/button';
import { IconName } from '@constants/icon';

interface AlignmentControlProps {
    onHorizontalAlignmentChange: (alignment: 'left' | 'center' | 'right') => void;
    onVerticalAlignmentChange: (alignment: 'top' | 'middle' | 'bottom') => void;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const AlignmentControl: React.FC<AlignmentControlProps> = ({
    onHorizontalAlignmentChange,
    onVerticalAlignmentChange
}) => {


    return (
        <Container>
            <ButtonGroup>
                <Button
                    type={ButtonType.PRIMARY}
                    variant={ButtonVariant.SECONDARY}
                    size={ButtonSize.SMALL}
                    icon={IconName.ARROWLINELEFT}
                    iconOnly={true}
                    onClick={() => onHorizontalAlignmentChange('left')}
                />
                <Button
                    type={ButtonType.PRIMARY}
                    variant={ButtonVariant.SECONDARY}
                    size={ButtonSize.SMALL}
                    icon={IconName.ARROWSINLINEHORIZONTAL}
                    iconOnly={true}
                    onClick={() => onHorizontalAlignmentChange('center')}
                />
                <Button
                    type={ButtonType.PRIMARY}
                    variant={ButtonVariant.SECONDARY}
                    size={ButtonSize.SMALL}
                    icon={IconName.ARROWLINERIGHT}
                    iconOnly={true}
                    onClick={() => onHorizontalAlignmentChange('right')}
                />
            </ButtonGroup>
            <ButtonGroup>
                <Button
                    type={ButtonType.PRIMARY}
                    variant={ButtonVariant.SECONDARY}
                    size={ButtonSize.SMALL}
                    icon={IconName.ARROWLINEUP}
                    iconOnly={true}
                    onClick={() => onVerticalAlignmentChange('top')}
                />
                <Button
                    type={ButtonType.PRIMARY}
                    variant={ButtonVariant.SECONDARY}
                    size={ButtonSize.SMALL}
                    icon={IconName.ARROWSINLINEVERTICAL}
                    iconOnly={true}
                    onClick={() => onVerticalAlignmentChange('middle')}
                />
                <Button
                    type={ButtonType.PRIMARY}
                    variant={ButtonVariant.SECONDARY}
                    size={ButtonSize.SMALL}
                    icon={IconName.ARROWLINEDOWN}
                    iconOnly={true}
                    onClick={() => onVerticalAlignmentChange('bottom')}
                />
            </ButtonGroup>
        </Container>
    );
};

export default AlignmentControl;