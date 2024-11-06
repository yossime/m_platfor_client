"use client"

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Container,
  ContainerGlobalStyle,
  Divider,
} from "../general/CommonStyles";
import Text from "@/components/Library/text/Text";
import { InputMode, InputSize } from "@constants/input";
import { useEditor } from "@/context/useEditorContext";
import {
  ContentDataType,
  ContentMaterial,
} from "@/components/editor/types";
import { SelectInputMaterial } from "@/components/editor/material/SelectInputMaterial";
import { SelectInput } from "../general/SelectInput";
import { useBoardContent } from "../general/useBoardContent";
import { getLandscapesName } from "@/services/landscape.service";
import { getarchitecturesName } from "@/services/architectures.service";
import { getHdrisName } from "@/services/hdri.service";
import { useEnvironmentContext } from "@/context/EnvironmentContext";


const SectionComponent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  width: 100%;
  gap: 4px;
`;



export const GlobalComponent: React.FC = () => {

  const { loadTextureByName } = useEnvironmentContext();

  const { sceneModel } = useEditor();
  const { setContentMaterial } = useBoardContent();
  const [landscapes, setLandscapes] = useState<string[]>([]);
  const [architectures, setArchitectures] = useState<string[]>([]);
  const [hdris, setHdris] = useState<string[]>([]);



  useEffect(() => {
    const fetchLandscapes = async () => {
      const data = await getHdrisName();
      if (data.files) {
        setHdris(data.files);
      }
    };
    fetchLandscapes();
  }, []);

  useEffect(() => {
    const fetchLandscapes = async () => {
      const data = await getLandscapesName();
      if (data.files) {
        setLandscapes(data.files);
      }
    };
    fetchLandscapes();
  }, []);

  useEffect(() => {
    const fetchLandscapes = async () => {
      const data = await getarchitecturesName();
      if (data.files) {
        setArchitectures(data.files);
      }
    };
    fetchLandscapes();
  }, []);


  const handlchangeArchitecture = (architectures:string) => {
    if (sceneModel?.root?.architecture) {
      sceneModel.root.changeArchitecture(architectures);
    }
  };


  const handlchangeLandscape = (landscape:string) => {
    if (sceneModel?.root?.architecture) {
      sceneModel.root.changeLandscape(landscape);
    }
  };

  const handlchangehdri = (hdri:string) => {
    loadTextureByName(hdri);
  };


  const handleMaterialChange = (material: ContentMaterial) => {
    setContentMaterial(ContentDataType.SELF, material);
  };


  return (
    <Container>
      <ContainerGlobalStyle>
        <SectionComponent>
          <Text>Sky</Text>
          <SelectInput
            optionList={hdris}
            onChange={handlchangehdri}
            inputSize={InputSize.SMALL}
            mode={InputMode.DEFAULT}
            placeholder="Sky"
            fullWidth={true}
          />
        </SectionComponent>
        <Divider />
        <SectionComponent>
          <Text>Architecture</Text>
          <SelectInput
            optionList={architectures}
            onChange={handlchangeArchitecture}
            inputSize={InputSize.SMALL}
            mode={InputMode.DEFAULT}
            placeholder="Architecture"
            fullWidth={true}
          />
          <SelectInputMaterial
            onChange={handleMaterialChange}
            inputSize={InputSize.SMALL}
            mode={InputMode.DEFAULT}
            placeholder="Material"
            fullWidth={true}
          />
        </SectionComponent>
        <Divider />
        <SectionComponent>
          <Text>Landscape</Text>
          <SelectInput
            optionList={landscapes}
            onChange={handlchangeLandscape}
            inputSize={InputSize.SMALL}
            mode={InputMode.DEFAULT}
            placeholder="Landscape"
            fullWidth={true}
          />
        </SectionComponent>
        <Divider />
        <SectionComponent>
          <Text>Text</Text>
          <SelectInputMaterial
            value={""}
            onChange={handleMaterialChange}
            inputSize={InputSize.SMALL}
            mode={InputMode.DEFAULT}
            placeholder="text"
            fullWidth={true}
          />
          <SelectInputMaterial
            value={""}
            onChange={handleMaterialChange}
            inputSize={InputSize.SMALL}
            mode={InputMode.DEFAULT}
            placeholder="text"
            fullWidth={true}
          />
        </SectionComponent>
      </ContainerGlobalStyle>
    </Container>
  );
};
