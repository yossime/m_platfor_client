// 'use client';

// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import dynamic from 'next/dynamic';
// import styled from 'styled-components';
// import { CallBackProps, STATUS, Step } from 'react-joyride';

// const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

// export interface TourStep extends Step {
//   title?: string;
// }

// const StyledButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 16px;
//   margin-top: 20px;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// interface JoyrideComponentProps {
//   isEnabled: boolean;
//   steps: TourStep[];
// }

// const JoyrideComponent: React.FC<JoyrideComponentProps> = ({ isEnabled, steps }) => {
//   const [tourState, setTourState] = useState({
//     run: true,
//     stepIndex: 0,
//     tourCompleted: false
//   });

//   const [stepsReady, setStepsReady] = useState(false);
//   const joyrideRef = useRef(null);

//   useEffect(() => {
//     const tourCompleted = localStorage.getItem('tourCompleted') === 'true';
//     setTourState(prevState => ({ ...prevState, tourCompleted }));

//     const checkStepsReady = () => {
//       const allTargetsMounted = steps.every(step => document.querySelector(step.target as string));
//       setStepsReady(allTargetsMounted);
//     };

//     checkStepsReady();

//     const interval = setInterval(checkStepsReady, 1000);

//     return () => clearInterval(interval);
//   }, [steps]);

//   useEffect(() => {
//     if (isEnabled && !tourState.tourCompleted && stepsReady) {
//       setTourState(prevState => ({ ...prevState, run: true }));
//     }
//   }, [isEnabled, stepsReady, tourState.tourCompleted]);

//   const handleJoyrideCallback = useCallback((data: CallBackProps) => {
//     const { status, index } = data;
//     const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

//     if (finishedStatuses.includes(status)) {
//       setTourState(prevState => ({ ...prevState, run: false, tourCompleted: true }));
//       localStorage.setItem('tourCompleted', 'true');
//     } else {
//       setTourState(prevState => ({ ...prevState, stepIndex: index || 0 }));
//     }
//   }, []);

//   const startTour = () => {
//     localStorage.removeItem('tourCompleted');
//     setTourState({ run: true, stepIndex: 0, tourCompleted: false });
//   };

//   return (
//     <>
//       {stepsReady && (
//         <Joyride
//           // ref={joyrideRef}
//           steps={steps}
//           run={tourState.run}
//           stepIndex={tourState.stepIndex}
//           // continuous
//           // showProgress
//           // showSkipButton
//           // disableOverlayClose
//           // disableScrolling
//           // callback={handleJoyrideCallback}
//           styles={{
//             options: {
//               primaryColor: '#007bff',
//               zIndex: 1000,
//               textColor: '#333',
//             },
//             tooltipContainer: {
//               textAlign: 'left' as const,
//             },
//             buttonNext: {
//               backgroundColor: '#007bff',
//             },
//             buttonBack: {
//               marginRight: 10,
//             },
//           }}
//         />
//       )}
//       {/* {tourState.tourCompleted && (
//         <StyledButton onClick={startTour}>Restart Tour</StyledButton>
//       )} */}
//     </>
//   );
// };

// export default JoyrideComponent;



'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { CallBackProps, STATUS, Step } from 'react-joyride';

const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

export interface TourStep extends Step {
  title?: string;
}


interface JoyrideComponentProps {
  isEnabled: boolean;
  steps: TourStep[];
}

const JoyrideComponent: React.FC<JoyrideComponentProps> = ({ isEnabled, steps }) => {
  const [tourState, setTourState] = useState({
    run: true,
    stepIndex: 0,
    tourCompleted: false
  });

  const [stepsReady, setStepsReady] = useState(false);
  // const joyrideRef = useRef(null);

  useEffect(() => {
    const tourCompleted = localStorage.getItem('tourCompleted') === 'true';
    setTourState(prevState => ({ ...prevState, tourCompleted }));

    const checkStepsReady = () => {
      const allTargetsMounted = steps.every(step => document.querySelector(step.target as string));
      setStepsReady(allTargetsMounted);
    };

    checkStepsReady();

    const interval = setInterval(checkStepsReady, 1000);

    return () => clearInterval(interval);
  }, [steps]);

  useEffect(() => {
    if (isEnabled && !tourState.tourCompleted && stepsReady) {
      setTourState(prevState => ({ ...prevState, run: true }));
    }
  }, [isEnabled, stepsReady, tourState.tourCompleted]);

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    // const { status, index } = data;
    // const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    // if (finishedStatuses.includes(status)) {
    //   setTourState(prevState => ({ ...prevState, run: false, tourCompleted: true }));
    //   localStorage.setItem('tourCompleted', 'true');
    // } else {
    //   setTourState(prevState => ({ ...prevState, stepIndex: index || 0 }));
    // }
  }, []);


  return (
    <>
      {stepsReady && (
        <Joyride
          // ref={joyrideRef}
          steps={steps}
          run={tourState.run}
          stepIndex={tourState.stepIndex}
          continuous
          showProgress
          showSkipButton
          disableOverlayClose
          disableScrolling
          // callback={handleJoyrideCallback}
          styles={{
            options: {
              primaryColor: '#007bff',
              zIndex: 1000,
              textColor: '#333',
            },
            tooltipContainer: {
              textAlign: 'left' as const,
            },
            buttonNext: {
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '5px',
              position: 'absolute',
              bottom: '20px',
              right: '20px',
            },
            buttonBack: {
              marginRight: 10,
              position: 'absolute',
              bottom: '20px',
              left: '20px',
            },
            buttonSkip: {
              position: 'absolute',
              bottom: '20px',
              left: '20px',
            },
          }}
        />
      )}
  
    </>
  );
};

export default JoyrideComponent;
