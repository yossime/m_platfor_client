// ProjectList.tsx
"use client"

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useProject } from '@/context/useProjectContext';
import { useAuth } from '@/context/AuthContext';
import { fetchProjects, fetchProject } from '@/services/projectService';
import Text from '@components/Library/text/Text';
import { 
  Container, 
  ProjectGrid, 
  ProjectCube, 
  CreateProjectCube, 
  ProjectTitle,
  ProjectDetails,
  ErrorMessage 
} from './ProjectListStyles';

const ProjectList: React.FC = () => {
  const { setCurrentProject, setDataParameters } = useProject();
  const [projects, setProjects] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const loadProjects = async () => {
      if (!user?.uid) return;
      try {
        const fetchedProjects = await fetchProjects(user.uid);
        setProjects(fetchedProjects);
      } catch (error) {
        setError('Error fetching projects');
        console.error(error);
      }
    };

    loadProjects();
  }, [user]);

  const selectProject = async (projectId: string) => {
    try {
      const project = await fetchProject(projectId, user?.uid as string);
      setCurrentProject(projectId);
      setDataParameters(project.data)
      router.push('/editor');
    } catch (error) {
      console.error('Error selecting project:', error);
      setError('Failed to select project');
    }
  };

  const handleCreateProject = () => {
    router.push('createProject/create-via-questionnaire');
    console.log('Create new project');
  };

  return (
    <Container>
      {error && (
        <ErrorMessage>
          <Text size="TEXT1" weight="NORMAL" color="negative">{error}</Text>
        </ErrorMessage>
      )}
      <ProjectGrid>
        <CreateProjectCube onClick={handleCreateProject}>
          <Text size="TEXT1" weight="NORMAL" color="primary_text">Create Project</Text>
        </CreateProjectCube>
        {projects.map(project => (
          <ProjectCube key={project.id} onClick={() => selectProject(project.id)}>
            <ProjectTitle>
              <Text size="TEXT1" weight="SEMIBLOB" color="primary_text">{project.projectName}</Text>
            </ProjectTitle>
            <ProjectDetails>
              <Text size="TEXT2" weight="NORMAL" color="secondary_text">{project.projectDetails}</Text>
            </ProjectDetails>
          </ProjectCube>
        ))}
      </ProjectGrid>
    </Container>
  );
};

export default ProjectList;