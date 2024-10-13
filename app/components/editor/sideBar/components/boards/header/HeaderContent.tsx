import React, { useEffect, useState } from "react";
import { Container, Divider } from "../../general/CommonStyles";

import DataObfuscator from "@/components/Library/general/DataObfuscator";
import {
  BoardType,
  ContentDataType,
  FormatBoard,
} from "@/components/editor/types/index";
import { useBoardContent } from "../../general/useBoardContent";
import { useSidebarContext } from "@/context/SidebarContext ";
import {
  ContentImageLine,
  ContentInput,
  ContentModelUpload,
} from "../../general/GenericBoardComponents";
import { ChooseBoardFormat } from "../../general/FormatBoard";
import TextSettings from "@/components/editor/editText/EditText";

export const HeaderContentComponent: React.FC = () => {
  const { getFormat } = useBoardContent();
  const { showformatBoard } = useSidebarContext();
  const [formatBoard, setFormatBoard] = useState<FormatBoard | null>(null);
  const [showEditText, setShowEditText] = useState<boolean>(false);

  const [openSections, setOpenSections] = useState({
    title: true,
    subtitle: true,
    image: true,
    button: true,
    logo: true,
    model: true,
    material: true,
  });

  const handleSectionToggle =
    (section: keyof typeof openSections) => (isOpen: boolean) => {
      setOpenSections((prev) => ({ ...prev, [section]: isOpen }));
    };

  useEffect(() => {
    const fetchFormat = async () => {
      if (!formatBoard) {
        const format = await getFormat();
        setFormatBoard(format);
      }
    };
    fetchFormat();
  }, [showformatBoard, formatBoard]);

  return (
    <>
      {showformatBoard ? (
        <ChooseBoardFormat boardType={BoardType.Header} />
      ) : (
        <Container>
          {showEditText && <TextSettings dataType={ContentDataType.TITLE} />}
          {formatBoard === FormatBoard.Frame && (
            <>
              <DataObfuscator
                title="Image"
                isOpen={openSections.image}
                onToggle={handleSectionToggle("image")}
              >
                <ContentImageLine type={ContentDataType.FRAME} />
              </DataObfuscator>
              <Divider />
            </>
          )}
          {formatBoard === FormatBoard.Model && (
            <>
              <DataObfuscator
                title="Model"
                isOpen={openSections.model}
                onToggle={handleSectionToggle("model")}
              >
                <ContentModelUpload type={ContentDataType.FRAME} />
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
          <DataObfuscator
            title="Logo"
            isOpen={openSections.logo}
            onToggle={handleSectionToggle("logo")}
          >
            <ContentImageLine type={ContentDataType.LOGO} />
          </DataObfuscator>
        </Container>
      )}
    </>
  );
};
