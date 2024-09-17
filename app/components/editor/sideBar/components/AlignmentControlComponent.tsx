import React from "react";
import styled from "styled-components";
import Button from "@/components/Library/button/Button";
import {
  ButtonType,
  ButtonVariant,
  ButtonSize,
  ButtonMode,
} from "@constants/button";
import { IconName } from "@constants/icon";

interface AlignmentControlProps {
  onHorizontalAlignmentChange: (alignment: "left" | "center" | "right") => void;
  onVerticalAlignmentChange?: (alignment: "top" | "center" | "bottom") => void;
}

const Container = styled.div<{ isCentered: boolean }>`
  display: flex;
  justify-content: ${(props) => (!props.isCentered ? "center" : "space-between")};
  align-items: center;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const AlignmentControl: React.FC<AlignmentControlProps> = ({
  onHorizontalAlignmentChange,
  onVerticalAlignmentChange,
}) => {
  const isCentered = !!onVerticalAlignmentChange; 

  return (
    <Container isCentered={isCentered}>
      <ButtonGroup>
        <Button
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.SMALL}
          icon={IconName.ARROWLINELEFT}
          iconOnly={true}
          onClick={() => onHorizontalAlignmentChange("left")}
        />
        <Button
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.SMALL}
          icon={IconName.ARROWSINLINEHORIZONTAL}
          iconOnly={true}
          onClick={() => onHorizontalAlignmentChange("center")}
        />
        <Button
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.SMALL}
          icon={IconName.ARROWLINERIGHT}
          iconOnly={true}
          onClick={() => onHorizontalAlignmentChange("right")}
        />
      </ButtonGroup>
      {onVerticalAlignmentChange && (
        <ButtonGroup>
          <Button
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.SMALL}
            icon={IconName.ARROWLINEUP}
            iconOnly={true}
            onClick={() => onVerticalAlignmentChange("top")}
          />
          <Button
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.SMALL}
            icon={IconName.ARROWSINLINEVERTICAL}
            iconOnly={true}
            onClick={() => onVerticalAlignmentChange("center")}
          />
          <Button
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.SMALL}
            icon={IconName.ARROWLINEDOWN}
            iconOnly={true}
            onClick={() => onVerticalAlignmentChange("bottom")}
          />
        </ButtonGroup>
      )}
    </Container>
  );
};

export default AlignmentControl;
