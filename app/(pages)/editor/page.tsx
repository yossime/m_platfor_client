"use client"

import { useEffect } from "react";
import { useEditor } from "@/context/useEditorContext";
import { IParams } from '@/components/editor/interface/paramsType';
import EditorComponent from "@/components/editor/EditorComponent";


const Editor: React.FC = () => {
  const { setDataParameters } = useEditor();

  // useEffect(() => {
  //   const dataParameters: IParams = {
  //     architecture: 'Barbiz',
  //     materialParams: {},
  //     maxSlot: 5,
  //     boards: Array(5).fill({ type: null, name: null })
  //   };

  //   setDataParameters(dataParameters);
  // }, [setDataParameters]);

  return (

    <EditorComponent/>

  );
}

export default Editor;