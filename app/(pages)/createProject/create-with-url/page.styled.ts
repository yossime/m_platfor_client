import styled from 'styled-components';



export const Box = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;



export const FormContainer = styled.div`
    height: 500px;
    width: 800px;
    background-color: antiquewhite;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Label = styled.label`
    font-size: 16px;
`;

export const Input = styled.input`
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;
export const btn = styled.button`
    background-color: blue;
`

export const SubmitButton = styled(btn)`
    padding: 10px;
    font-size: 16px;
    /* background-color: #007bff; */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;