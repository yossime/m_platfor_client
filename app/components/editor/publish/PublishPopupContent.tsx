"use client"

import React, { useState } from "react";
import Text from "@components/Library/text/Text";
import { FontFamily, FontWeight, TextSize } from "@constants/text";
import styled from "styled-components";
import Button from "@/components/Library/button/Button";
import { IconName } from "@constants/icon";
import Input from "@/components/Library/input/Input";
import { useRouter } from "next/navigation";
import { InputMode } from "@constants/input";
import { publishSubdomain } from "@/services/publish.service ";
import { useUserContext } from "@/context/useUserContext";

const DomainOption = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 16px;
  height: 120px;
  padding: 16px 24px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ selected }) => (selected ? "#f0f0f0" : "transparent")};
  cursor: pointer;
  border-radius: 8px;
`;

const SelectionCircle = styled.div<{ selected: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 3px solid ${({ selected }) => (selected ? "blue" : "gray")};
  background-color: ${({ selected }) => (selected ? "blue" : "transparent")};
`;

const OptionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const PublishPopupContent: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<"mocart" | "connect">(
    "mocart"
  );
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const { userData } = useUserContext();
  const handlePublishClick = () => {
    router.push(`dashboard/domain?domain=${encodeURIComponent(inputValue)}`);
  };

  const handleContinueClick = async () => {
    if (userData?.uid) {
      const res = await publishSubdomain(userData?.uid, inputValue);
    }
  };

  return (
    <>
      <DomainOption
        selected={selectedDomain === "mocart"}
        onClick={() => setSelectedDomain("mocart")}
      >
        <SelectionCircle selected={selectedDomain === "mocart"} />
        <OptionContent>
          <Text size={TextSize.TEXT1}>
            Publish using a free Mocart.io domain
          </Text>
          <Input
            mode={
              selectedDomain !== "mocart"
                ? InputMode.DISABLED
                : InputMode.NORMAL
            }
            onChange={(e) => setInputValue(e.target.value)}
          />
        </OptionContent>
      </DomainOption>

      <DomainOption
        selected={selectedDomain === "connect"}
        onClick={() => setSelectedDomain("connect")}
      >
        <SelectionCircle selected={selectedDomain === "connect"} />
        <OptionContent>
          <Text size={TextSize.TEXT1}>Connect a domain you own!</Text>
          <Input
            mode={
              selectedDomain !== "connect"
                ? InputMode.DISABLED
                : InputMode.NORMAL
            }
            onChange={(e) => setInputValue(e.target.value)}
          />
        </OptionContent>
      </DomainOption>

      <ActionButtonContainer>
        <Button
          onClick={
            selectedDomain === "mocart"
              ? handlePublishClick
              : handleContinueClick
          }
          icon={selectedDomain === "mocart" ? IconName.EXPORT : undefined}
          text={selectedDomain === "mocart" ? "Publish" : "Continue"}
        />
      </ActionButtonContainer>
    </>
  );
};

export default PublishPopupContent;
