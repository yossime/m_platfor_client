

// import * as THREE from 'three';
// import { Text } from 'troika-three-text';
// import Stats from 'stats.js';
// import { GUI } from 'dat.gui';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';


// // Initialize scene, camera, and renderer
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Initialize stats
// const stats = new Stats();
// document.body.appendChild(stats.dom);

// // Initialize GUI
// const gui = new GUI();
// const textMesh = new Text();

// scene.add(textMesh);

// // Default text options
// const textOptions = {
//     text: `November 19, 1863`,
//     fontSize: 1,
//     color: '#ffffff',
//     anchorX: 'center',
//     anchorY: 'middle',
//     textAlign: 'center',
//     strokeColor: '#000000',
//     strokeWidth: 0,
//     maxWidth: 3,
//     outline: false,
//     curve: true,
//     curveRadius: 0,
//     // curveSegments: 32,
//     fbxPath: 'borads_image_frame.fbx',
//     meshName: 'self',
// };

// let fbxMesh;

// // Initialize text mesh
// const initTextMesh = () => {
//     Object.assign(textMesh, {
//         text: textOptions.text,
//         fontSize: textOptions.fontSize,
//         color: textOptions.color,
//         strokeColor: textOptions.strokeColor,
//         strokeWidth: textOptions.strokeWidth,
//         curveRadius: textOptions.curveRadius,
//         maxWidth: textOptions.maxWidth,
//         textAlign: 'center',
//         anchorX: 'center',
//         anchorY: 'middle',
//         glyphGeometryDetail: 1
//     });
//     textMesh.position.set(0, 0, -textOptions.curveRadius);
//     textMesh.rotation.y = 0; // Changed from Math.PI to 0
//     textMesh.scale.x = -1; // Flip horizontally to correct mirroring
// };

// const loadFBXModel = () => {
//     const loader = new FBXLoader();
//     loader.load(textOptions.fbxPath, (fbx) => {
//         fbxMesh = fbx.getObjectByName(textOptions.meshName);
//         if (fbxMesh) {
//             scene.add(fbx);
//             updateTextToFBXMesh();
//         } else {
//             console.error(`Mesh named ${textOptions.meshName} not found in the FBX model.`);
//         }
//     }, undefined, (error) => {
//         console.error('An error happened while loading the FBX model:', error);
//     });
// };

// // Update text to match FBX mesh
// const updateTextToFBXMesh = () => {
//     if (!fbxMesh) return;

//     const boundingBox = new THREE.Box3().setFromObject(fbxMesh);
//     const center = boundingBox.getCenter(new THREE.Vector3());
//     const size = boundingBox.getSize(new THREE.Vector3());

//     // Adjust curve radius based on the size of the FBX mesh
//     const newRadius = Math.max(size.x, size.y, size.z) / 2;
//     textOptions.curveRadius = newRadius;

//     // Position text at the center of the FBX mesh
//     textMesh.position.copy(center);
//     textMesh.position.z += newRadius; // Move text behind the mesh center

//     // Ensure text is facing outward
//     textMesh.rotation.y = 0;
//     textMesh.scale.x = -1;

//     updateCurveRadius(newRadius);
// };


// // GUI controls setup
// const setupGUI = () => {
//     gui.add(textOptions, 'text').onChange(updateText);
//     gui.add(textOptions, 'fontSize', 0.1, 5).onChange(updateFontSize);
//     gui.addColor(textOptions, 'color').onChange(updateColor);
//     gui.addColor(textOptions, 'strokeColor').onChange(updateStrokeColor);
//     gui.add(textOptions, 'strokeWidth', 0, 0.1).onChange(updateStrokeWidth);
//     gui.add(textOptions, 'curveRadius', 5, 50).onChange(updateCurveRadius);
//     gui.add(textOptions, 'maxWidth', 5, 50).onChange(updateMaxWidth);
//     // gui.add(textOptions, 'curveSegments', 4, 64, 1).onChange(updateCurveSegments);
//     gui.add(textOptions, 'fbxPath').onChange(loadFBXModel);
//     gui.add(textOptions, 'meshName').onChange(() => {
//         if (fbxMesh) updateTextToFBXMesh();
//     });
// };

// // Update functions
// const updateText = (value) => {
//     textMesh.text = value;
//     updateCurveRadius(textOptions.curveRadius);
// };

// const updateFontSize = (value) => {
//     textMesh.fontSize = value;
//     updateCurveRadius(textOptions.curveRadius);
// };

// const updateColor = (value) => {
//     textMesh.color = value;
// };

// const updateStrokeColor = (value) => {
//     textMesh.strokeColor = value;
// };

// const updateStrokeWidth = (value) => {
//     textMesh.strokeWidth = value;
// };


// const updateMaxWidth = (value) => {
//     textMesh.maxWidth = value;
// };

// const updateCurveRadius = (value) => {
//     console.log('curve radius', value);
//     textOptions.curveRadius = value ;
//     textMesh.curveRadius = value * -1;
//     textMesh.maxWidth = Math.PI * 2 * value;
//     textMesh.position.z = -value;
//     textMesh.sync();
// };

// // const updateCurveSegments = (value) => {
// //     textOptions.curveSegments = value;
// //     textMesh.curveSegments = value;
// //     textMesh.sync();
// // };

// // Handle window resize
// const onWindowResize = () => {
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     renderer.setSize(width, height);
//     camera.aspect = width / height;
//     camera.updateProjectionMatrix();
// };

