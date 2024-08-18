// "use client"
// import React, { createContext, useState, ReactNode, useContext } from 'react';

// interface ProjectContextType {
//   currentProject: string | null;
//   setCurrentProject: (project: string | null) => void;
//   projects: any[];
//   setProjects: (projects: any[]) => void;
//   editorMode: boolean;
//   setEditorMode: (mode: boolean) => void;

// }

// const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [currentProject, setCurrentProject] = useState<string | null>(null);
//   const [projects, setProjects] = useState<any[]>([]);
//   const [editorMode, setEditorMode] = useState<boolean>(false);


//   const value: ProjectContextType = {
//     projects,
//     setProjects,
//     currentProject,
//     setCurrentProject,
//     editorMode,
//     setEditorMode,

//   };

//   return (
//     <ProjectContext.Provider value={value}>
//       {children}
//     </ProjectContext.Provider>
//   );
// }

// export const useProject = () => {
//   const context = useContext(ProjectContext);
//   if (context === undefined) {
//     throw new Error('useProject must be used within a ProjectProvider');
//   }
//   return context;
// };




"use client"
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface ProjectContextType {
  currentProject: string | null;
  setCurrentProject: (project: string | null) => void;
  projects: any[];
  setProjects: (projects: any[]) => void;
  editorMode: boolean;
  setEditorMode: (mode: boolean) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const STORAGE_KEY = 'currentProject';

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const savedProject = localStorage.getItem(STORAGE_KEY);
      return savedProject ? JSON.parse(savedProject) : null;
    }
    return null;
  });

  const [projects, setProjects] = useState<any[]>([]);
  const [editorMode, setEditorMode] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentProject));
    }
  }, [currentProject]);

  const value: ProjectContextType = {
    currentProject,
    setCurrentProject,
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
}

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};