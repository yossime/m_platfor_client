import styled from 'styled-components';
import { NAVBAR_HEIGHTS, MEDIA_QUERIES } from '@constants/screenSizes';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 658px;
  height: calc(100vh - ${NAVBAR_HEIGHTS.LAPTOP});
  gap: 24px;
  padding: 64px, 0px, 64px, 0px;
  margin: ${NAVBAR_HEIGHTS.LAPTOP} auto 0;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: #DEDCFF transparent;

 

 

  /* @media ${MEDIA_QUERIES.LAPTOP} {
    width: 80%;
    height: calc(100vh - ${NAVBAR_HEIGHTS.LAPTOP});
    margin: ${NAVBAR_HEIGHTS.LAPTOP} auto 0;
    padding: 15px;
    gap: 15px;
  }

  @media ${MEDIA_QUERIES.TABLET} {
    width: 90%;
    height: calc(100vh - ${NAVBAR_HEIGHTS.TABLET});
    margin-top: ${NAVBAR_HEIGHTS.TABLET};
    padding: 10px;
    gap: 10px;
  }

  @media ${MEDIA_QUERIES.MOBILE} {
    width: 95%;
    height: calc(100vh - ${NAVBAR_HEIGHTS.MOBILE});
    margin-top: ${NAVBAR_HEIGHTS.MOBILE};
    padding: 10px;
    gap: 10px;
  }

  @media ${MEDIA_QUERIES.SMALL_MOBILE} {
    width: 98%;
    height: calc(100vh - ${NAVBAR_HEIGHTS.SMALL_MOBILE});
    margin-top: ${NAVBAR_HEIGHTS.SMALL_MOBILE};
    padding: 5px;
    gap: 5px;
  }

  @media ${MEDIA_QUERIES.TV} {
    width: 40%;
    max-width: 1800px;
    height: calc(100vh - ${NAVBAR_HEIGHTS.TV});
    margin-top: ${NAVBAR_HEIGHTS.TV};
    padding: 30px;
    gap: 30px;
  } */
`;

export const IndexContainer = styled.div`
  width: 580px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
/* 
  @media ${MEDIA_QUERIES.LAPTOP} {
    margin-bottom: 15px;
  }

  @media ${MEDIA_QUERIES.TABLET} {
    margin-bottom: 10px;
  }

  @media ${MEDIA_QUERIES.MOBILE} {
    margin-bottom: 10px;
  }

  @media ${MEDIA_QUERIES.TV} {
    max-width: 1400px;
    margin-bottom: 40px;
  } */
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  flex-shrink: 0;

  /* overflow-y: auto; */

/* 
  @media ${MEDIA_QUERIES.LAPTOP} {
    gap: 20px;
  }

  @media ${MEDIA_QUERIES.TABLET} {
    gap: 15px;
  }

  @media ${MEDIA_QUERIES.MOBILE} {
    gap: 10px;
  }

  @media ${MEDIA_QUERIES.TV} {
    gap: 40px;
  } */
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* max-width: 900px; */
  /* padding: 25px; */
  text-align: center;
  gap: 16px;
  flex-shrink: 0;
  
  /* @media ${MEDIA_QUERIES.LAPTOP} {
    padding: 15px;
    gap: 15px;
  }

  @media ${MEDIA_QUERIES.TABLET} {
    padding: 10px;
    gap: 10px;
  }

  @media ${MEDIA_QUERIES.MOBILE} {
    padding: 10px;
    gap: 8px;
  }

  @media ${MEDIA_QUERIES.TV} {
    max-width: 1200px;
    padding: 35px;
    gap: 25px;
  } */
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 100%;
  flex-shrink: 0;
  margin-bottom: 20px;

  @media ${MEDIA_QUERIES.LAPTOP} {
    gap: 20px;
  }
  
  @media ${MEDIA_QUERIES.TABLET} {
    gap: 15px;
    padding: 10px 0;
  }

  @media ${MEDIA_QUERIES.MOBILE} {
    gap: 10px;
    padding: 10px 0;
  }

  @media ${MEDIA_QUERIES.TV} {
    gap: 40px;
    padding: 35px 0;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;