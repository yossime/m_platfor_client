"use client"
import React, { useEffect } from 'react';
import EditorComponent from "@/components/editor/EditorComponent";
import { useProject } from '@/context/useProjectContext';


const Editor: React.FC = () => {
  const { setEditorMode } = useProject();

  useEffect(() => {
    setEditorMode(true);
    return () => {
      setEditorMode(true);
    };
  }, [setEditorMode]);

  return (
    <>
    <EditorComponent />
    </>
  );
}

export default Editor;