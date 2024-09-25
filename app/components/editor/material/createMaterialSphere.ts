import * as THREE from 'three';
import { MaterialProps } from './materials';

interface CreateMaterialSphereProps {
  material: MaterialProps;
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
}

const textureCache: { [url: string]: THREE.Texture } = {};
const textureLoader = new THREE.TextureLoader();

const loadTexture = (url: string | undefined): THREE.Texture | null => {
  if (!url) return null;
  if (textureCache[url]) return textureCache[url];

  const texture = textureLoader.load(url, undefined, undefined, (error) => {
    console.error(`Failed to load texture from ${url}`, error);
  });
  textureCache[url] = texture;
  return texture;
};

export const createMaterialSphere = ({
  material: {
    diffuseTexturePath,
    normalTexturePath,
    roughnessTexturePath,
    metallicTexturePath,
    emissionTexturePath,
    color = 0xffffff,
    emissiveColor = 0x000000,
    emissiveIntensity = 1,
    opacity = 1,
  },
  radius = 1,
  widthSegments = 32,
  heightSegments = 32,
}: CreateMaterialSphereProps): Promise<THREE.Mesh> => {
  const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

  return new Promise((resolve) => {
    const material = new THREE.MeshStandardMaterial({
      map: loadTexture(diffuseTexturePath),
      normalMap: loadTexture(normalTexturePath),
      roughnessMap: loadTexture(roughnessTexturePath),
      metalnessMap: loadTexture(metallicTexturePath),
      emissiveMap: loadTexture(emissionTexturePath),
      color: new THREE.Color(color),
      emissive: new THREE.Color(emissiveColor),
      emissiveIntensity: emissiveIntensity,
      opacity: opacity,
      transparent: opacity < 1,
    });

    const mesh = new THREE.Mesh(geometry, material);
    resolve(mesh);
  });
};
