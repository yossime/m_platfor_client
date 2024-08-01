import { useEditor } from "@/context/useEditorContext";
import { useLoader } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import { Object3D, Group, Mesh, SkinnedMesh, Vector3, Box3, Quaternion } from "three";
import { FBXLoader } from "three-stdlib";
import { IButton, IDisplay, IProduct, MaterialParams } from "./interface/paramsType";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


const API = process.env.NEXT_PUBLIC_BACKEND_URL!

interface LoadProductProps {
    display: IProduct;
    slotPlaceholder: Object3D;
}



const getModelCenter = (object: Object3D) => {
    const box = new Box3().setFromObject(object);
    const center = new Vector3();
    box.getCenter(center);
    return center;
};

interface ModelProps {
    url: string;
    onLoad?: (object: Object3D) => void;
}

const Model: React.FC<ModelProps> = ({ url, onLoad }) => {
    const fbx = useLoader(FBXLoader, url);
    const clonedFbx = fbx.clone(true);
    const modelRef = useRef<Group>(null);
    useEffect(() => {
        if (onLoad) {
            onLoad(clonedFbx);
            modelRef.current?.add(clonedFbx)
        }
    }, [fbx, onLoad]);

    return (
    <group ref={modelRef}>

    </group>
    );
};

function getModelDimensions(model: Object3D) {
    const box = new Box3().setFromObject(model);
    const size = new Vector3();
    box.getSize(size);
    return {
        width: size.x,
        height: size.y,
        depth: size.z
    };
}


const LoadProduct: React.FC<LoadProductProps> = ({ display, slotPlaceholder }) => {
    const url = `${API}/project/fbx`;
    const modelUrl = `${url}/${display.src}`;

    if (!display.src) return null;


    const [referenceModelCenter, setReferenceModelCenter] = useState<Vector3 | null>(null);
    
    
        const handleTargetModelLoad = useCallback((fbx: Object3D) => {
            const desiredDimensions = { x: 0.026778, y: 0.026181, z: 0.017985 };
            if (referenceModelCenter) {

                fbx.position.copy(referenceModelCenter);
                fbx.quaternion.copy(slotPlaceholder.quaternion);
                
            const modelDimensions = getModelDimensions(fbx);

            const scaleX = desiredDimensions.x / modelDimensions.width;
            const scaleY = desiredDimensions.y / modelDimensions.height;
            const scaleZ = desiredDimensions.z / modelDimensions.depth;


            const uniformScale = Math.min(scaleX, scaleY, scaleZ) * 100;
            fbx.scale.set(uniformScale, uniformScale, uniformScale);

        }
    }, [referenceModelCenter]);


    useEffect(() => {
        if (slotPlaceholder.parent) {
            const placeholderCenter = getModelCenter(slotPlaceholder.parent);
            setReferenceModelCenter(placeholderCenter);
        }


    }, [modelUrl]);

    return (
        <group>
            {referenceModelCenter && (
                <Model url={modelUrl} onLoad={handleTargetModelLoad} />
            )}
        </group>
    )

}

export default LoadProduct;
    // useEffect(() => {
    //     // console.log("ProductPlaceholder", slotPlaceholder)
    //     // console.log("productFbx", model);
    //     if (!slotPlaceholder) return;



    //     // const loader = new GLTFLoader();
    //     // loader.load(modelUrl, (gltf) => {
    //     //     const model = gltf.scene;

    //     // loader.load(modelUrl, (object) => {

    //     //     const model = object;
    //     //     // object.scale.set(0.9, 0.9, 0.9);

    //     //     const dimensions = getModelDimensions(model);
    //     //     const size = getModelSize(model);
    //     //     console.log("dimensions", dimensions);
    //     //     console.log("size", size);

    //     //     // setModel(model);

    //     //     const desiredDimensions = { x: 0.026778, y: 0.026181, z: 0.017985 };

    //     // }, undefined, (error) => {
    //     //     console.error('An error happened:', error);
    //     // });


    //     // const box = new Box3().setFromObject(model);
    //     // const size = box.getSize(new Vector3()).length();
    //     // const center = box.getCenter(new Vector3());

    //     // console.log("box", box);
    //     // console.log("size", size);
    //     // console.log("center", center);

    //     // const boundingBox = new Box3();

    //     // // Update the world matrix of the object to ensure it's up-to-date
    //     // model.updateMatrixWorld(true);

    //     // // Compute the bounding box of the object
    //     // boundingBox.setFromObject(model);

    //     // // Now you can get the min and max coordinates of the bounding box
    //     // const min = boundingBox.min; // This is a Vector3
    //     // const max = boundingBox.max; // This is a Vector3

    //     // console.log('Bounding Box Min:', min);
    //     // console.log('Bounding Box Max:', max);

    //     // if (!model) return;

    //     // const currentDisplay = model.clone();
    //     // slotPlaceholder.getWorldPosition(currentDisplay.position);
    //     // slotPlaceholder.getWorldQuaternion(currentDisplay.quaternion);
    //     // currentDisplay.scale.set(0.9, 0.9, 0.9);


    //     // if (currentDisplay && currentDisplay instanceof Mesh || SkinnedMesh) {

    //     //     const boundingBox = currentDisplay.geometry.boundingBox.clone();
    //     //     console.log("boundingBox", boundingBox)
    //     // }

    //     // slotPlaceholder.getWorldPosition(model.position);
    //     // slotPlaceholder.getWorldQuaternion(model.quaternion);

    //     const materialParams = display?.materialParams;
    //     if (materialParams && model instanceof Mesh) {

    //         // buildTexture(materialParams, currentDisplay);
    //     }



    //     // modelRef.current?.add(model);


    // }, [modelRef]);






    // const modelCenter = new Vector3();
    // const boundingBox = new Box3().setFromObject(model);
    // boundingBox.getCenter(modelCenter);

    // // Create a parent group to adjust the origin
    // const group = new Group();
    // model.position.set(-modelCenter.x, -modelCenter.y, -modelCenter.z);
    // group.add(model);

    // return (
    // //   <group scale={[uniformScale, uniformScale, uniformScale]} position={[0, 0, 0]}>
    //   <group scale={[uniformScale, uniformScale, uniformScale]} position={[0, 0, 0]}>
    //     <primitive object={group} />
    //   </group>
    // );


    // return (
    //     <primitive
    //     object={model}
    //     scale={uniformScale}
    //     // position={[0, 0, 0]} 
    //   />
    //     // <group ref={modelRef}>
    //     // </group>
    // )
// }

// export default LoadProduct;





