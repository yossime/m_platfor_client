import styled from 'styled-components';
import { SCREEN_SIZES, MEDIA_QUERIES, NAVBAR_HEIGHTS }  from '@constants/screenSizes';

export const Container = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media ${MEDIA_QUERIES.LAPTOP} {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    width: 80%;
    margin-top: ${NAVBAR_HEIGHTS.LAPTOP};
    max-height: calc(100vh - ${NAVBAR_HEIGHTS.LAPTOP});
    overflow-y: auto;
  }

  @media ${MEDIA_QUERIES.TABLET} {
    width: 90%;
    margin-top: ${NAVBAR_HEIGHTS.TABLET};
  }

  @media ${MEDIA_QUERIES.MOBILE} {
    width: 95%;
    margin-top: ${NAVBAR_HEIGHTS.MOBILE};
  }

  @media ${MEDIA_QUERIES.SMALL_MOBILE} {
    width: 98%;
    margin-top: ${NAVBAR_HEIGHTS.SMALL_MOBILE};
  }
`;

export const ProjectGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;

  @media ${MEDIA_QUERIES.LAPTOP} {
    gap: 24px;
  }

  @media ${MEDIA_QUERIES.MOBILE} {
    gap: 20px;
  }

  @media ${MEDIA_QUERIES.SMALL_MOBILE} {
    gap: 16px;
  }
`;

export const ContentWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 56px 0;

  @media ${MEDIA_QUERIES.LAPTOP} {
    padding: 20px 0;
  }

  @media ${MEDIA_QUERIES.TABLET} {
    padding: 32px 0;
  }

  @media ${MEDIA_QUERIES.MOBILE} {
    padding: 24px 0;
  }

  @media ${MEDIA_QUERIES.SMALL_MOBILE} {
    padding: 16px 0;
  }
`;

export const ErrorMessage = styled.div`
  margin-bottom: 20px;

  @media ${MEDIA_QUERIES.LAPTOP} {
    margin-bottom: 16px;
  }

  @media ${MEDIA_QUERIES.MOBILE} {
    margin-bottom: 14px;
  }

  @media ${MEDIA_QUERIES.SMALL_MOBILE} {
    margin-bottom: 12px;
  }
`;