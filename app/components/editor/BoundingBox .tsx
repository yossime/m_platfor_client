import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Box } from '@react-three/drei';

// Define types for the bounding box coordinates
interface BoundingBoxProps {
  children: React.ReactElement;
}

const BoundingBox: React.FC<BoundingBoxProps> = ({ children }) => {
  const ref = useRef<THREE.Mesh>(null);
  const [bounds, setBounds] = useState<{ min: THREE.Vector3; max: THREE.Vector3 }>({
    min: new THREE.Vector3(),
    max: new THREE.Vector3(),
  });

  useEffect(() => {
    if (ref.current) {
      // Ensure the matrixWorld is updated
      ref.current.updateMatrixWorld(true);

      // Create a Box3 instance to hold the bounding box
      const boundingBox = new THREE.Box3();
      
      // Compute the bounding box of the object
      boundingBox.setFromObject(ref.current);

      // Update the state with min and max coordinates
      setBounds({
        min: boundingBox.min.clone(),
        max: boundingBox.max.clone(),
      });

      // console.log('Updated bounding box:', bounds);
    }
  }, [ref.current]);

  return (
    <>
      {React.cloneElement(children, { ref })}
      <mesh position={[
        (bounds.min.x + bounds.max.x) / 2,
        (bounds.min.y + bounds.max.y) / 2,
        (bounds.min.z + bounds.max.z) / 2
      ]}>
        <boxGeometry args={[
          bounds.max.x - bounds.min.x,
          bounds.max.y - bounds.min.y,
          bounds.max.z - bounds.min.z
        ]} />
        <meshBasicMaterial color="red" transparent opacity={0.2} />
      </mesh>
    </>
  );
};


export default BoundingBox;
