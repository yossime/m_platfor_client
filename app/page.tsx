"use client";

import { StyleSheetManager } from 'styled-components';
import LoginPage from "@pages//login/page";
import isPropValid from '@emotion/is-prop-valid';


export default function Home() {


  return (
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <LoginPage />
      </StyleSheetManager>
  );
}


