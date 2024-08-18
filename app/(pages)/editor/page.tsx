"use client"
import React, { useEffect } from 'react';
import EditorComponent from "@/components/editor/EditorComponent";
import { useProject } from '@/context/useProjectContext';

// const API = 'http://localhost:3500';

const Editor: React.FC = () => {
  const { setEditorMode } = useProject();

  useEffect(() => {
    // Set editor mode to true when the component mounts
    setEditorMode(true);

    // Optionally, set editor mode to false when the component unmounts
    return () => {
      setEditorMode(false);
    };
  }, [setEditorMode]);

  return (
    <EditorComponent />
  );
}

export default Editor;