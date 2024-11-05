
import { QuestionnaireProvider } from '@context/useQuestionnaire';
import React from 'react';


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (

    <QuestionnaireProvider>
        {children}
    </QuestionnaireProvider>

  );
};


export default Layout;
