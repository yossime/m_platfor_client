import React from 'react';
import styled from 'styled-components';
import Text from '@components/Library/text/Text';
import { FontWeight, TextSize } from '@constants/text';
import { TextColor } from '@constants/colors';
// import LogoGoogl from '/logo_google_g_icon.svg';
interface GoogleLoginButtonProps {
    onClick: () => void;
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  background-color: #1877F2;
  border: 1px solid #dadce0;
  border-radius: 4px;
  text-align:center;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #0060B9;
  }

  &:focus {
    outline: none;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
  }

`;


const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onClick }) => {
    return (
        <StyledButton onClick={onClick}>
            <Text size={TextSize.TEXT2} $weight={FontWeight.BOLD}
                color={TextColor.TEXT_ON_PRIMARY}>Continue with Google</Text>
        </StyledButton>
    );
};

export default GoogleLoginButton;