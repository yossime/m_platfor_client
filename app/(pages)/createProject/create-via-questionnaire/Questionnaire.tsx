import QuestionnaireContainer from '@/components/questionnaire/questionnaireContainer/QuestionnaireContainer'
import ButtonsContainer from '@/components/questionnaire/buttonsContainer/ButtonsContainer'
import Questionnaire from '@/components/questionnaire/Questionnaire'
import QuestionnaireIndexContainer from '@/components/questionnaire/questionnaireIndexContainer/QuestionnaireIndexContainer'


const CreateProjectViaQuestionnaire = () => {

    return (
        <Questionnaire>
            <QuestionnaireIndexContainer />
            <QuestionnaireContainer />
            <ButtonsContainer />
        </Questionnaire>

    );
};

export default CreateProjectViaQuestionnaire;