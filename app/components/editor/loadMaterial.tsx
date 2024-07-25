import { Texture, TextureLoader, MeshStandardMaterial, MeshStandardMaterialParameters, Color } from "three";
import { MaterialParams } from "./paramsType";





const loadTexture = async (texturePath?: string): Promise<Texture | null> => {
    if (!texturePath) return null;
    const loader = new TextureLoader();
    return await new Promise((resolve, reject) => {
      loader.load(texturePath, resolve, undefined, reject);
    });
  };



  export const LoadMaterial = async (materialParams: MaterialParams): Promise<MeshStandardMaterial> => {
    const highlightMaterialParams: MeshStandardMaterialParameters = {};

    const {color, map, alphaMap, opacity} = materialParams;
  
    if (color !== undefined) {
      highlightMaterialParams.color = new Color(color);
    }
  
    if (map !== undefined) {
      highlightMaterialParams.map = await loadTexture(map);
    }
  
    if (alphaMap !== undefined) {
        highlightMaterialParams.alphaMap = await loadTexture(alphaMap);
    }
  
    if (opacity !== undefined) {
        highlightMaterialParams.opacity = opacity;
    }
  
    const highlightMaterial = new MeshStandardMaterial(highlightMaterialParams);
  
    return highlightMaterial;
  };
