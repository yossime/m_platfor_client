import styled from 'styled-components';
import { SCREEN_SIZES, NAVBAR_HEIGHTS, MEDIA_QUERIES } from '@constants/screenSizes';

export const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  color: #0e0000;
  z-index: 1000;
  height: ${NAVBAR_HEIGHTS.LAPTOP};
/* 
  @media ${MEDIA_QUERIES.TABLET} {
    height: ${NAVBAR_HEIGHTS.TABLET};
  }
  @media ${MEDIA_QUERIES.LAPTOP} {
    height: ${NAVBAR_HEIGHTS.LAPTOP};
  }


  @media ${MEDIA_QUERIES.MOBILE} {
    height: ${NAVBAR_HEIGHTS.MOBILE};
  }

  @media ${MEDIA_QUERIES.SMALL_MOBILE} {
    height: ${NAVBAR_HEIGHTS.SMALL_MOBILE};
  }

  @media ${MEDIA_QUERIES.TV} {
    height: ${NAVBAR_HEIGHTS.TV};
  } */
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  /* max-width: ${SCREEN_SIZES.DESKTOP}; */
  margin: 0 auto;
  padding: 0 20px;

  /* @media ${MEDIA_QUERIES.TABLET} {
    padding: 0 15px;
  }

  @media ${MEDIA_QUERIES.MOBILE} {
    padding: 0 10px;
  }

  @media ${MEDIA_QUERIES.SMALL_MOBILE} {
    padding: 0 5px;
  }

  @media ${MEDIA_QUERIES.TV} {
    max-width: ${SCREEN_SIZES.TV};
    padding: 0 40px;
  } */
`;

export const LogoContainer = styled.div`
  flex: 1;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const WelcomeText = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    display: none; 
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const NavButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 14px;
  }
`;