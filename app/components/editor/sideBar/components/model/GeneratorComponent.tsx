import Button from "@/components/Library/button/Button";
import DragAndDrop from "@/components/Library/general/DragAndDrop";
import Input from "@/components/Library/input/Input";
import Text from "@/components/Library/text/Text";
import TripoClient from "@/services/tripo.service";
import { ButtonSize, ButtonType, ButtonVariant } from "@constants/button";
import React, { useState } from "react";
import styled from "styled-components";
import { Divider } from "../general/CommonStyles";
import { InputSize } from "@constants/input";

const GeneratorContiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Status = styled.div`
  font-size: 16px;
  color: #555;
  margin: 10px 0;
`;

const Error = styled.div`
  color: red;
  font-size: 14px;
  margin: 10px 0;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  margin-top: 10px;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ progress }) => progress}%;
    background-color: #4caf50;
    transition: width 0.3s ease;
  }
`;

const ModelPreview = styled.div`
  height: 350px;
  width: 350px;
  text-align: center;
  background-color: azure;
  img {
    max-height: 240px;
    max-width: 100%;
    border-radius: 8px;
    border: 1px solid #ddd;
  }
  p {
    color: #888;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px;
  width: 100%;
  gap: 10px;
`;

const GeneratorComponent: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<string>("Idle");
  const [modelPreview, setModelPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [textInput, setTextInput] = useState<string>("");
  const [isTextInput, setIsTextInput] = useState<boolean>(true);
  const [imageToken, setImageToken] = useState<any>("");
  const [imageFormat, setImageformat] = useState<string>("");

  const tripoClient = new TripoClient();

  const watchTaskProgress = (taskId: string) => {
    setStatus("Tracking task progress...");
    tripoClient.watchTask(taskId, {
      onProgress: setProgress,
      onStatusChange: setStatus,
      onComplete: (task) => {
        setStatus("Generation completed!");
        setProgress(100);
        setModelPreview(task.output.rendered_image);
      },
      onError: (error) => {
        setError(error.message);
        setStatus("Error occurred");
      },
    });
  };

  const generateFromText = async () => {
    setStatus("Generating from text...");
    try {
      const taskId = await tripoClient.generateFromText(textInput);
      watchTaskProgress(taskId);
    } catch (error: any) {
      setError(error.message);
      setStatus("Error occurred");
    }
  };


  const generateFromImage = async () => {
    setStatus("Generating from text...");
    try {
      const taskId = await tripoClient.generateFromImage(
        imageToken,
        imageFormat
      );      watchTaskProgress(taskId);
    } catch (error: any) {
      setError(error.message);
      setStatus("Error occurred");
    }
  };

  const uploadImage = async (imageFile: File) => {
    setTextInput("")
    setIsTextInput(false)
    setStatus("Uploading image...");
    try {
      const imageToken = await tripoClient.uploadImage(imageFile);
      const imageFormat = imageFile.name.split(".").pop()?.toLowerCase() || "png";
      setImageToken(imageToken)
      setImageformat(imageFormat)
    } catch (error: any) {
      setError(error.message);
      setStatus("Error occurred");
    }
  };

  const handleGenerate = () => {
    if (isTextInput) {
      generateFromText();
    }
    else{
      generateFromImage()
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
    setIsTextInput(e.target.value.length > 0);
  };

  return (
    <GeneratorContiner>
      <Text>Ai 3D Generator</Text>
      <Divider />
      {error && <Error>Error: {error}</Error>}
      <ModelPreview>
        {modelPreview ? (
          <div>
            <Status>Status: {status}</Status>
            <ProgressBar progress={progress} />
            <img src={modelPreview} alt="Generated Model Preview" />
          </div>
        ) : (
          <p>No preview available</p>
        )}
      </ModelPreview>
      <ControlsContainer>
        <Input
          inputSize={InputSize.LARGE}
          value={textInput}
          onChange={handleTextChange}
          placeholder="Enter text for generation"
          disabled={!isTextInput}
        />
        <DragAndDrop
          iconOnly
          buttonOnly
          type="image"
          onFileAdded={(file) => uploadImage(file)}
        />
        <Button
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.LARGE}
          text="Generate"
          onClick={handleGenerate}
        />
      </ControlsContainer>
    </GeneratorContiner>
  );
};

export default GeneratorComponent;
