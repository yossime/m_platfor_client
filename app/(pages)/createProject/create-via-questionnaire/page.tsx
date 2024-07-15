"use client"
import CreateProjectViaQuestionnaire from './Questionnaire'
import { QuestionnaireProvider } from '@context/useQuestionnaire';

const Questionnaire = () => {
    return (
        <>
        <QuestionnaireProvider>
        <CreateProjectViaQuestionnaire/>
        </QuestionnaireProvider>
        </>
    );
};

export default Questionnaire;