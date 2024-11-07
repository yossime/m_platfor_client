"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProject } from "@/context/useProjectContext";
import { useAuth } from "@/context/AuthContext";
import {
  fetchProjects,
  fetchProject,
  deleteProject,
} from "@/services/projectService";
import Text from "@components/Library/text/Text";
import {
  Container,
  ErrorMessage,
  TextContainer,
  ItemsContainer,
} from "./ProjectListStyles";
import CreateProjectBox from "../Library/boxes/projectBox/createProjectBox/CreateProjectBox";
import ProjectBox from "../Library/boxes/projectBox/projectBox/ProjectBox";
import { FontFamily, FontWeight, TextSize } from "@constants/text";
import { TextColor } from "@constants/colors";


const ProjectList: React.FC = () => {
  const {currentProject, setCurrentProject, projects, setProjects } = useProject();
  const [error, setError] = useState<string>("");

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const loadProjects = async () => {
      if (!user?.uid) return;
      try {
        const fetchedProjects = await fetchProjects(user.uid);
        setProjects(fetchedProjects);
      } catch (error) {
        setError("Error fetching projects");
        console.error(error);
      }
    };

    loadProjects();
  }, [user, setProjects]);


  const selectProject = async (projectId: string, projectName:string) => {
    // router.push("/editor");
    router.push("/editor");
    setCurrentProject({id:projectId,projectName:projectName});
    try {
      const project = await fetchProject(projectId, user?.uid as string);
      // console.log(project)
    } catch (error) {
      console.error("Error selecting project:", error);
      setError("Failed to select project");
    }
  };

  const handleCreateProject = () => {
    router.push("createProject/create-via-questionnaire");
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!user) return;

    try {
      await deleteProject(projectId, user);
      setProjects(projects.filter((project) => project.id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
      setError("Failed to delete project");
    }
  };

  const hasProjects = projects.length > 0;
  return (
    <Container>

      <TextContainer>

        <Text
          size={TextSize.H2}
          $weight={FontWeight.NORMAL}
          color={TextColor.SECONDARY_TEXT}
          $family={FontFamily.Poppins}
        >
          {hasProjects
            ? `Welcome Back ${user?.displayName || "User"}!`
            : "Let's get started!"}
        </Text>
        <Text
          size={TextSize.D1}
          $weight={FontWeight.SEMI_BOLD}
          color={TextColor.PRIMARY_TEXT}
          $family={FontFamily.Poppins}
        >
          {hasProjects ? "My Web Spaces" : "Start creating your 3D web space"}
        </Text>
      </TextContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ItemsContainer>
        <CreateProjectBox onClick={handleCreateProject} text="New Project" />

        <CreateProjectBox
          disabled={true}
          onClick={() => {
          }}
          text="Create with URL"
        />
        <CreateProjectBox
          disabled={true}
          onClick={() => {
          }}
          text="Create with AI"
          />
          
        {projects.map((project,index) => (
            <ProjectBox
            key={project.id ?? `project-${index}`}
            project={project}
              onSelect={selectProject}
              onDelete={handleDeleteProject}
              />
        ))}
      </ItemsContainer>
    </Container>
  );
};

export default ProjectList;
