import { useVideoTexture } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Color, Group, Mesh, MeshStandardMaterial, Object3D } from "three";
import { MaterialParams } from "./interface/paramsType";



interface VideoProps {
    slotPlaceholder: Object3D;
    materialParams?: MaterialParams | null;
}

const Video: React.FC<VideoProps> = ({ slotPlaceholder }) => {
    const videoRef = useRef<Group>(null);
    const url = 'https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/video_1.mp4?alt=media&token=d948abc7-d187-4612-b315-8109faf98b84';
    const texture = useVideoTexture(url)
 
    // console.log("videoPlaceholder", videoPlaceholder);
    useEffect(() => {
        if (!slotPlaceholder) return;

        const videoMash = slotPlaceholder;

        if (videoMash instanceof Mesh) {
            const videoMaterial = new MeshStandardMaterial();

            videoMaterial.map = texture;
            videoMaterial.toneMapped = false;
            videoMash.material = videoMaterial;
        }


        videoRef.current?.add(videoMash);
    }, []);


    const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        const clickedPart = event.object;
        console.log("handlePointerDown video", clickedPart);

        if (clickedPart instanceof Mesh) {
            // console.log("clicked");
            const highlightMaterial = new MeshStandardMaterial({
                color: new Color('yellow'),
                opacity: 0.5,
                transparent: true,
                wireframe: true,
                // map: texture,
            });

            clickedPart.material = highlightMaterial;
        }

    };

 return (
    <group ref={videoRef} onPointerDown={handlePointerDown}>

    </group>
 )   
}


export default Video;