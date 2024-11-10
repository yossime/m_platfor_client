"use client"
import React, { useRef, useState } from "react";
import { Container } from "../general/CommonStyles";
import Popup from "@/components/Library/general/Popup";
import Button from "@/components/Library/button/Button";
import { ButtonSize, ButtonType, ButtonVariant } from "@constants/button";
import { AddModelMenu } from "./modelMenu";
import { IconName } from "@constants/icon";

export const ModelLocal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const parentRef = useRef(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);


  return (
    <Container ref={parentRef}>
       <Button
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.LARGE}
          text="Add model"
          icon={IconName.PLUS}
          onClick={handleOpen}
        />
      {isOpen && (
        <Popup  isCentered={false} onClose={handleClose} closeButton={false}  parentRef={parentRef} height={292} width={216}>
          <AddModelMenu/>
        </Popup>
      )}
    </Container>
  );
};




