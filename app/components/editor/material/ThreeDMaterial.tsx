import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { ICustomMaterial } from '../types';
import { createMaterial } from './createMaterialSphere';

interface ThreeDMaterialProps {
  material: ICustomMaterial;
  windowSize: number;
}

const ThreeDMaterial: React.FC<ThreeDMaterialProps> = ({ material, windowSize }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    let isMounted = true;
    const initScene = async () => {
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

      const materialInstance = await createMaterial(material);

      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const sphere = new THREE.Mesh(geometry, materialInstance);
      scene.add(sphere);

      const frameRate = 60;
      let lastRender = 0;

      const animate = (time: number) => {
        if (isMounted && time - lastRender >= 1000 / frameRate) {
          lastRender = time;
          renderer.render(scene, camera);
        }
        animationIdRef.current = requestAnimationFrame(animate);
      };

      animationIdRef.current = requestAnimationFrame(animate);

      return () => {
        isMounted = false;
        cancelAnimationFrame(animationIdRef.current!);

        sphere.geometry.dispose();
        if (sphere.material instanceof THREE.MeshPhysicalMaterial) {
          sphere.material.dispose();
          if (sphere.material.map) sphere.material.map.dispose();
          if (sphere.material.normalMap) sphere.material.normalMap.dispose();
          if (sphere.material.roughnessMap) sphere.material.roughnessMap.dispose();
          if (sphere.material.metalnessMap) sphere.material.metalnessMap.dispose();
          if (sphere.material.emissiveMap) sphere.material.emissiveMap.dispose();
        }
        renderer.dispose();
        scene.clear();
      };
    };

    initScene();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationIdRef.current!);
    };
  }, [material, windowSize]);

  return <canvas ref={canvasRef} width={windowSize} height={windowSize}></canvas>;
};

export default ThreeDMaterial;
