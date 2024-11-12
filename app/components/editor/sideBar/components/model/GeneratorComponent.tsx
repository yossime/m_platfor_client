import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import styled from "styled-components";
import Button from "@/components/Library/button/Button";
import DragAndDrop from "@/components/Library/general/DragAndDrop";
import Input from "@/components/Library/input/Input";
import Text from "@/components/Library/text/Text";
import TripoClient from "@/services/tripo.service";
import { ButtonMode, ButtonSize, ButtonType, ButtonVariant } from "@constants/button";
import { Divider } from "../general/CommonStyles";
import { InputSize } from "@constants/input";
import { UserModel } from "./models.types";

const GeneratorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
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
  height: 360px;
  width: 100%;
  text-align: center;
  justify-content: center;

  img {
    max-width: 328px;
    max-height: 328px;
    object-fit: contain;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px;
  height: 96px;
  width: 100%;
  gap: 10px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 24px;
  height: 96px;
  width: 100%;
  gap: 10px;
`;

const SubtitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 40px;
  justify-content: space-between;
`;

interface GeneratorComponentProps {
  setModels: Dispatch<SetStateAction<UserModel[]>>;
  handleCloseGenerator: () => void;
}

const GeneratorComponent: React.FC<GeneratorComponentProps> = ({ setModels, handleCloseGenerator }) => {
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<string>("Ai 3D Generator");
  const [modelPreview, setModelPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [textInput, setTextInput] = useState<string>("");
  const [imageToken, setImageToken] = useState<string | null>(null);
  const [imageFormat, setImageFormat] = useState<string>("png");
  const [newModel, setNewModel] = useState<UserModel>({});
  const [towbuttons, setTowButtons] = useState<boolean>(true);
  const [regenerat, setRegenrat] = useState<boolean>(false);
  const [disablegenerat, setDisablegenerat] = useState<boolean>(false);




  const tripoClient = useMemo(() => new TripoClient(), []);

  const watchTaskProgress = (taskId: string) => {
    setStatus("progress...");
    tripoClient.watchTask(taskId, {
      onProgress: setProgress,
      onStatusChange: setStatus,
      onComplete: (task) => {
        setStatus("Generation completed!");
        setTowButtons(true)
        setProgress(100);
        setModelPreview(task.rendered_image.url);
        setNewModel((prev) => ({
          ...prev,
          image: task.rendered_image.url,
          model: task.model.url,
          name: textInput,
        }));
      },
      onError: (error) => {
        setError(error.message);
        setStatus("Error occurred");
      },
    });
  };

  const generateFromText = async () => {
    setStatus("Generating from text...");
    setTowButtons(false)
    setRegenrat(true)
    try {
      const taskId = await tripoClient.generateFromText(textInput);
      watchTaskProgress(taskId);
    } catch (error: any) {
      console.log("asaa")

      setError(error.message);
      setStatus("Error occurred");
    }
  };

  const generateFromImage = async () => {
    setStatus("Generating from image...");
    setRegenrat(true)
    setTowButtons(false)

    try {
      if (imageToken) {
        const taskId = await tripoClient.generateFromImage(imageToken, imageFormat);
        watchTaskProgress(taskId);
      }
    } catch (error: any) {
      setError(error.message);
      setStatus("Error occurred");
    }
  };

  const uploadImage = async (imageFile: File) => {
    setStatus("Uploading image...");

    try {
      const token = await tripoClient.uploadImage(imageFile);
      const format = imageFile.name.split(".").pop()?.toLowerCase() || "png";
      setImageToken(token);
      setImageFormat(format);
      setModelPreview(URL.createObjectURL(imageFile));
      setDisablegenerat(true) 
      setStatus("Ai 3D Generator");

    } catch (error: any) {
      setError(error.message);
      setStatus("Error occurred");
    }
  };

  const handleGenerate = () => {
    if (textInput.length > 0) {
      generateFromText();
    } else if (imageToken) {
      generateFromImage();
    }
  };

  const handleAddModel = () => {
    handleCloseGenerator();
    if (newModel.image && newModel.model) {
      setModels((prevModels) => [...prevModels, newModel]);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
    if(e.target.value.length > 0){ setDisablegenerat(true) }else setDisablegenerat(false)
  };

  return (
    <GeneratorContainer>
      <SubtitleContainer>
        <Divider />
        <Text>{status}</Text>
        <Divider />
      </SubtitleContainer>
      {/* {error && <Error>Error: {error}</Error>} */}
      <ModelPreview>
        {modelPreview && <img src={modelPreview} alt="Generated Model Preview" />}
      </ModelPreview>
      {!regenerat ? (
        <ControlsContainer>
          <Input
            inputSize={InputSize.LARGE}
            value={textInput}
            onChange={handleTextChange}
            placeholder="Enter text for generation"
            
          />
          <DragAndDrop
            onClick={() => setTextInput("")}
            iconOnly
            buttonOnly
            type="image"
            onFileAdded={uploadImage}
          />
          <Button
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.LARGE}
            text="Generate"
            onClick={handleGenerate}
            mode={disablegenerat ? ButtonMode.NORMAL : ButtonMode.DISABLED}

          />
        </ControlsContainer>
      ) : (
        <ButtonsContainer>
          <Button
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.LARGE}
            text="Regenerate"
            onClick={handleGenerate}
            mode={towbuttons ? ButtonMode.NORMAL : ButtonMode.DISABLED}
          />
          <Button
            type={ButtonType.PRIMARY}
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.LARGE}
            text="Claim"
            onClick={handleAddModel}
            mode={towbuttons ? ButtonMode.NORMAL : ButtonMode.DISABLED}
          />
        </ButtonsContainer>
      )}
    </GeneratorContainer>
  );
};

export default GeneratorComponent;
