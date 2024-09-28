import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { createMaterialSphere } from './createMaterialSphere';
import { MaterialProps } from './materials';

interface ThreeDMaterialProps {
  material: MaterialProps;
  windowSize: number;
}

const ThreeDMaterial: React.FC<ThreeDMaterialProps> = ({
  material,
  windowSize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return; 

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(windowSize, windowSize);

    const aspectRatio = canvasRef.current.clientWidth / canvasRef.current.clientHeight || 1;
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    const radius = windowSize / 2;
    camera.position.z = radius * 1.8;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    createMaterialSphere({ material, radius }).then((sphere) => {
      scene.add(sphere);

      const animate = () => {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.001;
        renderer.render(scene, camera);
      };

      animate();
    });

    return () => {
      renderer.dispose();
      scene.clear();
    };
  }, [
    material.diffuseTexturePath,
    material.normalTexturePath,
    material.roughnessTexturePath,
    material.metallicTexturePath,
    material.emissionTexturePath,
    material.color,
    material.emissiveColor,
    material.emissiveIntensity,
    material.opacity,
    windowSize,
  ]);

  return <canvas ref={canvasRef} width={windowSize} height={windowSize}></canvas>;
};

export default ThreeDMaterial;
