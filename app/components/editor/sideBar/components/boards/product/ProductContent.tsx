import React, { useState } from "react";
import { Container } from "../../CommonStyles";
import { ContentInput } from "../../GenericBoardComponents";
import { ContentDataType, FormatBoard } from "@/components/editor/types/index";
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
        <ChooseBoardFormat
          formatBoard={formatBoard}
          setFormatBoard={setFormatBoard}
        />
      ) : (
        <Container>
          <ContentInput
            type={ContentDataType.TITLE}
            placeholder="Site Name"
            label="Title"
          />
          <ProductListSidebar
          />

          {/* <DisplayList /> */}
        </Container>
      )}
    </>
  );
};
