"use client"

import React, { useState } from 'react';
import { useQuestionnaireIndex } from '@context/useQuestionnaire';
import { useAuth } from '@/context/AuthContext';
import { createProject } from '@/services/projectService';
import { getNextIndex, isCurrentPageValid } from '@utils/questionnaireUtils';
import Button from '@components/Library/button/Button';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode } from '@constants/button';
import { ButtonsWrapper, LeftButtonContainer, RightButtonContainer } from './ButtonsContainerStyles';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import { useProject } from '@/context/useProjectContext';
import { useRouter } from "next/navigation";


const ButtonsContainer: React.FC = () => {
  const { currentIndex, setIndex, contextData } = useQuestionnaireIndex();
  const { user } = useAuth();
  const {setProjects, projects} = useProject();
  const router = useRouter();

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
      const result = await createProject(newProject, user);
      toast.success('Project created successfully!');
      setProjects([...projects, { id: result.projectId, projectName: contextData.Name.value }]);
      router.push('/userPage');

      console.log(projects);
    
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
            mode={isCurrentPageValid(currentIndex, contextData) ? ButtonMode.NORMAL : ButtonMode.DISABLED}
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