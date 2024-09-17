import React, { useState } from "react";
import { Container, Divider } from "../../CommonStyles";
import {
  ContentInput,
  ContentMatrielUpload,
} from "../../GenericBoardComponents";
import DataObfuscator from "@/components/Library/general/DataObfuscator";
import { ContentDataType } from "@/components/editor/types/index";
import { ChooseBoardFormat, FormatBoard } from "../../FormatBoard";
import { useBoardContent } from "../../useBoardContent";

export const ImageContentComponent: React.FC = () => {
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
      {formatBoard === null ? (
        <ChooseBoardFormat
          formatModel={false}
          formatBoard={formatBoard}
          setFormatBoard={setFormatBoard}
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
                <ContentMatrielUpload type={ContentDataType.IMAGE} />
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
