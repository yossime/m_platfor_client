import { useFrame, useLoader } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { Image, Text, useTexture } from '@react-three/drei'
import { Group, Mesh, Object3D, Texture, TextureLoader } from "three";
import { IBoard } from "./interface/paramsType";


interface ImageLoaderProps {
    board?: IBoard;
    // boradType?: string;
    // materialParams: MaterialParams | null;
    slotPlaceholder: Object3D | null;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ board, slotPlaceholder }) => {
    const url = "https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/textura_4.jpeg?alt=media&token=642299bf-7758-4516-a0ae-9ac132c26c9f"
    const texture = useLoader(TextureLoader, url)
    const ref = useRef<Group>(null)
    const mesh = useRef<Mesh>(null)
  
    // Adjust these values to crop and fit the image
    // texture.offset.set(0.1, 0.1) 
    // texture.repeat.set(0.8, 0.8) 
  
    const offset = [0.1, 0.1]
    const repeat = [0.2, 0.5]
 


    // const [texture, setTexture] = useState<Texture | null>(null);
    // const ref = useRef<any>(null);


    useEffect(() => {
        texture.offset.set(offset[0], offset[1]);
        texture.repeat.set(repeat[0], repeat[1]);
        
        if (ref.current && slotPlaceholder != null) {
            slotPlaceholder.getWorldPosition(ref.current.position);
            slotPlaceholder.getWorldQuaternion(ref.current.quaternion);
            // slotPlaceholder.getWorldScale(ref.current.scale);
            // ref.current.material.radius = 1
            // ref.current.material.zoom = 1
            // ref.current.material.grayscale = 1
        }
    },[url])


    // useFrame(() => {
    //     if (ref.current && slotPlaceholder != null) {
    //         slotPlaceholder.getWorldPosition(ref.current.position);
    //         slotPlaceholder.getWorldQuaternion(ref.current.quaternion);
    //         // slotPlaceholder.getWorldScale(ref.current.scale);
    //         // ref.current.material.radius = 1
    //         // ref.current.material.zoom = 1
    //         // ref.current.material.grayscale = 1
    //     }
    // })

    return (

    //     <mesh ref={mesh}>
    //     <planeGeometry args={[15, 15]} />
    //     <meshBasicMaterial map={texture} />
    //   </mesh>

        <group ref={ref}>
            <Image url={url} scale={[30,30]}/>
        </group>
    )
}


export default ImageLoader;