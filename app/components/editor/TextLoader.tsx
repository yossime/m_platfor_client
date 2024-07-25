import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Object3D } from "three";
import { IBoard, BoardContent, IText, ThreeDModel } from "./paramsType";



export interface ContentsProps {
  placeholder: Mesh;
  board: ThreeDModel;
}


interface TextComponentProps {
  textParams: IText;
  slotPlaceholder: Object3D | null;
}

const TextComponent: React.FC<ContentsProps> = ({ board, placeholder }) => {
  const ref = useRef<any>(null);
  const key = placeholder.name as keyof ThreeDModel;
  const data = board[key] as IText;
  console.log("board[key]", data);
  useFrame(() => {
    if (ref.current && placeholder != null) {
      placeholder.getWorldPosition(ref.current.position);
      placeholder.getWorldQuaternion(ref.current.quaternion);
    }
  })




  return (
    <group ref={ref}>
      <Text
        fontSize={1}
        color={data.color}
        anchorX="center"
        anchorY="middle"
      >
        {data.text}
      </Text>
    </group>
  );
};

export default TextComponent;