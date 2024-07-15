import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';


function loadHDRITexture(url: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      new RGBELoader().load(
        url,
        function (texture) {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          resolve(texture);
        },
        undefined,
        function (err) {
          console.error('An error occurred while loading the HDRI texture:', err);
          reject(err);
        }
      );
    });
  }
  
 export function CustomEnvironment({ url }: { url: string }) {
    const { scene } = useThree();
  
    useEffect(() => {
      loadHDRITexture(url).then((texture) => {
        scene.background = texture;
        scene.environment = texture;
        console.log('HDRI texture loaded successfully:', texture);
      }).catch((err) => console.error('Error loading HDRI texture:', err));
    }, [scene, url]);
  
    return null;
  }
  