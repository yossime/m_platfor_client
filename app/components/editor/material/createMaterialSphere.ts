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

const loadTextureAsync = (url: string | undefined): Promise<THREE.Texture | null> => {
  if (!url) return Promise.resolve(null);
  if (textureCache[url]) return Promise.resolve(textureCache[url]);

  return new Promise((resolve, reject) => {
    textureLoader.load(
      url,
      (texture) => {
        textureCache[url] = texture;
        resolve(texture);
      },
      undefined,
      (error) => {
        console.error(`Failed to load texture from ${url}`, error);
        reject(error);
      }
    );
  });
};

export const createMaterialSphere = async ({
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

  const material = new THREE.MeshStandardMaterial({
    map: await loadTextureAsync(diffuseTexturePath),
    normalMap: await loadTextureAsync(normalTexturePath),
    roughnessMap: await loadTextureAsync(roughnessTexturePath),
    metalnessMap: await loadTextureAsync(metallicTexturePath),
    emissiveMap: await loadTextureAsync(emissionTexturePath),
    color: new THREE.Color(color),
    emissive: new THREE.Color(emissiveColor),
    emissiveIntensity: emissiveIntensity,
    opacity: opacity,
    transparent: opacity < 1,
  });

  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};
