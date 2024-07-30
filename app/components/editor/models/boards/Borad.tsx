import { useLoader, ThreeEvent } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { Object3D, Group, TextureLoader, Mesh, MeshStandardMaterial, Color, Vector3, Euler, CanvasTexture, Material } from "three";
import { FBXLoader, FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { IBoard, MaterialParams, IText, IProductBoard, IDisplay, IThreeDModel, IProduct } from "../../interface/paramsType";
import { LoadMaterial } from "../../loadMaterial";
import { useVideoTexture } from "@react-three/drei";
// import TextLoader, { ContentsProps } from "../../TextLoader";
import { EMode, useEditor } from "@/context/useEditorContext";
import { Text } from '@react-three/drei';
// import TextComponent from "../../TextLoader";
import Display from "../display/Display";
import TextComponent from "../../TextLoader";



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

    const { setCurrentMode } = useEditor();
    const [textMeshes, setTextMeshes] = useState<Mesh[]>([]);
    const [modleComponents, setModleComponents] = useState<IThreeDModel[]>([]);
    const [modelsSlots, setModelsSlots] = useState<Object3D[]>([]);

    const url = `${API}/project/fbx`;
    const boradUrl = `${url}/${board.type}`;

    const boradFbx = useLoader(FBXLoader, boradUrl) as Object3D;
    const urlT = "https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/textura_4.jpeg?alt=media&token=642299bf-7758-4516-a0ae-9ac132c26c9f"
    const texture = useLoader(TextureLoader, urlT)
    useEffect(() => {
        const materialParams = board?.materialParams;
        if (!materialParams) return;


        const getTexture = async (materialParams: MaterialParams, mash: Mesh) => {
            const boradMaterial = await LoadMaterial(materialParams)
            if (materialParams.video) {
                // const videoTexture = useVideoTexture(materialParams.video);
                // boradMaterial.map = videoTexture;
            }
            mash.material = boradMaterial;
        }
        const currentBorad = boradFbx.children[0].clone();

        getTexture(materialParams, currentBorad as Mesh);
    }, [board?.materialParams]);


    useEffect(() => {
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
                const productsSlots = currentBorad.children[0].children;
                productsSlots.sort((a, b) => {
                    const numA = parseInt(a.name.split('_')[1]);
                    const numB = parseInt(b.name.split('_')[1]);
                    return numA - numB;
                });
                setModelsSlots(productsSlots)
                currentBorad.children[0].children = [];

                const boardDisplays = (board as IProductBoard).displays;
                setModleComponents(boardDisplays);
                // boardDisplays.forEach((display: IDisplay) => {
                //     setModleComponents(prev => [...prev, ...(display.products as IProduct[])]);
                // })

                break;

            case 'HeaderBoard':
                // console.log("boradFbx.children[0].children", boradFbx);

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

        boardsRef.current?.add(currentBorad);
    }, [boradFbx]);


    const handlePointerDown = async (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        const clickedPart = event.object;
        console.log("handlePointerDown", clickedPart.name);

        setCurrentMode(EMode.View);


        if (clickedPart instanceof Mesh) {
            // console.log("clicked", modleCpntent);
            const highlightMaterial = new MeshStandardMaterial({
                // color: new Color('red'),
                // opacity: 0.5,
                // transparent: true,
                // wireframe: true,
                map: texture,
                // onBeforeRender: (renderer, scene, camera, geometry, material) => {
                //     material.map.needsUpdate = true;
                // }
            });

            const offset = [-0.5, -0.5]
            const repeat = [2, 2]
            texture.offset.set(offset[0], offset[1]);
            texture.repeat.set(repeat[0], repeat[1]);


            // clickedPart.material = highlightMaterial;
        }
    };

    return (
        <group ref={boardsRef} onPointerDown={handlePointerDown}>

            {modleComponents?.map((product, index) => (
                <group key={index}>
                    <Display display={product} slotPlaceholder={modelsSlots[index]} />
                </group>
            ))}

            {/* {textMeshes.map((content, index) => {
                const key = content.name as keyof IThreeDModel;
                const textParams = board[key] as IText;

                return (
                    <group key={index}>
                        {textParams && (
                            <TextComponent placeholder={content} textParams={textParams} />
                        )}
                    </group>
                );
            })} */}

            {textMeshes.map((content, index) => (
                <group key={index}>
                    <TextComponent placeholder={content} board={board} />
                </group>
            ))}
        </group>
    )
}

export default Board;