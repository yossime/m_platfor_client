import styled from "styled-components";
import { motion } from "framer-motion";

export const IndexContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

export const IndexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  max-width: 1200px;
`;

export const StageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;


export const Connector = styled.div`
  width: 20px;
  height: 1px;
  background-color: gray;
`;
export const StageIndicator = styled(motion.div)<{
  $status: "current" | "notCurrent";
}>`
  height: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => 
    props.$status === "current" ? "#594DED" : "#D9D9D9"
  };
`;

export const getMotionProps = ($status: "current" | "notCurrent") => {
  return {
    initial: { width: "24px" },
    animate: {
      width: $status === "current" ? "88px" : "24px",
    },
    transition: { duration: 0.6, ease: "easeInOut" },
  };
};
