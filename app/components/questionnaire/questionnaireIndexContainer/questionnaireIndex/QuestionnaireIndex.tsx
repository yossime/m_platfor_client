// import React from 'react';
// import styles from './questionnaireIndex.module.css';
// import { useQuestionnaireIndex, QuestionnaireStatus } from '@context/useQuestionnaire';

// // Map enum to array of values
// const enumValues = Object.values(QuestionnaireStatus);

// const QuestionnaireIndex = () => {
//   const { currentIndex } = useQuestionnaireIndex();

//   return (
//     <div className={styles.questionnaireIndex}>
//       {enumValues.map((status, index) => (
//         <React.Fragment key={status}>
//           <div className={styles.vIconParent}>
//             {/* <img className={styles.vIcon} alt="" src="V Icon.svg" /> */}
//             <div className={`${styles.stageFrameDisabled} ${currentIndex === status ? styles.stageFrameActive : ''}`}>
//               <div className={styles.step}>{status.replace(/Questionnaire/, '')}</div>
//             </div>
//           </div>
//           {index < enumValues.length - 1 && (
//             <div className={styles.questionnaireIndexInner}>
//               {/* <img className={styles.frameChild} alt="" src="Vector 104.svg" /> */}
//             </div>
//           )}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };

// export default QuestionnaireIndex;





// QuestionnaireIndex.tsx
import React from 'react';
import { useQuestionnaireIndex, QuestionnaireStatus } from '@context/useQuestionnaire';
import Text from '@components/Library/text/Text';
import {
  IndexWrapper,
  StageWrapper,
  StageFrame,
  Connector,
  ConnectorLine
} from './QuestionnaireIndexStyles';

const enumValues = Object.values(QuestionnaireStatus);

const QuestionnaireIndex: React.FC = () => {
  const { currentIndex } = useQuestionnaireIndex();

  return (
    <IndexWrapper>
      {enumValues.map((status, index) => (
        <React.Fragment key={status}>
          <StageWrapper>
            <StageFrame isActive={currentIndex === status}>
              <Text 
                size="TEXT2" 
                weight={currentIndex === status ? "BLOB" : "NORMAL"}
                color={currentIndex === status ? "primary_text" : "secondary_text"}
              >
                {status.replace(/Questionnaire/, '')}
              </Text>
            </StageFrame>
          </StageWrapper>
          {index < enumValues.length - 1 && (
            <Connector>
              <ConnectorLine />
            </Connector>
          )}
        </React.Fragment>
      ))}
    </IndexWrapper>
  );
};

export default QuestionnaireIndex;