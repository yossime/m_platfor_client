
import React, { useState } from 'react';
import styled from 'styled-components';
import * as storeService from '@/services/storeService';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px;
  padding: 20px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  background: #f9f9f9;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 14px;
`;

const CreateStoreForm: React.FC<{ onStoreCreated: () => void }> = ({ onStoreCreated }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      await storeService.registerStore(name);
      setName('');
      onStoreCreated(); // Notify parent that a store was created
    } catch (error) {
      setError('Failed to create store. Please try again.');
    }
  };

  return (
    <FormContainer>
      <h2>Create New Store</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Store Name"
          required
        />
        <Button type="submit">Create Store</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </FormContainer>
  );
};

export default CreateStoreForm;
