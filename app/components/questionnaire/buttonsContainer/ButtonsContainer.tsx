"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { useQuestionnaireIndex } from '@context/useQuestionnaire';
import { useAuth } from '@/context/AuthContext';
import { createProject, fetchProject } from '@/services/projectService';
import { getNextIndex, isCurrentPageValid } from '@utils/questionnaireUtils';
import Button from '@components/Library/button/Button';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode } from '@constants/button';
import { ButtonsWrapper, ButtonsContainer as StyledButtonsContainer, LeftButtonContainer, RightButtonContainer } from './ButtonsContainerStyles';
import { toast } from 'react-toastify';
import { useProject } from '@/context/useProjectContext';
import { useRouter } from "next/navigation";
import { IconName } from '@constants/icon';

const ButtonsContainer: React.FC = () => {
  const { currentIndex, setIndex, contextData } = useQuestionnaireIndex();
  const { user } = useAuth();
  const router = useRouter();
  const { setCurrentProject, projects, setProjects  } = useProject();
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeIndex = useCallback((move: number) => {
    if ((move > 0 && isCurrentPageValid(currentIndex, contextData)) || move < 0) {
      const newIndex = getNextIndex(currentIndex, move);
      setIndex(newIndex);
    }
  }, [currentIndex, contextData, setIndex]);
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const newProject = {
        projectName: contextData.Name.value,
        projectParams: contextData
      };
      const result = await createProject(newProject, user);
      router.push('/editor');
      toast.success('Project created successfully!');
      setProjects([...projects, { id: result.projectId, projectName: contextData.Name.value }]);
      setCurrentProject(result.projectId);
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter' && isCurrentPageValid(currentIndex, contextData)) {
      if (currentIndex === 'QuestionnaireTemplates') {
        handleSubmit();
      } else {
        handleChangeIndex(1);
      }
    }
  }, [currentIndex, contextData, handleChangeIndex, handleSubmit]);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleBack = () => {
    router.push('/userPage');
  };

  const isFirstPage = currentIndex === 'WebsiteType';
  const isLastPage = currentIndex === 'QuestionnaireTemplates';

  return (
    <ButtonsWrapper>
      <StyledButtonsContainer>
        <LeftButtonContainer>
          <Button
            icon={IconName.ARROWLEFT}
            iconPosition='left'
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.TERTIARY}
            size={ButtonSize.MEDIUM}
            mode={ButtonMode.NORMAL}
            text="Back"
            onClick={isFirstPage ? handleBack : () => handleChangeIndex(-1)}
          />
        </LeftButtonContainer>
        <RightButtonContainer>
          {isLastPage ? (
            <Button
              type={ButtonType.PRIMARY}
              variant={ButtonVariant.PRIMARY}
              size={ButtonSize.SMALL}
              mode={isCurrentPageValid(currentIndex, contextData) ? ButtonMode.NORMAL : ButtonMode.DISABLED}
              text={isSubmitting ? "Submitting..." : "Submit"}
              onClick={handleSubmit}
              aria-label="Submit project"
            />
          ) : (
            <Button
              type={ButtonType.PRIMARY}
              variant={ButtonVariant.PRIMARY}
              size={ButtonSize.SMALL}
              mode={isCurrentPageValid(currentIndex, contextData) ? ButtonMode.NORMAL : ButtonMode.DISABLED}
              text="Continue"
              onClick={() => handleChangeIndex(1)}
            />
          )}
        </RightButtonContainer>
      </StyledButtonsContainer>
    </ButtonsWrapper>
  );
}

export default ButtonsContainer;


