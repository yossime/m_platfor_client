import React, { ChangeEvent, useState } from "react";
import Input from "@/components/Library/input/Input";
import { InputMode, InputSize } from "@constants/input";
import {
  Container,
  Divider,
  SubContainer,
  SubWrapper,
} from "../../CommonStyles";
import DataObfuscator from "@/components/Library/general/DataObfuscator";
import Collapsible from "@/components/Library/general/Collapsible";
import { FontWeight, TextSize } from "@constants/text";
import Text from "@/components/Library/text/Text";
import styled from "styled-components";
import { ContentInput, ContentInputForm } from "../../GenericBoardComponents";
import { ContentDataType, InputLabelType } from "@/components/editor/types";

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

type FieldType =
  | "Name"
  | "Email"
  | "Phone Number"
  | "Company Name"
  | "Free text";

interface IField {
  type: FieldType;
  label: string;
  placeholder: string;
}

interface IForm {
  title: string | null;
  subtitle: string | null;
  button: string | null;
  emailsubject: string | null;
  fields: IField[];
}

const getDefaultFieldProps = (
  type: FieldType
): { label: string; placeholder: string } => {
  switch (type) {
    case "Name":
      return { label: InputLabelType.NAME, placeholder: "Enter your name here" };
    case "Email":
      return { label: InputLabelType.EMAIL, placeholder: "Enter your email here" };
    case "Phone Number":
      return { label: InputLabelType.PHONE_NUMBER, placeholder: "Enter your phone number" };
    case "Company Name":
      return { label: InputLabelType.COMPANY_NAME, placeholder: "Enter your Company Name" };
    case "Free text":
      return { label: InputLabelType.FREE_TEXT, placeholder: "How can we help you?" };
  }
};

export const FormContentComponent: React.FC = () => {
  const [form, setForm] = useState<IForm>({
    title: "Contact Us",
    subtitle: "Ask us anything you want!",
    button: "Submit!",
    emailsubject: "",
    fields: [
      { type: "Name", ...getDefaultFieldProps("Name") },
      { type: "Email", ...getDefaultFieldProps("Email") },
      { type: "Phone Number", ...getDefaultFieldProps("Phone Number") },
      { type: "Company Name", ...getDefaultFieldProps("Company Name") },
      { type: "Free text", ...getDefaultFieldProps("Free text") },
    ],
  });
  const [openSections, setOpenSections] = useState({
    title: true,
    subtitle: true,
    button: true,
    emailsubject: true,
  });

  const handleSectionToggle =
    (section: keyof typeof openSections) => (isOpen: boolean) => {
      setOpenSections((prev) => ({ ...prev, [section]: isOpen }));
      if (!isOpen) {
        setForm((prev) => ({ ...prev, [section]: null }));
      }
    };

  const handleInputChange =
    (field: keyof IForm) => (event: ChangeEvent<HTMLInputElement>) => {
      console.log("handle", event.target.value);
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };



  return (
    <Container>
      <DataObfuscator
        title="Email subject"
        isOpen={openSections.emailsubject}
        onToggle={handleSectionToggle("emailsubject")}
      >
        <ContentInput
          type={ContentDataType.EMAIL}
          placeholder="ENew message from a customer!"
        />
      </DataObfuscator>
      <Divider />
      <DataObfuscator
        title="Title"
        isOpen={openSections.title}
        onToggle={handleSectionToggle("title")}
      >
        <ContentInput type={ContentDataType.TITLE} placeholder="Enter title" />
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
      <SubWrapper>
        <Text weight={FontWeight.SEMI_BOLD} size={TextSize.TEXT2}>
          Fields
        </Text>
        <SubContainer>
          {form.fields.map((field, index) => (
            <React.Fragment key={index}>
              <Collapsible title={field.label}>
                <FieldWrapper>
                  <Text weight={FontWeight.SEMI_BOLD} size={TextSize.TEXT2}>
                    Place holder text
                  </Text>
                  <ContentInputForm
                    type={ContentDataType.FORM}
                    placeholder={field.placeholder}
                    label={field.label}
                  />
                </FieldWrapper>
              </Collapsible>
              <Divider />
            </React.Fragment>
          ))}
        </SubContainer>
      </SubWrapper>
      <DataObfuscator
        title="Button"
        isOpen={openSections.button}
        onToggle={handleSectionToggle("button")}
      >
        <Input
          inputSize={InputSize.SMALL}
          mode={form.button === "" ? InputMode.ERROR : InputMode.NORMAL}
          value={form.button || ""}
          onChange={handleInputChange("button")}
        />
      </DataObfuscator>
    </Container>
  );
};

// const [showPopup, setShowPopup] = useState(false);

// const addNewField = (type: FieldType) => {
//   setForm(prev => ({
//     ...prev,
//     fields: [...prev.fields, { type, ...getDefaultFieldProps(type) }]
//   }));
//   setShowPopup(false);

{
  /* {showPopup && (
        <Popup onClose={() => setShowPopup(false)}>
          <SubContainer>
            {(['Textual', 'Phone number', 'Email', 'Free text'] as const).map((type) => (
              <Button
                key={type}
                size={ButtonSize.SMALL}
                type={ButtonType.PRIMARY}
                variant={ButtonVariant.SECONDARY}
                text={type}
                onClick={() => addNewField(type)}
              />
            ))}
          </SubContainer>
        </Popup>
      )} */
}

{
  /* <Button
            size={ButtonSize.SMALL}
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.SECONDARY}
            text="Add Field"
            icon={IconName.PLUSCIRCLE}
            onClick={() => setShowPopup(true)}
          /> */
}

{
  /* <Button
                    size={ButtonSize.SMALL}
                    type={ButtonType.PRIMARY}
                    variant={ButtonVariant.SECONDARY}
                    text="Remove field"
                    icon={IconName.TRASH}
                    onClick={() => deleteField(index)}
                  /> */
}

// const deleteField = (index: number) => {
//   setForm(prev => ({
//     ...prev,
//     fields: prev.fields.filter((_, i) => i !== index)
//   }));
// };
{
  /* <Input
                    inputSize={InputSize.SMALL}
                    mode={InputMode.NORMAL}
                    label="Label"
                    value={field.label}
                    onChange={(e) => updateField(index, { label: e.target.value })}
                  /> */
}
