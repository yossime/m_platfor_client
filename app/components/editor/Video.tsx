import { useVideoTexture } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Color, Group, Mesh, MeshStandardMaterial, Object3D } from "three";
import { MaterialParams } from "./interface/paramsType";



interface VideoProps {
    videoPlaceholder: Object3D;
    materialParams: MaterialParams | null;
}

const Video: React.FC<VideoProps> = ({ videoPlaceholder, materialParams }) => {
    const videoRef = useRef<Group>(null);
    const url = 'video_1.mp4';
    const texture = useVideoTexture(url)
 
    // console.log("videoPlaceholder", videoPlaceholder);
    useEffect(() => {
        if (!videoPlaceholder) return;

        const videoMash = videoPlaceholder;

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