"use client"
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface ProjectContextType {
  currentProject: string | null;
  setCurrentProject: (project: string | null) => void;
  projectName: string | null;
  setProjectName: (project: string | null) => void;
  projects: any[];
  setProjects: (projects: any[]) => void;
  editorMode: boolean;
  setEditorMode: (mode: boolean) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const CURRENT_PROJECT_STORAGE_KEY = 'currentProject';
const PROJECT_NAME_STORAGE_KEY = 'projectName';

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const savedCurrentProject = localStorage.getItem(CURRENT_PROJECT_STORAGE_KEY);
      try {
        return savedCurrentProject ? JSON.parse(savedCurrentProject) : null;
      } catch (error) {
        console.error("Error parsing currentProject from localStorage:", error);
        return null;
      }
    }
    return null;
  });

  const [projectName, setProjectName] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const savedProjectName = localStorage.getItem(PROJECT_NAME_STORAGE_KEY);
      try {
        return savedProjectName ? JSON.parse(savedProjectName) : null;
      } catch (error) {
        console.error("Error parsing projectName from localStorage:", error);
        return null;
      }
    }
    return null;
  });

  const [projects, setProjects] = useState<any[]>([]);
  const [editorMode, setEditorMode] = useState<boolean>(false);

  // Save currentProject to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && currentProject !== null) {
      localStorage.setItem(CURRENT_PROJECT_STORAGE_KEY, JSON.stringify(currentProject));
    }
  }, [currentProject]);

  // Save projectName to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && projectName !== null) {
      localStorage.setItem(PROJECT_NAME_STORAGE_KEY, JSON.stringify(projectName));
    }
  }, [projectName]);

  const value: ProjectContextType = {
    currentProject,
    setCurrentProject,
    projectName,
    setProjectName,
    projects,
    setProjects,
    editorMode,
    setEditorMode,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
