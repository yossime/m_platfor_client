import { useLoader, ThreeEvent } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { Object3D, Group, TextureLoader, Mesh, MeshStandardMaterial, Color, Vector3, Euler, CanvasTexture } from "three";
import { FBXLoader, FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { IBoard, MaterialParams, IText, IProduct, IThreeDModel, IDisplay, IButton } from "../../interface/paramsType";
import { LoadMaterial } from "../../loadMaterial";
import { Html, useAspect, useVideoTexture } from "@react-three/drei";
// import TextLoader from "../../TextLoader";
import Video from "../../Video";
import TextLoader, { ContentsProps } from "../../TextLoader";
import { EMode, useEditor } from "@/context/useEditorContext";
import { Text } from '@react-three/drei';
import ImageR from "../../Image";
import TextComponent from "../../TextLoader";
import Button from "../button/Button";
import LoadProduct from "../../LoadProduct";
import BoundingBox from "../../BoundingBox ";

const API = process.env.NEXT_PUBLIC_BACKEND_URL!


const buildTexture = async (materialParams: MaterialParams, mash: Mesh) => {
    const boradMaterial = await LoadMaterial(materialParams)
    mash.material = boradMaterial;
}


interface DisplayLoaderProps {
    display: IDisplay;
    slotPlaceholder: Object3D;
}

const Display: React.FC<DisplayLoaderProps> = ({ display, slotPlaceholder }) => {

    if (display && !display.type) return null;

    const displayRef = useRef<Group>(null);

    const { setCurrentMode } = useEditor();
    const [mediaSlots, setMediaSlots] = useState<Object3D[]>([]);
    const [selectedBorad, setSelectedBorad] = useState<Object3D | null>(null);
    const [textMeshes, setTextMeshes] = useState<Object3D[]>([]);
    const [buttonMeshes, setButtonMeshes] = useState<Object3D[]>([]);
    const [buttonsParams, setButtonsParams] = useState<IButton[]>([]);

    const [productMesh, setProductMesh] = useState<Object3D>();
    
    const url = `${API}/project/fbx`;
    const displayUrl = `${url}/${display.type}`;



    const displayFbx = useLoader(FBXLoader, displayUrl) as Object3D;


    useEffect(() => {
        // console.log("ProductPlaceholder", slotPlaceholder)
        // console.log("productFbx", displayFbx);
        if (!slotPlaceholder) return;

        const currentDisplay = displayFbx.children[0].clone();
        slotPlaceholder.getWorldPosition(currentDisplay.position);
        slotPlaceholder.getWorldQuaternion(currentDisplay.quaternion);

        const materialParams = display?.materialParams;
        if (materialParams && currentDisplay instanceof Mesh) {
            // console.log("currentDisplay", currentDisplay)
            buildTexture(materialParams, currentDisplay);
        }



        switch (display.type) {
            case 'Podium':
                const product = display?.products as IProduct[];
                if (!product || !product[0]) return;
                setProductMesh(currentDisplay.children[0].children[0])
                setTextMeshes(currentDisplay.children[1].children);
                setButtonMeshes(currentDisplay.children[2].children);

                currentDisplay.children[1].children = [];
                // console.log("currentDisplay.children[1].children", currentDisplay.children[1].children)

                const podium = product[0].buttons;

                    // const buttons = currentDisplay.children[2].children;
                    // buttons.forEach(button => {
                    //     const key = button.name as keyof typeof podium;
                    //     const btn = product[0].buttons[key] as IButton;
                    //     // console.log("button btn", key, btn)
                    //     setButtonsParams(prev => [...prev, btn]);
                    // })
                




            default:
                break;
        }



        const keys = Object.keys(display);


        displayRef.current?.add(currentDisplay);
    }, [displayFbx]);



    const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        const clickedPart = event.object;
        // console.log("handlePointerDown", clickedPart.name);

        // console.log("textMeshes", textMeshes);

        setCurrentMode(EMode.View);

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

        // <group ref={displayRef} onPointerDown={handlePointerDown}>

        //     {textMeshes.map((content, index) => {
        //         const key = content.name as keyof IProduct;
        //         const textParams = display.products?.[0][key] as IText;

        //         return (
        //             <group key={index}>
        //                 {display.products && textParams && (
        //                     <TextComponent placeholder={content} textParams={textParams} />
        //                 )}
        //             </group>
        //         );
        //     })}

        //     {buttonMeshes.map((content, index) => {
        //         const key = content.name as keyof IProduct;
        //         const buttonParams = display.products?.[0][key] as IButton;

        //         return (
        //             <group key={index}>
        //                 {display.products && buttonParams && (
        //                     <Button buttonMesh={content} buttonParams={buttonParams} />
        //                 )}
        //             </group>
        //         );
        //     })}

        // </group>



        <group ref={displayRef} onPointerDown={handlePointerDown}>

            {textMeshes.map((content, index) => (
                <group key={index}>
                    {display.products && <TextComponent placeholder={content} board={display.products[0]} />}
                </group>
            ))}

            {buttonMeshes.map((content, index) => (
                <group key={index}>
                    {display.products && <Button buttonMesh={content} buttonParams={buttonsParams[index]} />}
                </group>
            ))}

            {productMesh && display.products && (
                <BoundingBox>
                    <LoadProduct  slotPlaceholder={productMesh} display={display.products[0]} />
                </BoundingBox>
            )}
        </group>
    )
}

export default Display;