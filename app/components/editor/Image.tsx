import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Image, Text } from '@react-three/drei'
import { Mesh, Object3D } from "three";
import { IBoard } from "./interface/paramsType";


interface ImageLoaderProps {
    board?: IBoard;
    // boradType?: string;
    // materialParams: MaterialParams | null;
    slotPlaceholder: Object3D | null;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ board, slotPlaceholder }) => {
    const ref = useRef<any>(null);
    useFrame(() => {
        if (ref.current && slotPlaceholder != null) {
            slotPlaceholder.getWorldPosition(ref.current.position);
            slotPlaceholder.getWorldQuaternion(ref.current.quaternion);
            // ref.current.material.radius = 1
            // ref.current.material.zoom = 1
            // ref.current.material.grayscale = 1
        }
    })
    return (
        <group ref={ref}>
            <Image ref={ref} url="t2.jpeg"/>

            {/* <Text
                scale={[10, 10, 10]}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                HELLO WORLD
            </Text> */}
        </group>
    )
}


export default ImageLoader;