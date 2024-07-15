import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

export const Form = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Spacer = styled.div`
  height: 20px;
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Link = styled.span`
  cursor: pointer;
  color: var(--text-color-link);
  text-decoration: underline;
  margin-left: 5px;
`;