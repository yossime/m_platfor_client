import React, { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step, TooltipRenderProps } from "react-joyride";

export interface TourStep extends Step {
  title?: string;
}

interface JoyrideComponentProps {
  isEnabled: boolean;
  steps: TourStep[];
}

const CustomProgressDots: React.FC<{ stepIndex: number; stepCount: number }> = ({ stepIndex, stepCount }) => {
  return (
    <div className="joyride-tooltip-progress-container">
      {Array.from({ length: stepCount }).map((_, index) => (
        <div
          key={index}
          className={`joyride-tooltip-progress-dot ${index === stepIndex ? 'active' : ''}`}
        />
      ))}
    </div>
  );
};

const JoyrideComponent: React.FC<JoyrideComponentProps> = ({ isEnabled, steps }) => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (isEnabled) {
      setRun(true);
    } else {
      setRun(false);
    }
  }, [isEnabled]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      localStorage.setItem("hasSeenEditorTour", "true");
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={run}
      scrollToFirstStep={false}
      disableScrolling={false}
      disableOverlay
      showProgress
      showSkipButton
      steps={steps}
      locale={{ last: 'Let\'s Go!' }}
      styles={{
        options: {
          arrowColor: "#594DED",
          backgroundColor: "#594DED",
          primaryColor: "#ffffff",
          textColor: "#ffffff",
          zIndex: 1000,
        },
        tooltipContainer: {
          textAlign: "left",
          color: "#ffffff",
          fontSize: 14,
          fontWeight: 400,
          lineHeight: "20px",
        },
        buttonNext: {
          backgroundColor: "#ffffff",
          color: "#594DED",
          borderRadius: "4px",
          padding: "8px 16px",
        },
        buttonBack: {
          marginRight: 10,
          color: "#ffffff",
        },
        buttonSkip: {
          color: "#ffffff",
        },

      }}
    />
  );
};

export default JoyrideComponent;





// import React, { useEffect, useState } from "react";
// import Joyride, {
//   CallBackProps,
//   STATUS,
//   Step,
//   TooltipRenderProps,
// } from "react-joyride";
// import "./styles.css";
// import Button from "./Library/button/Button";
// import { ButtonSize, ButtonType, ButtonVariant } from "@constants/button";

// export interface TourStep extends Step {
//   title?: string;
// }

// interface JoyrideComponentProps {
//   isEnabled: boolean;
//   steps: TourStep[];
// }

// const CustomProgressDots: React.FC<{
//   stepIndex: number;
//   stepCount: number;
// }> = ({ stepIndex, stepCount }) => {
//   return (
//     <div className="joyride-tooltip-progress-container">
//       {Array.from({ length: stepCount }).map((_, index) => (
//         <div
//           key={index}
//           className={`joyride-tooltip-progress-dot ${index === stepIndex ? "active" : ""}`}
//         />
//       ))}
//     </div>
//   );
// };

// const JoyrideComponent: React.FC<JoyrideComponentProps> = ({
//   isEnabled,
//   steps,
// }) => {
//   const [run, setRun] = useState(false);

//   useEffect(() => {
//     if (isEnabled) {
//       setRun(true);
//     } else {
//       setRun(false);
//     }
//   }, [isEnabled]);

//   const handleJoyrideCallback = (data: CallBackProps) => {
//     const { status } = data;

//     if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
//       setRun(false);
//       localStorage.setItem("hasSeenEditorTour", "true");
//     }
//   };

//   const renderTooltip = (renderProps: TooltipRenderProps) => {
//     const {
//       primaryProps,
//       backProps,
//       skipProps,
//       continuous,
//       index,
//       step,
//       isLastStep,
//     } = renderProps;
//     return (
//       <div className="joyride-tooltip">
//         <div className="joyride-tooltip-content">{step.content}</div>
//         <div className="joyride-tooltip-footer">
//           <button {...skipProps} style={{ color: "#ffffff" }}>
//             Skip
//           </button>
//           {index > 0 && (
//             <Button
//               type={ButtonType.PRIMARY}
//               variant={ButtonVariant.PRIMARY}
//               size={ButtonSize.MEDIUM}
//               text="Bake"
//               {...backProps}
//             />
//           )}
//           <Button
//             type={ButtonType.PRIMARY}
//             variant={ButtonVariant.PRIMARY}
//             size={ButtonSize.MEDIUM}
//             text={isLastStep ? "Let's Go!" : "Next"}
//             {...primaryProps}
//           />
//         </div>
//       </div>
//     );
//   };

//   return (
//     <Joyride
//       callback={handleJoyrideCallback}
//       continuous
//       hideCloseButton
//       run={run}
//       scrollToFirstStep={false}
//       disableScrolling={false}
//       disableOverlay
//       showProgress
//       showSkipButton
//       steps={steps}
//       locale={{ last: "Let's Go!" }}
//       tooltipComponent={renderTooltip}
//       styles={{
//         options: {
//           arrowColor: "#594DED",
//           backgroundColor: "#594DED",
//           primaryColor: "#ffffff",
//           textColor: "#ffffff",
//           zIndex: 1000,
//         },
//         tooltipContainer: {
//           textAlign: "left",
//           color: "#ffffff",
//           fontSize: 14,
//           fontWeight: 400,
//           lineHeight: "20px",
//         },
//       }}
//     />
//   );
// };

// export default JoyrideComponent;
