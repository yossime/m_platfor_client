

import * as THREE from 'three';
import { Text } from 'troika-three-text';
import Stats from 'stats.js';
import { GUI } from 'dat.gui';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';


// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initialize stats
const stats = new Stats();
document.body.appendChild(stats.dom);

// Initialize GUI
const gui = new GUI();
const textMesh = new Text();

scene.add(textMesh);

// Default text options
const textOptions = {
    text: `November 19, 1863`,
    fontSize: 1,
    color: '#ffffff',
    anchorX: 'center',
    anchorY: 'middle',
    textAlign: 'center',
    strokeColor: '#000000',
    strokeWidth: 0,
    maxWidth: 3,
    outline: false,
    curve: true,
    curveRadius: 0,
    // curveSegments: 32,
    fbxPath: 'borads_image_frame.fbx',
    meshName: 'self',
};

let fbxMesh;

// Initialize text mesh
const initTextMesh = () => {
    Object.assign(textMesh, {
        text: textOptions.text,
        fontSize: textOptions.fontSize,
        color: textOptions.color,
        strokeColor: textOptions.strokeColor,
        strokeWidth: textOptions.strokeWidth,
        curveRadius: textOptions.curveRadius,
        maxWidth: textOptions.maxWidth,
        textAlign: 'center',
        anchorX: 'center',
        anchorY: 'middle',
        glyphGeometryDetail: 1
    });
    textMesh.position.set(0, 0, -textOptions.curveRadius);
    textMesh.rotation.y = 0; // Changed from Math.PI to 0
    textMesh.scale.x = -1; // Flip horizontally to correct mirroring
};

const loadFBXModel = () => {
    const loader = new FBXLoader();
    loader.load(textOptions.fbxPath, (fbx) => {
        fbxMesh = fbx.getObjectByName(textOptions.meshName);
        if (fbxMesh) {
            scene.add(fbx);
            updateTextToFBXMesh();
        } else {
            console.error(`Mesh named ${textOptions.meshName} not found in the FBX model.`);
        }
    }, undefined, (error) => {
        console.error('An error happened while loading the FBX model:', error);
    });
};

// Update text to match FBX mesh
const updateTextToFBXMesh = () => {
    if (!fbxMesh) return;

    const boundingBox = new THREE.Box3().setFromObject(fbxMesh);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());

    // Adjust curve radius based on the size of the FBX mesh
    const newRadius = Math.max(size.x, size.y, size.z) / 2;
    textOptions.curveRadius = newRadius;

    // Position text at the center of the FBX mesh
    textMesh.position.copy(center);
    textMesh.position.z += newRadius; // Move text behind the mesh center

    // Ensure text is facing outward
    textMesh.rotation.y = 0;
    textMesh.scale.x = -1;

    updateCurveRadius(newRadius);
};


// GUI controls setup
const setupGUI = () => {
    gui.add(textOptions, 'text').onChange(updateText);
    gui.add(textOptions, 'fontSize', 0.1, 5).onChange(updateFontSize);
    gui.addColor(textOptions, 'color').onChange(updateColor);
    gui.addColor(textOptions, 'strokeColor').onChange(updateStrokeColor);
    gui.add(textOptions, 'strokeWidth', 0, 0.1).onChange(updateStrokeWidth);
    gui.add(textOptions, 'curveRadius', 5, 50).onChange(updateCurveRadius);
    gui.add(textOptions, 'maxWidth', 5, 50).onChange(updateMaxWidth);
    // gui.add(textOptions, 'curveSegments', 4, 64, 1).onChange(updateCurveSegments);
    gui.add(textOptions, 'fbxPath').onChange(loadFBXModel);
    gui.add(textOptions, 'meshName').onChange(() => {
        if (fbxMesh) updateTextToFBXMesh();
    });
};

// Update functions
const updateText = (value) => {
    textMesh.text = value;
    updateCurveRadius(textOptions.curveRadius);
};

const updateFontSize = (value) => {
    textMesh.fontSize = value;
    updateCurveRadius(textOptions.curveRadius);
};

const updateColor = (value) => {
    textMesh.color = value;
};

const updateStrokeColor = (value) => {
    textMesh.strokeColor = value;
};

const updateStrokeWidth = (value) => {
    textMesh.strokeWidth = value;
};


const updateMaxWidth = (value) => {
    textMesh.maxWidth = value;
};

const updateCurveRadius = (value) => {
    console.log('curve radius', value);
    textOptions.curveRadius = value ;
    textMesh.curveRadius = value * -1;
    textMesh.maxWidth = Math.PI * 2 * value;
    textMesh.position.z = -value;
    textMesh.sync();
};

// const updateCurveSegments = (value) => {
//     textOptions.curveSegments = value;
//     textMesh.curveSegments = value;
//     textMesh.sync();
// };

// Handle window resize
const onWindowResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
};

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    
    // Ensure text always faces the camera
    if (fbxMesh) {
        const cameraPosition = camera.position.clone();
        cameraPosition.y = textMesh.position.y; // Keep the same height as the text
        textMesh.lookAt(cameraPosition);
        textMesh.rotation.y += Math.PI; // Rotate 180 degrees to face outward
    }
    
    textMesh.sync();
    renderer.render(scene, camera);
    stats.update();
};

// Initialize everything
const init = () => {
    initTextMesh();
    loadFBXModel();
    setupGUI();
    camera.position.z = 15;
    window.addEventListener('resize', onWindowResize);
    animate();
};

init();

