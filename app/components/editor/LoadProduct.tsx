import { useEditor } from "@/context/useEditorContext";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Object3D, Group, Mesh, SkinnedMesh, Vector3, Box3 } from "three";
import { FBXLoader } from "three-stdlib";
import { IButton, IDisplay, IProduct, MaterialParams } from "./interface/paramsType";


const API = process.env.NEXT_PUBLIC_BACKEND_URL!

interface LoadProductProps {
    display: IProduct;
    slotPlaceholder: Object3D;
}

const LoadProduct: React.FC<LoadProductProps> = ({ display, slotPlaceholder }) => {
    const url = `${API}/project/fbx`;
    const modelUrl = `${url}/${display.src}`;



    const model = useLoader(FBXLoader, modelUrl) as Object3D;

    const modelRef = useRef<Group>(null);


    useEffect(() => {
        // console.log("ProductPlaceholder", slotPlaceholder)
        // console.log("productFbx", model);
        if (!slotPlaceholder) return;



        const box = new Box3().setFromObject(model);
        const size = box.getSize(new Vector3()).length();
        const center = box.getCenter(new Vector3());

        // console.log("box", box);
        // console.log("size", size);
        // console.log("center", center);

        // const boundingBox = new Box3();

        // // Update the world matrix of the object to ensure it's up-to-date
        // model.updateMatrixWorld(true);

        // // Compute the bounding box of the object
        // boundingBox.setFromObject(model);

        // // Now you can get the min and max coordinates of the bounding box
        // const min = boundingBox.min; // This is a THREE.Vector3
        // const max = boundingBox.max; // This is a THREE.Vector3

        // console.log('Bounding Box Min:', min);
        // console.log('Bounding Box Max:', max);

        const currentDisplay = model.clone();
        slotPlaceholder.getWorldPosition(currentDisplay.position);
        slotPlaceholder.getWorldQuaternion(currentDisplay.quaternion);



        // if (currentDisplay && currentDisplay instanceof Mesh || SkinnedMesh) {

        //     const boundingBox = currentDisplay.geometry.boundingBox.clone();
        //     console.log("boundingBox", boundingBox)
        // }

        // slotPlaceholder.getWorldPosition(model.position);
        // slotPlaceholder.getWorldQuaternion(model.quaternion);

        const materialParams = display?.materialParams;
        if (materialParams && model instanceof Mesh) {

            // buildTexture(materialParams, currentDisplay);
        }



        modelRef.current?.add(model);
    }, [modelRef]);


    return (
        <group>
            <primitive object={model} />
        </group>
    )
}

export default LoadProduct;