"use client"
import React from 'react';
import { ButtonType, ButtonVariant, ButtonSize, ButtonMode } from '@constants/button';
import Text from '@components/Library/text/Text';
import LogoIcon from './LogoIcon.svg';
import {
  NavbarWrapper,
  NavbarContainer,
  LogoContainer,
  UserContainer,
  WelcomeText
} from './NavbarStyles';
import Button from '../button/Button';
import { FontFamily, FontWeight, TextSize } from '@constants/text';
import { TextColor } from '@constants/colors';

interface NavbarProps {
  userName?: string | null;
  onSignOut?: () => void;
  logo: any | null;
}

const Navbar: React.FC<NavbarProps> = ({ logo = null, userName, onSignOut }) => {

  return (
    <NavbarWrapper>
      <NavbarContainer>
        <LogoContainer>
          {logo != null ? logo : <LogoIcon />}
        </LogoContainer>
        <UserContainer>
          {userName && (
            <WelcomeText>
              <Text
                size={TextSize.TEXT1}
                weight={FontWeight.NORMAL}
                color={TextColor.PRIMARY_TEXT}
                family={FontFamily.Figtree}
              >
                Welcome, {userName}
              </Text>
            </WelcomeText>
          )}
          {userName &&
            <Button
              type={ButtonType.PRIMARY}
              variant={ButtonVariant.SECONDARY}
              size={ButtonSize.SMALL}
              text="Sign out"
              onClick={onSignOut || (() => console.log('Sign out clicked'))}
            />
          }

        </UserContainer>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default Navbar;