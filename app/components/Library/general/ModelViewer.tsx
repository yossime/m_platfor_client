import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { uploadFile } from "@/services/upload.service";
import { v4 as uuidv4 } from 'uuid';



interface ModelViewerProps {
  model: File;
  type: "gltf" | "fbx";
  setScreenshotResponse: (url:string) => void;
  setModelResponse: (url:string) => void;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ model, type, setScreenshotResponse, setModelResponse }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const takeScreenshotAndUpload = async () => {
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      const dataURL = rendererRef.current.domElement.toDataURL('image/png');

      const blobBin = atob(dataURL.split(',')[1]);
      const array = [];
      for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      const file = new File([new Uint8Array(array)], `${uuidv4()}.png`, { type: 'image/png' });

      try {
        const screenshotResponse = await uploadFile(file);
        setScreenshotResponse(screenshotResponse)

        const modelResponse = await uploadFile(model);
        setModelResponse(modelResponse);
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
  
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#F5F6F8");
    
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer();
    rendererRef.current = renderer;
    
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
  
    const fileUrl = URL.createObjectURL(model);
  
    if (type === "gltf") {
      const loader = new GLTFLoader();
      loader.load(fileUrl, (gltf) => {
        scene.add(gltf.scene);
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 5 / maxDim;
        gltf.scene.scale.setScalar(scale);
        gltf.scene.position.sub(center.multiplyScalar(scale));
        camera.position.z = 5;
        animate();
        setTimeout(takeScreenshotAndUpload, 100);
      });
    } else if (type === "fbx") {
      const loader = new FBXLoader();
      loader.load(fileUrl, (fbx) => {
        scene.add(fbx);
        const box = new THREE.Box3().setFromObject(fbx);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 5 / maxDim;
        fbx.scale.setScalar(scale);
        fbx.position.sub(center.multiplyScalar(scale));
        camera.position.z = 5;
        animate();
        setTimeout(takeScreenshotAndUpload, 100);
      });
    }
  
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
  

  return (
    <div ref={containerRef} style={{ width: "300PX", height: "300px", border: "1px solid #C5C7D0" }} />
  );
};

export default ModelViewer;