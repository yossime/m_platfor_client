import React from "react";
import Text from "@components/Library/text/Text";
import Button from "@components/Library/button/Button";
import { ButtonType, ButtonVariant, ButtonSize } from "@constants/button";
import {
  ProjectBoxContainer,
  ProjectImageContainer,
  ProjectImage,
  ProjectTitle,
  DeleteIconWrapper,
} from "./ProjectBoxStyles";
import { IconName } from "@constants/icon";
import { TextSize } from "@constants/text";
import { Project } from "@/context/useProjectContext";

interface ProjectBoxProps {
  project: Project;
  clicked?: boolean;
  disabled?: boolean;
  onSelect: (id: string,name:string) => void;
  onDelete: (id: string) => void;
}

const ProjectBox = React.forwardRef<HTMLDivElement, ProjectBoxProps>(
  ({ project, clicked = false, onSelect, onDelete, disabled = false }, ref) => {
    project.imageUrl = "images/project.jpg";
    return (
      <ProjectBoxContainer
        ref={ref}
        $clicked={clicked}
        onClick={() => onSelect(project.id,project.projectName)}
        $disabled={disabled}
      >
        <DeleteIconWrapper>
          <Button
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.TERTIARY}
            size={ButtonSize.XS}
            icon={IconName.TRASH}
            onClick={(event) => {
              event.stopPropagation();
              onDelete(project.id);
            }}
          />
        </DeleteIconWrapper>
        <ProjectImageContainer>
          <ProjectImage src={project.imageUrl} alt={project.projectName} />
        </ProjectImageContainer>
        <ProjectTitle>
          <Text size={TextSize.TEXT2} $cursorStyle="pointer">
            {project.projectName}
          </Text>
        </ProjectTitle>
      </ProjectBoxContainer>
    );
  }
);

ProjectBox.displayName = "ProjectBox";

export default ProjectBox;
