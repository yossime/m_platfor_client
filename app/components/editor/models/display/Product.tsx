import { useLoader, ThreeEvent } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { Object3D, Group, TextureLoader, Mesh, MeshStandardMaterial, Color, Vector3, Euler, CanvasTexture } from "three";
import { FBXLoader, FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { IBoard, MaterialParams, IText, IProduct, ThreeDModel } from "../../paramsType";
import { LoadMaterial } from "../../loadMaterial";
import { Html, useAspect, useVideoTexture } from "@react-three/drei";
// import TextLoader from "../../TextLoader";
import Video from "../../Video";
import TextLoader, { ContentsProps } from "../../TextLoader";
import { EMode, useEditor } from "@/context/useEditorContext";
import { Text } from '@react-three/drei';
import ImageR from "../../Image";
import TextComponent from "../../TextLoader";

const API = process.env.NEXT_PUBLIC_BACKEND_URL!


const buildTexture = async (materialParams: MaterialParams, mash: Mesh) => {
    const boradMaterial = await LoadMaterial(materialParams)
    mash.material = boradMaterial;
}


interface BoardLoaderProps {
    product: ThreeDModel;
    slotPlaceholder: Object3D;
}

const Product: React.FC<BoardLoaderProps> = ({ product, slotPlaceholder }) => {

    if (product && !product.type) return null;

    const productRef = useRef<Group>(null);

    const { setCurrentMode } = useEditor();
    const [mediaSlots, setMediaSlots] = useState<Object3D[]>([]);
    const [selectedBorad, setSelectedBorad] = useState<Object3D | null>(null);
    const [textMeshes, setTextMeshes] = useState<Mesh[]>([]);
    const [modleCpntent, setModleCpntent] = useState<Object3D[]>([]);

    const url = `${API}/project/fbx`;
    const productUrl = `${url}/${product.type}`;



    const productFbx = useLoader(FBXLoader, productUrl) as Object3D;


    useEffect(() => {
        console.log("ProductPlaceholder", slotPlaceholder)
        if (!slotPlaceholder) return;

        const currentProduct = productFbx.clone();

        slotPlaceholder.getWorldPosition(currentProduct.position);
        slotPlaceholder.getWorldQuaternion(currentProduct.quaternion);


        const materialParams = product?.materialParams;
        if (materialParams && currentProduct instanceof Mesh) {
            buildTexture(materialParams, currentProduct);
        }


        const keys = Object.keys(product);

        // switch (product.type) {
        //     case 'ProductBoard':
        //         break;

        //     case 'HeaderBoard':
        //         console.log("boradFbx.children[0].children", productFbx);

        //         break;

        //     case 'ImageBoard':
        //         break;

        //     default:
        //         break;
        // }

        console.log("keys", keys);

        // currentProduct.traverse((child) => {
        //     if (child instanceof Mesh) {
        //         if (keys.includes(child.name)) {
        //             const key = child.name as keyof IProduct;
        //             if (product[key] as IText) {

        //                 setTextMeshes(prev => [...prev, child]);
        //                 child.visible = false;
        //             }
        //         }
        //     }
        // })

        // selectedBorad?.parent?.remove(selectedBorad);

        productRef.current?.add(currentProduct);
    }, [productFbx]);



    const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        const clickedPart = event.object;
        console.log("handlePointerDown", clickedPart.name);


        setCurrentMode(EMode.View);

        if (clickedPart instanceof Mesh) {
            // console.log("clicked");
            const highlightMaterial = new MeshStandardMaterial({
                color: new Color('purple'),
                opacity: 0.5,
                transparent: true,
                wireframe: true,
                // map: texture,
            });

            clickedPart.material = highlightMaterial;
        }

    };


    return (
        <group ref={productRef} onPointerDown={handlePointerDown}>

            {textMeshes.map((content, index) => (
                <group key={index}>
                    <TextComponent placeholder={content} board={product} />
                </group>
            ))}
        </group>
    )
}

export default Product;