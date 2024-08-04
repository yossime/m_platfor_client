import { Text, Text3D } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Box3, BufferAttribute, BufferGeometry, Matrix4, Mesh, MeshStandardMaterial, Object3D, Vector3 } from "three";
import { IBoard, BoardContent, IText, IThreeDModel } from "./interface/paramsType";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { ConvexGeometry, FBXLoader, Font, FontLoader } from "three/examples/jsm/Addons.js";



export interface ContentsProps {
  placeholder: Mesh | Object3D;
  board: IThreeDModel;
  textParams?: IText;
}


interface TextComponentProps {
  textParams: IText;
  slotPlaceholder: Object3D;
}

 const TextComponent: React.FC<ContentsProps> = ({ board, placeholder, textParams }) => {
  const ref = useRef<any>(null);
  const key = placeholder.name as keyof IThreeDModel;
  const data = board[key] as IText;
  // console.log("board[key]", data)

  const font = useLoader(FontLoader, 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json');

//  console.log("placeholder",placeholder)
  useFrame(() => {
    if (ref.current && placeholder != null) {
      placeholder.getWorldPosition(ref.current.position);
      placeholder.getWorldQuaternion(ref.current.quaternion);

    }
  })

  return (
    <group ref={ref}>

      {/* <mesh geometry={textGeometry} position={[0, 0, 0]}>
        <meshStandardMaterial color={data.color || 'lightblue'} />
      </mesh> */}


      <Text
        // fontSize={1}
        // color={data.color}
        // anchorX="center"
        // anchorY="middle"

        position={[0, 0, 0]} 
        fontSize={1}
        scale={data?.scale || [0.1, 0.1, 0.1]}
        color= {data?.color || 'black'}
        maxWidth={20}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {data?.text}
      </Text>
    </group>
  );
};

export default TextComponent;




// interface RoundedTextProps {
//   children: string;
//   fontSize?: number;
//   position?: [number, number, number];
// }

// export const RoundedText: React.FC<RoundedTextProps> = ({ children, fontSize = 1, position = [0, 0, 0] }) => {
//   const [font, setFont] = useState<Font | null>(null);

//   useEffect(() => {
//     // Load the font JSON file
//     new FontLoader().load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', setFont);
//   }, []);

//   if (!font) return null;

//   // Create the text geometry with bevel
//   const geometry = new TextGeometry(children, {
//     font,
//     size: fontSize,
//     height: 0.2,
//     bevelEnabled: true,
//     bevelSize: 0.1,
//     bevelThickness: 0.2,
//   });

//   return (
//     <mesh geometry={geometry} position={position}>
//       <meshStandardMaterial attach="material" color="skyblue" />
//     </mesh>
//   );
// };




// export const ConvexMeshFromFBX = () => {
//   const [mesh, setMesh] = useState<any>(null);
//   const meshRef = useRef<Mesh>(null);

//   const url = "https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/Barbiz.fbx?alt=media&token=8a94f967-363b-48c8-8d71-ad3a620e672b"
//   const architectureFbx = useLoader(FBXLoader, url) as Object3D;

//   useEffect(() => {
//     // console.log("architectureFbx", architectureFbx);

//     architectureFbx.traverse((child) => {
//       if (child instanceof Mesh && child.name === 'Slot_01') {
//         console.log("child", child);
//         // Create a convex geometry from the loaded mesh
//         const geometry = child.geometry;
//         const positions = geometry.attributes.position.array;

//         // Create a convex hull from the vertices
//         const vertices = [];
//         for (let i = 0; i < positions.length; i += 3) {
//           vertices.push(new Vector3(
//             positions[i],
//             positions[i + 1],
//             positions[i + 2]
//           ));
//         }

//         const convexGeometry = new ConvexGeometry(vertices);

//         setMesh(new Mesh(convexGeometry, new MeshStandardMaterial({ color: 'royalblue' })));
//       }
//     });
//   }, [architectureFbx]);



//   return (
//     <mesh ref={meshRef}>
//       {mesh && <primitive object={mesh} />}
//     </mesh>
//   );
// };




// export const ConvexTextMesh = () => {
//   const [textMesh, setTextMesh] = useState<Mesh>();
//   const textRef = useRef<Mesh>(null);
//   const text = 'Hello, Three.js!';

//   const [font, setFont] = useState<Font | null>(null);

//   new FontLoader().load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', setFont);


//   if (!font) return null;


//   useEffect(() => {
//     const geometry = new TextGeometry(text, {
//       font, // Ensure to include the necessary font file in your project
//       size: 1,
//       height: 0.2,
//     });

//     // Optionally make the text convex (3D text might already be convex)
//     const vertices: Vector3[] = [];
//     geometry.attributes.position.array.forEach((value, index) => {
//       if (index % 3 === 0) {
//         vertices.push(new Vector3(
//           geometry.attributes.position.array[index],
//           geometry.attributes.position.array[index + 1],
//           geometry.attributes.position.array[index + 2]
//         ));
//       }
//     });
//     const convexGeometry = new ConvexGeometry(vertices);

//     setTextMesh(new Mesh(convexGeometry, new MeshStandardMaterial({ color: 'lightblue' })));
//   }, [font]);

//   useFrame(() => {
//     if (textRef.current) {
//       textRef.current.rotation.y += 0.01;
//     }
//   });

//   return (
//     <mesh ref={textRef} position={[0, 2, 0]}>
//       {textMesh && <primitive object={textMesh} />}
//     </mesh>
//   );
// };