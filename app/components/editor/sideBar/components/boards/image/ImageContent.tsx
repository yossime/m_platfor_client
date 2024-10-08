import React, { useState } from "react";
import { Container, Divider } from "../../general/CommonStyles";

import DataObfuscator from "@/components/Library/general/DataObfuscator";
import { BoardType, ContentDataType, FormatBoard } from "@/components/editor/types/index";
import { useBoardContent } from "../../general/useBoardContent";
import { useSidebarContext } from "@/context/SidebarContext ";
import { ContentImageUpload, ContentInput } from "../../general/GenericBoardComponents";
import { ChooseBoardFormat } from "../../general/FormatBoard";

export const ImageContentComponent: React.FC = () => {
  const {showformatBoard} = useSidebarContext()

  const { getFormat } = useBoardContent();
  const [formatBoard, setFormatBoard] = useState<FormatBoard | null>(
    getFormat()
  );

  const [openSections, setOpenSections] = useState({
    title: true,
    subtitle: true,
    image: true,
    button: true,
    logo: true,
    model: true,
  });

  const handleSectionToggle =
    (section: keyof typeof openSections) => (isOpen: boolean) => {
      setOpenSections((prev) => ({ ...prev, [section]: isOpen }));
    };

  return (
    <>
      {showformatBoard  ? (
        <ChooseBoardFormat
        boardType={BoardType.Image}
        />
      ) : (
        <Container>
          {formatBoard === FormatBoard.Frame && (
            <>
              <DataObfuscator
                title="Image"
                isOpen={openSections.image}
                onToggle={handleSectionToggle("image")}
              >
                <ContentImageUpload type={ContentDataType.FRAME} />
              </DataObfuscator>
              <Divider />
            </>
          )}
          <DataObfuscator
            title="Title"
            isOpen={openSections.title}
            onToggle={handleSectionToggle("title")}
          >
            <ContentInput
              type={ContentDataType.TITLE}
              placeholder="Enter title"
            />
          </DataObfuscator>

          <DataObfuscator
            title="Subtitle"
            isOpen={openSections.subtitle}
            onToggle={handleSectionToggle("subtitle")}
          >
            <ContentInput
              type={ContentDataType.SUB_TITLE}
              placeholder="Enter subtitle"
            />
          </DataObfuscator>

          <DataObfuscator
            title="Button"
            isOpen={openSections.button}
            onToggle={handleSectionToggle("button")}
          >
            <ContentInput
              type={ContentDataType.BUTTON}
              placeholder="Get Started!"
            />
            <ContentInput
              type={ContentDataType.BUTTON}
              placeholder="Destination URL"
            />
          </DataObfuscator>
          <Divider />
        </Container>
      )}
    </>
  );
};
