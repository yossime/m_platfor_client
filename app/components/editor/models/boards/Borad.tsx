import { useLoader, ThreeEvent } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { Object3D, Group, TextureLoader, Mesh, MeshStandardMaterial, Color, Vector3, Euler, CanvasTexture } from "three";
import { FBXLoader, FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { IBoard, MaterialParams, IText, IProductBoard, IDisplay, IThreeDModel } from "../../interface/paramsType";
import { LoadMaterial } from "../../loadMaterial";
import { Html, useAspect, useVideoTexture } from "@react-three/drei";
// import TextLoader from "../../TextLoader";
import Video from "../../Video";
import TextLoader, { ContentsProps } from "../../TextLoader";
import { EMode, useEditor } from "@/context/useEditorContext";
import { Text } from '@react-three/drei';
import ImageR from "../../Image";
import TextComponent from "../../TextLoader";
import Product from "../display/Product";



const API = process.env.NEXT_PUBLIC_BACKEND_URL!


const buildTexture = async (materialParams: MaterialParams, mash: Mesh) => {
    const boradMaterial = await LoadMaterial(materialParams)
    mash.material = boradMaterial;
}


interface BoardLoaderProps {
    board: IBoard;
    slotPlaceholder: Object3D;
}

const Board: React.FC<BoardLoaderProps> = ({ board, slotPlaceholder }) => {

    if (board && !board.type) return null;

    const boardsRef = useRef<Group>(null);

    const { setCurrentMode, setActiveBoardIndex } = useEditor();
    const [mediaSlots, setMediaSlots] = useState<Object3D[]>([]);
    const [selectedBorad, setSelectedBorad] = useState<Object3D | null>(null);
    const [textMeshes, setTextMeshes] = useState<Mesh[]>([]);
    const [modleCpntent, setModleCpntent] = useState<IThreeDModel[]>([]);
    const [modelsSlots, setModelsSlots] = useState<Object3D[]>([]);
    const url = `${API}/project/fbx`;
    const boradUrl = `${url}/${board.type}`;



    const boradFbx = useLoader(FBXLoader, boradUrl) as Object3D;

    // const products = (board as ProductBoard).product;



    useEffect(() => {
        // console.log("boradPlaceholder", boradFbx)
        if (!slotPlaceholder) return;

        const currentBorad = boradFbx.children[0].clone();

        slotPlaceholder.getWorldPosition(currentBorad.position);
        slotPlaceholder.getWorldQuaternion(currentBorad.quaternion);


        const materialParams = board?.materialParams;
        if (materialParams && currentBorad instanceof Mesh) {
            buildTexture(materialParams, currentBorad);
        }


        const keys = Object.keys(board);

        switch (board.type) {
            case 'ProductBoard':
                const productsSlots = currentBorad.children[1].children;
                // console.log("products", productsSlots)
                setModleCpntent(productsSlots)
                // console.warn("curr bo   ", board)
                const products = (board as IProductBoard).displays[0].products!;
                setModleCpntent(products);
                break;

            case 'HeaderBoard':
                console.log("boradFbx.children[0].children", boradFbx);

                break;

            case 'ImageBoard':
                break;

            default:
                break;
        }

        // console.log("keys", keys);

        currentBorad.traverse((child) => {
            if (child instanceof Mesh) {
                if (keys.includes(child.name)) {
                    const key = child.name as keyof IBoard;
                    if (board[key] as IText) {

                        setTextMeshes(prev => [...prev, child]);
                        child.visible = false;
                    }
                }
            }
        })

        selectedBorad?.parent?.remove(selectedBorad);












        boardsRef.current?.add(currentBorad);
    }, [boradFbx]);


    const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        const clickedPart = event.object;
        console.log("handlePointerDown", clickedPart.name);

        setCurrentMode(EMode.View);

        if (clickedPart instanceof Mesh) {
            console.log("clicked", modleCpntent);
            const highlightMaterial = new MeshStandardMaterial({
                color: new Color('red'),
                opacity: 0.5,
                transparent: true,
                wireframe: true,
                // map: texture,
            });

            clickedPart.material = highlightMaterial;
        }

    };



    return (
        <group ref={boardsRef} onPointerDown={handlePointerDown}>

            {modleCpntent?.map((product, index) => (
                <group key={index}>
                    <Product product={product} slotPlaceholder={modelsSlots[index]} />
                </group>
            ))}

            {textMeshes.map((content, index) => (
                <group key={index}>
                    <TextComponent placeholder={content} board={board} />
                </group>
            ))}
        </group>
    )
}

export default Board;