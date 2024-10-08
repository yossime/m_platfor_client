"use client";
import React, { useState, useEffect, useCallback } from "react";
import Button from "@components/Library/button/Button";
import {
  ButtonType,
  ButtonVariant,
  ButtonSize,
  ButtonMode,
} from "@constants/button";
import {
  ButtonsWrapper,
  ButtonsContainer as StyledButtonsContainer,
  LeftButtonContainer,
  RightButtonContainer,
} from "./ButtonsContainerStyles";
import { useRouter } from "next/navigation";
import { IconName } from "@constants/icon";
import { useOnboardingIndex } from "@/context/useOnboarding";
import { getNextIndex, isCurrentPageValid } from "@/utils/onboardinUtils";
import axios from "@/utils/axios";

interface Data {
  BuildFor: string;
  WhoUsingjob: string;
  WhoUsing: string;
}

const ButtonsContainer: React.FC = () => {
  const { currentIndex, setIndex, contextData } = useOnboardingIndex();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isFirstPage = currentIndex === "BuildFor";
  const isLastPage = currentIndex === "WhoUsing";

  const handleChangeIndex = useCallback(
    (move: number) => {
      if (
        (move > 0 && isCurrentPageValid(currentIndex, contextData)) ||
        move < 0
      ) {
        const newIndex = getNextIndex(currentIndex, move);
        setIndex(newIndex);
      }
    },
    [currentIndex, contextData, setIndex]
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`user/onboarding`, {
        'buildFor': contextData.BuildFor.value,
        'whoUsingjob': contextData.WhoUsingjob.value,
        'whoUsing': contextData.WhoUsing.value
      });
      
      if (response.status === 200) {
        router.push("/userPage");
      }
    } catch (error) {
      console.error("Error Submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSKip = async () => {
    router.push("/userPage");
  };

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        isCurrentPageValid(currentIndex, contextData)
      ) {
        if (isLastPage) {
          handleSubmit();
        } else {
          handleChangeIndex(1);
        }
      }
    },
    [currentIndex, contextData, handleChangeIndex, handleSubmit]
  );

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <ButtonsWrapper>
      <StyledButtonsContainer>
        <LeftButtonContainer>
          {!isFirstPage && (
            <Button
              icon={IconName.ARROWLEFT}
              iconPosition="left"
              type={ButtonType.PRIMARY}
              variant={ButtonVariant.TERTIARY}
              size={ButtonSize.MEDIUM}
              mode={ButtonMode.NORMAL}
              text="Back"
              onClick={() => handleChangeIndex(-1)}
            />
          )}
        </LeftButtonContainer>
        <RightButtonContainer>
          <Button
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.MEDIUM}
            mode={
             (isCurrentPageValid(currentIndex, contextData) || !isLastPage)
                ? ButtonMode.NORMAL
                : ButtonMode.DISABLED
            }
            text={isLastPage ?  "Submit" : "Skip" }
            onClick={isLastPage ?  handleSubmit : handleSKip }
          />
        </RightButtonContainer>
      </StyledButtonsContainer>
    </ButtonsWrapper>
  );
};

export default ButtonsContainer;
