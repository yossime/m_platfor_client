import * as THREE from "three";
import { ICustomMaterial, ITextureSource } from "../types";
import { faceDirection } from "three/examples/jsm/nodes/Nodes.js";

const textureCache: Map<string, THREE.Texture> = new Map();
const textureLoader = new THREE.TextureLoader();

const loadTextureAsync = async (source: ITextureSource | undefined): Promise<THREE.Texture | null> => {
  if (!source || !source.map) return null;

  const url = typeof source.map === 'string' ? source.map : URL.createObjectURL(source.map);

  if (textureCache.has(url)) return textureCache.get(url)!;

  try {
    const texture = await new Promise<THREE.Texture>((resolve, reject) => {
      textureLoader.load(url, (loadedTexture) => {
        loadedTexture.flipY = false; 
        loadedTexture.premultiplyAlpha = false;
        resolve(loadedTexture);
      }, undefined, reject);
    });
    textureCache.set(url, texture);

    if (typeof source.map !== 'string') {
      URL.revokeObjectURL(url);
    }

    return texture;
  } catch {
    return new THREE.Texture();
  }
};
export const createMaterial = async ({
  diffuse,
  normal,
  roughness,
  metalness,
  emission,
  opacity = { value: 1 },
  tint,
}: ICustomMaterial): Promise<THREE.MeshPhysicalMaterial> => {
  const material = new THREE.MeshPhysicalMaterial({
    map: null,
    normalMap: null,
    roughnessMap: null,
    metalnessMap: null,
    emissiveMap: null,
    color: new THREE.Color(diffuse?.color || 0xffffff),
    emissive: new THREE.Color(emission?.color || 0x000000),
    emissiveIntensity: emission?.intensity || 1,
    roughness: roughness?.value || 1,
    metalness: metalness?.value || 0,
    opacity: opacity.value || 1,
    transparent: (opacity?.value ?? 1) < 1,
    reflectivity: tint?.value || 0.5,
    displacementScale: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.5,
  });

  const textures = await Promise.all([
    loadTextureAsync(diffuse),
    loadTextureAsync(normal),
    loadTextureAsync(roughness),
    loadTextureAsync(metalness),
    loadTextureAsync(emission),
  ]);

  [
    material.map,
    material.normalMap,
    material.roughnessMap,
    material.metalnessMap,
    material.emissiveMap,
  ] = textures;

  material.needsUpdate = true;

  return material;
};
