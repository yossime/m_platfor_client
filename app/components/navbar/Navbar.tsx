
"use client"
import React from 'react';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode } from '@constants/button';
import LogoIcon from './LogoIcon.svg';
import {
  NavbarWrapper,
  NavbarContainer,
  LogoContainer,
  UserContainer,
} from './NavbarStyles';
import UserAvatar from './UserAvatar';  // Import the new UserAvatar component
import EditorButtons from './EditorButton';
import Button from '../Library/button/Button';
import { IconName } from '@constants/icon';
import Tooltip from '../Library/general/Tooltip';

interface NavbarProps {
  userName?: string | null;
  onSignOut?: () => void;
  logo: any | null;
  imageUrl?: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ logo = null, userName, onSignOut, imageUrl }) => {
  return (
    <NavbarWrapper className='navbar'>
      <NavbarContainer>
        <LogoContainer>
          {logo != null ? logo : <LogoIcon />}
        </LogoContainer>
        <UserContainer>
          <EditorButtons/>
          {userName && 
          <>
          <Tooltip content={"Click here to upgrade account or review pricing plans"}>
          <Button
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.TERTIARY}
          size={ButtonSize.SMALL}
          icon={IconName.SKECHLOGO}
          text="Get Plus"
          onClick={() => console.log('Get Plus clicked')}
          />
          </Tooltip>
          <UserAvatar name={userName} size={40} imageUrl={imageUrl} />
          </>
          }   
        </UserContainer>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default Navbar;