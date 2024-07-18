// screenSizes.ts

// Screen breakpoints
export const SCREEN_SIZES = {
    SMALL_MOBILE: '320px',
    MOBILE: '480px',
    TABLET: '768px',
    LAPTOP: '1024px',
    DESKTOP: '1200px',
    LARGE_DESKTOP: '1440px',
    TV: '1920px',
  };
  
  // Navbar heights for different screen sizes
  export const NAVBAR_HEIGHTS = {
    SMALL_MOBILE: '36px',
    MOBILE: '40px',
    TABLET: '50px',
    LAPTOP: '55px',
    DESKTOP: '60px',
    TV: '80px',
  };
  
  // Media queries
  export const MEDIA_QUERIES = {
    SMALL_MOBILE: `(max-width: ${SCREEN_SIZES.SMALL_MOBILE})`,
    MOBILE: `(max-width: ${SCREEN_SIZES.MOBILE})`,
    TABLET: `(max-width: ${SCREEN_SIZES.TABLET})`,
    LAPTOP: `(max-width: ${SCREEN_SIZES.LAPTOP})`,
    DESKTOP: `(max-width: ${SCREEN_SIZES.DESKTOP})`,
    LARGE_DESKTOP: `(max-width: ${SCREEN_SIZES.LARGE_DESKTOP})`,
    TV: `(min-width: ${SCREEN_SIZES.TV})`,
  };