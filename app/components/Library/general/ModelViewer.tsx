import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface ModelViewerProps {
  model: File;
  type: "gltf" | "fbx";
}

const ModelViewer: React.FC<ModelViewerProps> = ({ model, type }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#F5F6F8");
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05; 
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);

    const reader = new FileReader();

    reader.onload = (event) => {
      const modelDataUrl = event.target?.result;
      if (typeof modelDataUrl === "string") {
        if (type === "gltf") {
          const loader = new GLTFLoader();
          loader.load(modelDataUrl, (gltf) => {
            scene.add(gltf.scene);
            animate();
          });
        } else if (type === "fbx") {
          const loader = new FBXLoader();
          loader.load(modelDataUrl, (fbx) => {
            scene.add(fbx);
            animate();
          });
        }
      }
    };

    reader.readAsDataURL(model);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    return () => {
      while (containerRef.current?.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
    };
  }, [model, type]);

  return <div ref={containerRef} style={{ width: "100%", height: "300px", border: "#5972e4", }} />;
};

export default ModelViewer;
