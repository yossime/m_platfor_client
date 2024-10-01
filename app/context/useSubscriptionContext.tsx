import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

export enum Plans {
  Business = "Business",
  Plus = "Plus",
  Enterprise = "Enterprise",
  Starter = "Starter"
}


interface SubscriptionContextType {
  paymentPage: boolean;
  setPaymentPage: React.Dispatch<React.SetStateAction<boolean>>;
  yearly: boolean;
  setYearly: React.Dispatch<React.SetStateAction<boolean>>;
  plan: Plans;
  setPlan: React.Dispatch<React.SetStateAction<Plans>>;
  monPrice: number;
  setMonPrice: React.Dispatch<React.SetStateAction<number>>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [paymentPage, setPaymentPage] = useState<boolean>(false);
  const [yearly, setYearly] = useState<boolean>(false);
  const [plan, setPlan] = useState<Plans>(Plans.Starter);
  const [monPrice, setMonPrice] = useState<number>(0);
  
  useEffect(() => {
    const storedPlan = localStorage.getItem('plan');
    const storedPrice = localStorage.getItem('monPrice');
    const storedYearly = localStorage.getItem('yearly');
    
    if (storedPlan && Object.values(Plans).includes(storedPlan as Plans)) {
      setPlan(storedPlan as Plans);
    }
    
    if (storedPrice && !isNaN(Number(storedPrice))) {
      setMonPrice(Number(storedPrice));
    }
    
    if (storedYearly) {
      setYearly(storedYearly === 'true');
    }
  }, []);
  
  
  useEffect(() => {
    localStorage.setItem('plan', plan);
    localStorage.setItem('monPrice', String(monPrice));
    localStorage.setItem('yearly', String(yearly));
  }, [plan, monPrice, yearly]);
  

  const value: SubscriptionContextType = {
    paymentPage,
    setPaymentPage,
    yearly,
    setYearly,
    plan,
    setPlan,
    setMonPrice,
    monPrice
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
