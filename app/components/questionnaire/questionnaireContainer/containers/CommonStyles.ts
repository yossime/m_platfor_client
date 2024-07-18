// import styled from 'styled-components';
// import {  NAVBAR_HEIGHTS, MEDIA_QUERIES } from '@constants/screenSizes';

// export const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
//   width: 50%;
//   height: 100%;
//   gap:20px;
//   padding:20px;

//   /* background-color: gold; */

//   margin: ${NAVBAR_HEIGHTS.DESKTOP} auto 0; 

//   @media  ${NAVBAR_HEIGHTS.DESKTOP}{
//     margin: ${NAVBAR_HEIGHTS.DESKTOP} auto 0; 
//     height: calc(100vh - ${NAVBAR_HEIGHTS.DESKTOP}); 
//   }

//   @media ${MEDIA_QUERIES.LAPTOP} {
//     margin: ${NAVBAR_HEIGHTS.LAPTOP} auto 0; 
//     height: calc(100vh - ${NAVBAR_HEIGHTS.LAPTOP}); 
//     width: 60%;
//   }

//   @media ${MEDIA_QUERIES.TABLET} {
//     width: 70%;
//     height: calc(100vh - ${NAVBAR_HEIGHTS.TABLET});
//     margin-top: ${NAVBAR_HEIGHTS.TABLET};
//   }

//   @media ${MEDIA_QUERIES.MOBILE} {
//     width: 85%;
//     height: calc(100vh - ${NAVBAR_HEIGHTS.MOBILE});
//     margin-top: ${NAVBAR_HEIGHTS.MOBILE};
//   }

//   @media ${MEDIA_QUERIES.SMALL_MOBILE} {
//     width: 95%;
//     height: calc(100vh - ${NAVBAR_HEIGHTS.SMALL_MOBILE});
//     margin-top: ${NAVBAR_HEIGHTS.SMALL_MOBILE};
//   }

//   @media ${MEDIA_QUERIES.TV} {
//     width: 40%;
//     max-width: 1800px;
//     height: calc(100vh - ${NAVBAR_HEIGHTS.TV});
//     margin-top: ${NAVBAR_HEIGHTS.TV};
//   }
// `;

// export const IndexContainer = styled.div`
//   width: 100%;
//   height: 30px;
//   max-width: 1000px;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   @media ${MEDIA_QUERIES.TABLET} {
//     margin-bottom: 25px;
//   }

//   @media ${MEDIA_QUERIES.MOBILE} {
//     margin-bottom: 20px;
//   }

//   @media ${MEDIA_QUERIES.TV} {
//     max-width: 1400px;
//     margin-bottom: 40px;
//   }
// `;

// export const ContentWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 30px;
//   overflow: auto;
//   height: 100%;

//   max-height: calc(100vh - ${NAVBAR_HEIGHTS.DESKTOP} - 100px); // Adjust 100px as needed

//   @media ${MEDIA_QUERIES.TABLET} {
//     gap: 25px;
//     max-height: calc(100vh - ${NAVBAR_HEIGHTS.TABLET} - 90px);
//   }

//   @media ${MEDIA_QUERIES.MOBILE} {
//     gap: 20px;
//     max-height: calc(100vh - ${NAVBAR_HEIGHTS.MOBILE} - 80px);
//   }

//   @media ${MEDIA_QUERIES.TV} {
//     gap: 40px;
//     max-height: calc(100vh - ${NAVBAR_HEIGHTS.TV} - 120px);
//   }
// `;

// export const TextContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   max-width: 900px;
//   padding:  25px;
//   text-align: center;
//   gap:20px;
//   flex-shrink: 0;
  
//   @media ${MEDIA_QUERIES.TABLET} {
//     padding: 20px;
//     gap: 12px;
//   }

//   @media ${MEDIA_QUERIES.MOBILE} {
//     padding: 15px;
//     gap: 10px;
//   }

//   @media ${MEDIA_QUERIES.TV} {
//     max-width: 1200px;
//     padding: 35px;
//     gap: 25px;
//   }
// `;

// export const ItemsContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   align-items: center;
//   justify-content: center;
//   gap: 30px;
//   flex-shrink: 0;

  
//   @media ${MEDIA_QUERIES.TABLET} {
//     gap: 25px;
//     padding: 20px 0;
//   }

//   @media ${MEDIA_QUERIES.MOBILE} {
//     gap: 20px;
//     padding: 15px 0;
//   }

//   @media ${MEDIA_QUERIES.TV} {
//     gap: 40px;
//     padding: 35px 0;
//   }
// `;
import styled from 'styled-components';
import { NAVBAR_HEIGHTS, MEDIA_QUERIES } from '@constants/screenSizes';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 50%;
  height: calc(100vh - ${NAVBAR_HEIGHTS.DESKTOP});
  gap: 20px;
  padding: 20px;
  margin: ${NAVBAR_HEIGHTS.DESKTOP} auto 0;
  overflow-y: auto;
   /* Webkit browsers (Chrome, Safari, newer versions of Opera) */
   &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #E3E1FF; /* Sky blue color */
    border-radius: 20px;
    border: 9px solid transparent;
    background-clip: content-box;
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #87CEEB transparent;

 

  /* Show custom scrollbar for IE and Edge */
  &::-ms-scrollbar {
    width: 10px;
  }

  &::-ms-scrollbar-track {
    background: transparent;
  }

  &::-ms-scrollbar-thumb {
    background-color: #87CEEB;
    border-radius: 50px;
  }

  @media ${MEDIA_QUERIES.LAPTOP} {
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
  }
`;

export const IndexContainer = styled.div`
  width: 100%;
  height: 30px;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

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
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  flex-shrink: 0;

  /* overflow-y: auto; */


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
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  padding: 25px;
  text-align: center;
  gap: 20px;
  flex-shrink: 0;
  
  @media ${MEDIA_QUERIES.LAPTOP} {
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
  }
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
  max-width: 50vw; // 50% of the viewport width
  display: flex;
  justify-content: center;
`;