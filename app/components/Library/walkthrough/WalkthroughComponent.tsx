import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

export interface TourStep extends Step {
  title?: string;
}

interface JoyrideComponentProps {
  isEnabled: boolean;
  steps: TourStep[];
}


const WalkthroughComponent: React.FC<JoyrideComponentProps> = ({ isEnabled, steps }) => {
  const [run, setRun] = useState(false);
  const { user } = useAuth();

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
      localStorage.setItem( `${user?.uid}hasSeenEditorTour`, "true");
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

export default WalkthroughComponent;


