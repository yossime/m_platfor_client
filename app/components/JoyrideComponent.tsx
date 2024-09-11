import React, { useState, useEffect } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

export interface TourStep extends Step {
  title?: string;
}

interface JoyrideComponentProps {
  isEnabled: boolean;
  steps: TourStep[];
}

const JoyrideComponent: React.FC<JoyrideComponentProps> = ({
  isEnabled,
  steps,
}) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(2);

  useEffect(() => {
    if (isEnabled) {
      setRun(true);
    } else {
      setRun(false);
    }
  }, [isEnabled]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status } = data;
  
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      localStorage.setItem("hasSeenEditorTour", "true");
    } else if (action === "next" && index < steps.length - 1) {
      setStepIndex(index + 1);
    } else if (action === "prev" && index > 0) {
      setStepIndex(index - 1);
    }
  };
  


  return (
<Joyride
  callback={handleJoyrideCallback}
  continuous
  hideCloseButton
  run={run}
  scrollToFirstStep={false}
  disableScrolling={true}
  showProgress
  stepIndex={stepIndex}
  steps={steps}
  styles={{
    options: {
      arrowColor: "#594DED",
      backgroundColor: "#594DED",
      overlayColor: "rgba(0, 0, 0, 0.5)",
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
