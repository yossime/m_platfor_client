import {
  BackgroundColor,
  BorderColor,
  SemanticColors,
} from "@constants/colors";
import styled from "styled-components";

export const SubscriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;
`;

export const PaymentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 120px;
  padding-top: 60px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

export const ContentInputCard = styled.div`
  display: flex;
  width: 600px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

export const ContentInputCardInput = styled.div`
  display: flex;
  width: 600px;
  flex-direction: column;
  align-items: center;
  text-align : start;
  gap: 8px;
`;

export const ContentInputCardLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
`;

export const ContentSummeryPayment = styled.div`
  display: flex;
  min-width: 440px;
  top: 0;
  right: 0;
  flex-direction: column;
  align-items: self-start;
  justify-content: flex-start;
  text-align: start;
  gap: 24px;
  margin-bottom: 120px;
`;
export const ContentSummeryPaymentTitle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap:4px;
`;

export const ContentSummeryPaymentButton = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  gap:24px;
`;

export const ContentSummeryPaymentSecure = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap:4px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #e5e7eb;
`;

export const ContentPayment = styled.div`
  display: flex;
  flex-direction: row;
  gap: 120px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  gap: 16px;
  flex-shrink: 0;
`;

export const TextSummeryLine = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  text-align: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-grow: 1;
  width: 100%;
  padding: 8px;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 20px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const MenuContainer = styled.div`
  height: 32px;
`;

export const MenuItem = styled.button<{ $active: boolean; $side: string }>`
  height: 100%;
  border: 1px solid ${BorderColor.UI_BORDER};
  padding: 6px 8px;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;

  ${(props) =>
    props.$side === "left"
      ? `border-radius: 6px 0 0 6px;`
      : `border-radius: 0 6px 6px 0;`}

  &:hover:not(:disabled) {
    ${(props) =>
      !props.$active &&
      `
      background-color: ${BackgroundColor.PRIMARY_BACKGROUND_HOVER};
      border-color: ${BorderColor.UI_BORDER};
    `}
  }

  ${(props) =>
    props.$active &&
    `
    background-color: ${SemanticColors.PRIMARY_SELECTED};
    border-color: ${SemanticColors.PRIMARY};
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
