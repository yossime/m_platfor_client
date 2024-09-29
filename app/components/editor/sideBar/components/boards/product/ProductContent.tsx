import React, { useState } from "react";
import { Container } from "../../CommonStyles";
import { ContentInput } from "../../GenericBoardComponents";
import {
  BoardType,
  ContentDataType,
  FormatBoard,
} from "@/components/editor/types/index";
import ProductListSidebar from "./ProductListSidebar";
import { ChooseBoardFormat } from "../../FormatBoard";
import { useBoardContent } from "../../useBoardContent";

export const ProductContentComponent: React.FC = () => {
  const { getFormat } = useBoardContent();
  const [formatBoard, setFormatBoard] = useState<FormatBoard | null>(
    getFormat()
  );

  return (
    <>
      {formatBoard === null ? (
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
