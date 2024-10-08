"use client";
import React from "react";
import ProtectedRoute from "@/utils/ProtectedRoute";
import styled from "styled-components";
import { SubscriptionProvider } from "@/context/useSubscriptionContext";

const PaymentsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <StyledChild>
        <SubscriptionProvider>
        <ProtectedRoute>{children}</ProtectedRoute>
        </SubscriptionProvider>
      </StyledChild>
    </>
  );
};

export default PaymentsLayout;

const StyledChild = styled.div`
  height: 100vh;
  padding-top: 60px;
  overflow-x:hidden ;
  overflow-y: auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: start;
  background: linear-gradient(to top, #e3e1ff, #ffffff);
`;
