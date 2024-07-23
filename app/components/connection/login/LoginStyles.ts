import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 658px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding:64px , 0px, 64px, 0px;
  gap: 16px;

`;
export const BottomContainer = styled.div`
width:100%;
  display: flex;
  flex-direction: column;
  gap :8px ;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

`;

export const Spacer = styled.div`
  height: auto;
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