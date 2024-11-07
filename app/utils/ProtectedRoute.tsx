"use client";
import LoadingSpinner from '@/components/Library/general/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styled from 'styled-components';

const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8); 
  z-index: 9999;
`;

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <FullScreenContainer>
        <LoadingSpinner />
      </FullScreenContainer>
    );
  }

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
