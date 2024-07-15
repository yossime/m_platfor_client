"use client"
import React, { createContext, useState, ReactNode, useContext } from 'react';


interface ProjectContextType {
  currentProject: string| null;
  setCurrentProject: (project: string | null) => void;
  dataParameters: any;
  setDataParameters: (dataParameters: any) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);


export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentProject, setCurrentProject] = useState<string | null>(null);
    const [dataParameters, setDataParameters] = useState<any>(null);



  const value = {
    currentProject,
    setCurrentProject,
    dataParameters,
    setDataParameters,
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
