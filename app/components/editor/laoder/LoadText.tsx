import { Html } from "@react-three/drei";
import { RefObject, useRef } from "react";
import * as THREE from 'three';


export const TextboxWithText = ({ text }: { text: string }) => {
    const groupRef: RefObject<THREE.Group> = useRef<THREE.Group>(null);
  
    return (
      <group ref={groupRef}>
        <Html position={[0, 5, 0]} transform scale={[1, 1, 1]}>
          <div style={{ color: 'black', fontSize: '1rem' }}>
            {text}
          </div>
        </Html>
      </group>
    );
  };
  