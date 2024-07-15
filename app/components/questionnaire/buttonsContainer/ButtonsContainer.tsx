"use client"

import React, { useState } from 'react';
import { useQuestionnaireIndex } from '@context/useQuestionnaire';
import { useAuth } from '@/context/AuthContext';
import { createProject } from '@/services/projectService';
import { getNextIndex, isCurrentPageValid } from '@utils/questionnaireUtils';
import Button from '@components/Library/button/Button';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode } from '@constants/buttton';
import { ButtonsWrapper, LeftButtonContainer, RightButtonContainer } from './ButtonsContainerStyles';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications

const ButtonsContainer: React.FC = () => {
  const { currentIndex, setIndex, contextData } = useQuestionnaireIndex();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeIndex = (move: number) => {
    if ((move > 0 && isCurrentPageValid(currentIndex, contextData)) || move < 0) {
      const newIndex = getNextIndex(currentIndex, move);
      setIndex(newIndex);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const newProject = {
        projectName: contextData.Name.value,
        projectParams: contextData
      };
      await createProject(newProject, user);
      toast.success('Project created successfully!');
      // Navigate to the next page or dashboard
      // You might want to add navigation logic here
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFirstPage = currentIndex === null || currentIndex === 'WebsiteType';
  const isLastPage = currentIndex === 'QuestionnaireTemplates';

  return (
    <ButtonsWrapper>
      <LeftButtonContainer>
        {!isFirstPage && (
          <Button
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
        {isLastPage ? (
          <Button
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.MEDIUM}
            mode={isSubmitting ? ButtonMode.DISABLED : ButtonMode.NORMAL}
            text={isSubmitting ? "Submitting..." : "Submit"}
            onClick={handleSubmit}
            aria-label="Submit project"
          />
        ) : (
          <Button
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.MEDIUM}
            mode={isCurrentPageValid(currentIndex, contextData) ? ButtonMode.NORMAL : ButtonMode.DISABLED}
            text="Continue"
            onClick={() => handleChangeIndex(1)}
          />
        )}
      </RightButtonContainer>
    </ButtonsWrapper>
  );
}

export default ButtonsContainer;