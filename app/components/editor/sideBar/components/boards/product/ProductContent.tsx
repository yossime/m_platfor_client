import React, { useState } from "react";
import { Container } from "../../general/CommonStyles";
import {
  BoardType,
  ContentDataType,
  FormatBoard,
} from "@/components/editor/types/index";
import ProductListSidebar from "./ProductListSidebar";
import { useSidebarContext } from "@/context/SidebarContext ";
import { ChooseBoardFormat } from "../../general/FormatBoard";
import { ContentInput } from "../../general/GenericBoardComponents";

export const ProductContentComponent: React.FC = () => {
  const {showformatBoard} = useSidebarContext()

  return (
    <>
      {showformatBoard ? (
        <ChooseBoardFormat boardType={BoardType.Product} />
      ) : (
        <Container>
          <ContentInput
            type={ContentDataType.TITLE}
            placeholder="Site Name"
            label="Title"
          />
          <ProductListSidebar />
        </Container>
      )}
    </>
  );
};
