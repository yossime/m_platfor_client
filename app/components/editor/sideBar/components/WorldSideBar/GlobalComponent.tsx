
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useEnvironmentContext } from "@/context/EnvironmentContext";
import { Container, ContainerStyle } from "../general/CommonStyles";
import { TextSize, FontWeight } from "@constants/text";
import { BackgroundColor } from "@constants/colors";
import Text from "@/components/Library/text/Text";
import Icon from "@/components/Library/icon/Icon";
import { IconName } from "@constants/icon";
import DataObfuscator from "@/components/Library/general/DataObfuscator";
import { SelectInputSky } from "./SelectInputEnv";
import { InputMode, InputSize } from "@constants/input";

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${BackgroundColor.PRIMARY_BACKGROUND};
  padding: 10px;
  margin-bottom: 8px;
  &:hover {
    background-color: ${BackgroundColor.PRIMARY_BACKGROUND_HOVER};
  }
`;

const ItemImage = styled.img`
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 8px;
`;

const SectionTitle = styled(Text)`
  font-weight: ${FontWeight.SEMI_BOLD};
  font-size: ${TextSize.TEXT2};
`;

export const GlobalComponent: React.FC = () => {


  return (
    <Container>
      
      <ContainerStyle>

          <SelectInputSky
            label="Sky"
          />

      </ContainerStyle>
    </Container>
  );
};
