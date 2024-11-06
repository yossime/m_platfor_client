import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../general/CommonStyles";
import { useSelectedObject } from "@/components/editor/context/Selected.context";
import { Vector3, Euler } from "three";

const ModelDetails: React.FC = () => {
  const { selectedObject } = useSelectedObject();
  const [position, setPosition] = useState<Vector3 | null>(null);
  const [rotation, setRotation] = useState<Euler | null>(null);
  const [scale, setScale] = useState<Vector3 | null>(null);

  useEffect(() => {
    const model = selectedObject?.getModel();
    if (model) {
      setPosition(model.position.clone());
      setRotation(model.rotation.clone());
      setScale(model.scale.clone());
    }
  }, [selectedObject]);

  const handlePositionChange = (axis: "x" | "y" | "z", value: number) => {
    if (position) {
      const updatedPosition = position.clone();
      updatedPosition[axis] = value;
      setPosition(updatedPosition);
      if (selectedObject?.updatePosition)
        selectedObject?.updatePosition(updatedPosition);
    }
  };

  const handleRotationChange = (axis: "x" | "y" | "z", value: number) => {
    if (rotation) {
      const updatedRotation = rotation.clone();
      updatedRotation[axis] = value;
      setRotation(updatedRotation);
      if (selectedObject?.updateRotation) {
        selectedObject.updateRotation(updatedRotation);
      }
    }
  };

  const handleScaleChange = (axis: "x" | "y" | "z", value: number) => {
    if (scale) {
      const updatedScale = scale.clone();
      updatedScale[axis] = value;
      setScale(updatedScale);
      if (selectedObject?.updateScale)
        selectedObject?.updateScale(updatedScale);
    }
  };

  return (
    <Container>
      <Section>

        <Property>
          <Label>Position</Label>
          {["x", "y", "z"].map((axis) => (
            <Input
              key={`position-${axis}`}
              type="nmber"
              value={
                position && typeof position[axis as keyof Vector3] === "number"
                  ? Number(
                      (position[axis as keyof Vector3] as number).toFixed(2)
                    )
                  : 0
              }
              onChange={(e) =>
                handlePositionChange(
                  axis as "x" | "y" | "z",
                  parseFloat(e.target.value)
                )
              }
            />
          ))}
        </Property>

        <Property>
          <Label>Rotation</Label>
          {["x", "y", "z"].map((axis) => (
            <Input
              key={`position-${axis}`}
              type="number"
              value={
                rotation && typeof rotation[axis as keyof Euler] === "number"
                  ? Number(
                      (rotation[axis as keyof Euler] as number).toFixed(2)
                    )
                  : 0
              }
              onChange={(e) =>
                handleRotationChange(
                  axis as "x" | "y" | "z",
                  parseFloat(e.target.value)
                )
              }
            />
          ))}
        </Property>

        <Property>
          <Label>Scale</Label>
          {["x", "y", "z"].map((axis) => (
            <Input
              key={`position-${axis}`}
              type="number"
              value={
                scale && typeof scale[axis as keyof Vector3] === "number"
                  ? Number(
                      (scale[axis as keyof Vector3] as number).toFixed(2)
                    )
                  : 0
              }
              onChange={(e) =>
                handleScaleChange(
                  axis as "x" | "y" | "z",
                  parseFloat(e.target.value)
                )
              }
            />
          ))}
        </Property>
      </Section>
    </Container>
  );
};

export default ModelDetails;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f5f5f5;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const Property = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  width: 60px;
  padding: 4px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
