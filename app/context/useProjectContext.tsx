"use client"
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface ProjectContextType {
  currentProject: string | null;
  setCurrentProject: (project: string | null) => void;
  projects: any[];
  setProjects: (projects: any[]) => void;
  editorMode: boolean;
  setEditorMode: (mode: boolean) => void;

}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [editorMode, setEditorMode] = useState<boolean>(false);


  const value: ProjectContextType = {
    projects,
    setProjects,
    currentProject,
    setCurrentProject,
    editorMode,
    setEditorMode,

  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};