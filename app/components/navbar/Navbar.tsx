
"use client"
import React from 'react';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode } from '@constants/buttton';
import { handleSignOut } from '@/services/login';
import Button from '../Library/button/Button';
import Text from '@components/Library/text/Text';
import Logo from './LogoIcon.svg';
import { useAuth } from '@/context/AuthContext';  
import {
  NavbarWrapper,
  NavbarContainer,
  LogoContainer,
  UserContainer,
  WelcomeText
} from './NavbarStyles';

const Navbar = () => {
  const { user } = useAuth();

  function setError(error: string): void {
    console.error('Sign out error:', error);
  }

  return (
    <NavbarWrapper>
      <NavbarContainer>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <UserContainer>
          {user && (
            <WelcomeText>
              <Text size="TEXT1" weight="NORMAL" color="primary_text">
                Welcome, {user.displayName || user.email}
              </Text>
            </WelcomeText>
          )}
          <Button
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.SMALL}
            mode={ButtonMode.NORMAL}
            text="Sign out"
            onClick={() => handleSignOut(setError)}
          />
        </UserContainer>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default Navbar;