// // Animation loop
// const animate = () => {
//     requestAnimationFrame(animate);

//     // Ensure text always faces the camera
//     if (fbxMesh) {
//         const cameraPosition = camera.position.clone();
//         cameraPosition.y = textMesh.position.y; // Keep the same height as the text
//         textMesh.lookAt(cameraPosition);
//         textMesh.rotation.y += Math.PI; // Rotate 180 degrees to face outward
//     }

//     textMesh.sync();
//     renderer.render(scene, camera);
//     stats.update();
// };

// // Initialize everything
// const init = () => {
//     initTextMesh();
//     loadFBXModel();
//     setupGUI();
//     camera.position.z = 15;
//     window.addEventListener('resize', onWindowResize);
//     animate();
// };

// init();



import * as THREE from "three";
import { Text as TroikaText } from 'troika-three-text';


export interface TextOptions {
    text?: string;
    fontSize?: number;
    color?: string;
    anchorX?: string;
    anchorY?: string;
    textAlign?: string;
    strokeColor?: string;
    strokeWidth?: number;
    maxWidth?: number;
    outline?: boolean;
    curve?: boolean;
    curveRadius?: number;
    fbxPath?: string;
    meshName?: string;
}

export class CurveText {
    private textMesh: TroikaText;

    constructor(options?: TextOptions) {
        this.textMesh = new TroikaText();
        // this.initTextMesh();


        const textOptions = {
            text: `November 19, 1863 const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);`,
            fontSize: 0.01,
            color: '#d96b6b',
            anchorX: 'center',
            anchorY: 'middle',
            textAlign: 'center',
            strokeColor: '#000000',
            strokeWidth: 0,
            maxWidth: 3,
            outline: false,
            curve: true,
            curveRadius: 0.1,
            // curveSegments: 32,
        };
        

        if (textOptions) {
            this.initTextMesh(textOptions);
        }
    }

    // private initTextMesh = () => {
    //     this.textMesh.rotation.y = 1;
    //     this.textMesh.scale.x = -1;
    //     this.textMesh.glyphGeometryDetail = 1;
    //     this.textMesh.textAlign = 'center';
    //     this.textMesh.anchorX = 'center';
    //     this.textMesh.anchorY = 'middle';
    //     this.textMesh.curveRadius = 5;
    // };


    initTextMesh(textOptions: TextOptions) {
        Object.assign(this.textMesh, {
            text: textOptions.text,
            fontSize: textOptions.fontSize,
            color: textOptions.color,
            anchorX: textOptions.anchorX,
            anchorY: textOptions.anchorY,
            textAlign: textOptions.textAlign,
            strokeColor: textOptions.strokeColor,
            strokeWidth: textOptions.strokeWidth,
            curveRadius: textOptions.curveRadius,
            maxWidth: textOptions.maxWidth,
            glyphGeometryDetail: 1
        });
        // this.textMesh.position.set(0, 0, -textOptions.curveRadius!);
        // this.textMesh.rotation.y = 0;
        // this.textMesh.scale.x = -1;
        console.log('this.textMesh', this.textMesh);
    };

    
    getRadiusFromMesh = (mesh: THREE.Mesh) => {
        if (!mesh) return;
    
        const boundingBox = new THREE.Box3().setFromObject(mesh);
        const center = boundingBox.getCenter(new THREE.Vector3());
        const size = boundingBox.getSize(new THREE.Vector3());
    
        const radius = Math.max(size.x, size.y, size.z) / 2;
        // textOptions.curveRadius = radius;
    
        // Position text at the center of the FBX mesh
        console.log('center', center)
        // this.textMesh.position.copy(center);
        // this.textMesh.position.z += radius; // Move text behind the mesh center
    
        // // Ensure text is facing outward
        this.textMesh.rotation.y = 0;

        this.textMesh.color = '#d96b6b';
        
        console.log(this.textMesh)
        // this.updateCurveRadius(radius);
    };

    update(textOptions: TextOptions) {
        Object.assign(this.textMesh, {
            text: textOptions.text,
            // fontSize: textOptions.fontSize,
            // color: textOptions.color,
            // strokeColor: textOptions.strokeColor,
            // strokeWidth: textOptions.strokeWidth,
            // curveRadius: textOptions.curveRadius,
            // maxWidth: textOptions.maxWidth,
            // anchorX: textOptions.anchorX || this.textMesh.anchorX,
            // anchorY: textOptions.anchorY || this.textMesh.anchorY,
            // textAlign: textOptions.textAlign || this.textMesh.textAlign,
        });

        // if (textOptions.curve !== undefined) {
        //     this.textMesh.curveRadius = textOptions.curve ? (textOptions.curveRadius || 1) : 0;
        // }

        this.textMesh.sync();
    }

    updateCurveRadius(radius: number) {
        this.textMesh.curveRadius = radius * -1;
        this.textMesh.maxWidth = Math.PI * 2 * radius;
        // this.textMesh.position.z = -radius;
        this.textMesh.sync();
    }
    setPosition(position: THREE.Vector3) {
        this.textMesh.position.copy(position);
    }

    lookAt(target: THREE.Vector3) {
        this.textMesh.lookAt(target);
        this.textMesh.rotation.y += Math.PI; // Rotate 180 degrees to face outward
    }

    getMesh(): TroikaText {
        return this.textMesh;
    }

}

