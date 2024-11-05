

"use client";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

export interface Project {
  projectName: string;
  id: string;
  imageUrl?: string;
  isActive?: boolean;
}

interface ProjectContextType {
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  // editorMode: boolean;
  // setEditorMode: (mode: boolean) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const CURRENT_PROJECT_STORAGE_KEY = "currentProject";
const PROJECTS_STORAGE_KEY = "projects";

const getFromLocalStorage = (key: string) => {
  if (typeof window === "undefined") return null;
  const savedItem = localStorage.getItem(key);
  try {
    return savedItem ? JSON.parse(savedItem) : null;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return null;
  }
};

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(() =>
    getFromLocalStorage(CURRENT_PROJECT_STORAGE_KEY)
  );

  const [projects, setProjects] = useState<Project[]>(() =>
    getFromLocalStorage(PROJECTS_STORAGE_KEY) || []
  );

  // const [editorMode, setEditorMode] = useState<boolean>(false);

  useEffect(() => {
    if (currentProject !== null) {
      localStorage.setItem(
        CURRENT_PROJECT_STORAGE_KEY,
        JSON.stringify(currentProject)
      );
    }
  }, [currentProject]);

  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    }
  }, [projects]);

  const value = {
    currentProject,
    setCurrentProject,
    projects,
    setProjects,
    // editorMode,
    // setEditorMode,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
