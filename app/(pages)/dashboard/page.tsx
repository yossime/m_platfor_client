"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Dashboard: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("dashboard/products");
  }, [router]); 

  return (
    <>
    </>
  );
}

export default Dashboard;
