import DragAndDrop from "@/components/DragAndDrop";
import { useState } from "react";




import styled from 'styled-components';

export const Container = styled.div`
  width: 290px;
  height: 160px;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
  position: absolute; 
  z-index: 10; 
  top: 100px;
`;
export const Card = styled.div`
  height: 192px;
  padding-top: 16px;
  padding-bottom: 16px;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: 1px solid #c0c0c0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

export const CardContent = styled.div`
  align-self: stretch;
  height: 160px;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

export const InnerContent = styled.div`
  align-self: stretch;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;

export const TextWrapper = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;

export const Text = styled.div<{ color?: string; underline?: boolean }>`
  text-align: center;
  color: ${(props) => (props.color ? props.color : 'black')};
  font-size: 14px;
  font-family: 'Wix Madefor Text';
  font-weight: 400;
  text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
  text-transform: capitalize;
  line-height: 16px;
  word-wrap: break-word;
`;

export const ButtonWrapper = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;

export const Button = styled.div<{ color?: string }>`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 6px;
  border: 1px solid ${(props) => (props.color ? props.color : 'black')};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
`;

export const DropArea = styled.div`
  align-self: stretch;
  padding-top: 4px;
  padding-bottom: 4px;
  border-radius: 8px;
  border: 1px dotted black;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const DropAreaContent = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const DropAreaText = styled.span`
  color: black;
  font-size: 14px;
  font-family: 'Wix Madefor Text';
  font-weight: 400;
  text-transform: capitalize;
  line-height: 16px;
  word-wrap: break-word;
`;

export const DropAreaLink = styled.span`
  color: #0094ff;
  font-size: 14px;
  font-family: 'Wix Madefor Text';
  font-weight: 400;
  text-decoration: underline;
  text-transform: capitalize;
  line-height: 16px;
`;




export const IconRow = styled.div`
  align-self: stretch;
  height: 102px;
  padding: 4px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const IconContainer = styled.div`
  align-self: stretch;
  padding: 4px 0;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

export const Icon = styled.div<{ padding: string, width: number, height: number }>`
  width: 24px;
  height: 24px;
  padding: ${({ padding }) => padding};
  background: #E3E3E3;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    background: black;
  }
`;

export const LineWrapper = styled.div`
  width: 248px;
  padding: 4px 0;
  border-radius: 8px;
  border: 1px black solid;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;

export const Line = styled.div`
  padding: 7px 8px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  div {
    color: black;
    font-size: 14px;
    font-family: 'Wix Madefor Text';
    font-weight: 400;
    text-transform: capitalize;
    line-height: 16px;
    word-wrap: break-word;
  }
`;




export const InputWrapper = styled.div<{ width?: string, height?: string }>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;










export const Mode = {
    Media: 'Media',
    Text: 'Text',
} as const;

export type Mode = typeof Mode[keyof typeof Mode];


const EditMediaPupop = () => {
    const [mode, setMode] = useState<Mode>(Mode.Media);
    const [files, setFiles] = useState<File[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleFilesAdded = (newFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };


    return (
        
            <Container>
                <Card>
                    <CardContent>
                        <InnerContent>
                            <TextWrapper>
                                <Text color="#594DED">Board 6</Text>
                            </TextWrapper>
                            <TextWrapper>
                                <Text >Components:</Text>
                            </TextWrapper>

                            <ButtonWrapper>
                                <Button color={mode === Mode.Media ?"#594DED": "black"} onClick={() => setMode(Mode.Media)}>
                                    <Text color={mode === Mode.Media ?"#594DED": "black"}>Media</Text>
                                </Button>
                                <Button color={mode === Mode.Text ?"#594DED": "black"} onClick={() => setMode(Mode.Text)}>
                                    <Text color={mode === Mode.Text ?"#594DED": "black"} >Text</Text>
                                </Button>
                            </ButtonWrapper>
                            {mode === Mode.Media ? (
                                <DragAndDrop onFilesAdded={handleFilesAdded} />
                            ) : (
                                    <InputWrapper width="300px" height="auto">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={handleChange}
                                            placeholder="Enter text here"
                                        />
                                    </InputWrapper>
                            )}
                        </InnerContent>
                    </CardContent>
                </Card>
            </Container>
    );
}


export default EditMediaPupop;