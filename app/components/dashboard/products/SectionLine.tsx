import React from "react";
import styled from "styled-components";
import Input from "@/components/Library/input/Input";
import Collapsible from "@/components/Library/general/Collapsible";
import Icons from "./Icons";

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

interface SectionLineProps {
  id: string;
  title: string;
  body: string;
  isVisible: boolean;
  setSections: React.Dispatch<React.SetStateAction<any[]>>;
}

const SectionLine: React.FC<SectionLineProps> = ({
  id,
  title,
  body,
  isVisible,
  setSections,
}) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, title: e.target.value } : section
      )
    );
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, body: e.target.value } : section
      )
    );
  };

  const handleDelete = () => {
    setSections((prevSections) => prevSections.filter((section) => section.id !== id));
  };

  const handleToggleVisibility = () => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, isVisible: !section.isVisible } : section
      )
    );
  };

  return (
    <SectionContainer>
      <Collapsible title={title}>
        <Input
          label="Title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Section Title"
        />
        <Input
          label="Body"
          type="text"
          value={body}
          onChange={handleBodyChange}
          placeholder="Section Body"
        />
      </Collapsible>
      <Icons
        onDelete={handleDelete}
        onToggleVisibility={handleToggleVisibility}
        isVisible={isVisible}
      />
    </SectionContainer>
  );
};

export default SectionLine;
