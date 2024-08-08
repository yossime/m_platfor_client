import { useEffect, useRef, useState } from "react";
import { Group, Mesh, Object3D } from "three";
import { IButton, MaterialParams } from "../../interface/paramsType";
import TextComponent from "../../TextLoader";
import { LoadMaterial } from "../../loadMaterial";




interface buttonProps {
    buttonParams: IButton;
    buttonMesh: Object3D;
}

const Button: React.FC<buttonProps> = ({ buttonParams , buttonMesh }) => {
    const [textMeshes, setTextMeshes] = useState<Object3D[]>([]);

    // console.log("buttonMesh.children", buttonMesh.children)
    const buttonRef = useRef<Group>(null);

    const buildTexture = async (materialParams: MaterialParams, mash: Mesh) => {
        const boradMaterial = await LoadMaterial(materialParams)
        mash.material = boradMaterial;
    }
    
    
    useEffect(() => {
        if(buttonMesh.children) {
            setTextMeshes(buttonMesh.children[0].children);
        }

        if(buttonMesh instanceof Mesh && buttonParams?.material) {
            // console.log("buttonParams.material, buttonMesh", buttonParams.material, buttonMesh)
            buildTexture(buttonParams?.material, buttonMesh);
        }

    });



    return (

        
        <group ref={buttonRef}>

            {textMeshes.map((content, index) => (
                <group key={index}>
                    <TextComponent placeholder={content} board={buttonParams} />
                </group>
            ))}
        </group>
    )
}

export default Button;