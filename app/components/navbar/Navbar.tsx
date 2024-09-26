"use client";
import React, { useState } from "react";
import {
  ButtonType,
  ButtonVariant,
  ButtonSize,
  ButtonMode,
} from "@constants/button";
import LogoIcon from "./LogoIcon.svg";
import {
  NavbarWrapper,
  NavbarContainer,
  LogoContainer,
  UserContainer,
} from "./NavbarStyles";
import UserAvatar from "./UserAvatar";
import EditorButtons from "./EditorButton";
import Button from "../Library/button/Button";
import { IconName } from "@constants/icon";
import Tooltip from "../Library/general/Tooltip";
import { usePathname, useRouter } from "next/navigation";
import { useUserContext } from "@/context/useUserContext";

interface NavbarProps {
  userName?: string | null;
  onSignOut?: () => void;
  logo: any | null;
  imageUrl?: string | null;
}

const Navbar: React.FC<NavbarProps> = ({
  logo = null,
  userName,
  onSignOut,
  imageUrl,
}) => {
  const router = useRouter();

  const handlePlus = () => {
    router.push("/pricing_plans");
  };
  const pathname = usePathname() ?? "";
  const isSubscriptionPage = pathname.startsWith("/pricing_plans");
  const isEditorPage = pathname.startsWith("/editor");
  const { userData } = useUserContext();

  return (
    <NavbarWrapper className="navbar">
      <NavbarContainer>
        <LogoContainer>{logo != null ? logo : <LogoIcon />}</LogoContainer>
        <UserContainer>
          {isEditorPage && <EditorButtons />}{" "}
          {userName && (
            <>
              {!isSubscriptionPage && (
                <Tooltip
                  content={
                    "Click here to upgrade account or review pricing plans"
                  }
                >
                  <Button
                    type={ButtonType.PRIMARY}
                    variant={ButtonVariant.TERTIARY}
                    size={ButtonSize.SMALL}
                    icon={IconName.SKECHLOGO}
                    text="Get Plus"
                    onClick={handlePlus}
                  />
                </Tooltip>
              )}
              <UserAvatar
                onSignOut={onSignOut}
                name={userName}
                size={40}
                imageUrl={imageUrl}
              />
            </>
          )}
        </UserContainer>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
