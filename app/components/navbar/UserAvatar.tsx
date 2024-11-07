import { FontFamily } from "@constants/text";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Library/button/Button";
import { ButtonSize, ButtonType, ButtonVariant } from "@constants/button";
import SignUpPopup from "../Library/general/SingUpPopup";
import ValidatedImage from "./ValidateImage";

interface UserAvatarProps {
  name: string;
  onSignOut?: () => void;
  size?: number;
  backgroundColor?: string;
  color?: string;
  imageUrl?: string | null;
}

interface AvatarContainerProps {
  $size: number;
  $backgroundColor: string;
}

const AvatarContainer = styled.div<AvatarContainerProps>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.$backgroundColor};
  background-color: ${(props) => props.$backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-family: ${FontFamily.Figtree};
  cursor: pointer;
  overflow: hidden;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 200px;
`;

const AvatarText = styled.span<{ $size: number; $color: string }>`
  font-size: ${(props) => props.$size / 3}px;
  color: ${(props) => props.$color};
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  imageUrl = "",
  size = 40,
  backgroundColor = "#1a73e8",
  color = "#ffffff",
  onSignOut,
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <AvatarContainer
      $size={size}
      $backgroundColor={backgroundColor}
      onClick={() => setShowPopup(!showPopup)}
    >
      {/* <ValidatedImage src={imageUrl} alt={name}  fallback={<AvatarText $size={size} $color={color}>
{initials}
</AvatarText>}/> */}
      {imageUrl ? (
        <AvatarImage src={imageUrl} alt={name} />
      ) : (
        <AvatarText $size={size} $color={color}>
          {initials}
        </AvatarText>
      )}
      {showPopup && (
        <SignUpPopup onClose={() => setShowPopup(false)}>
          <UserContainer>
            <Button
              size={ButtonSize.SMALL}
              type={ButtonType.PRIMARY}
              variant={ButtonVariant.PRIMARY}
              text="Sign out"
              onClick={onSignOut}
            />
          </UserContainer>
        </SignUpPopup>
      )}
    </AvatarContainer>
  );
};

export default UserAvatar;
