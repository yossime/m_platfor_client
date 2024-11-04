
// import { Mesh, Object3D, Object3DEventMap } from 'three';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// export interface EventsOptions {
//     onProgress?: (event: ProgressEvent) => void;
//     onLoaded?: (event: Object3D) => void;
//     onError?: (event: ErrorEvent) => void;
// }

// export class ModelLoader {
//     private gltfLoader: GLTFLoader;
//     private fbxLoader: FBXLoader;

//     constructor() {
//         this.gltfLoader = new GLTFLoader();
//         this.fbxLoader = new FBXLoader();
//     }

//     public loadModel(url: string, eventsOptions?: EventsOptions): Promise<Object3D> {
//         const extension = url.split('.').pop()?.toLowerCase();

//         switch (extension) {
//             case 'gltf':
//             case 'glb':
//                 return this.loadGLTF(url);
//             case 'fbx':
//                 return this.loadFBX(url);
//             default:
//                 throw new Error(`Unsupported file format: ${extension}`);
//         }
//     }

//     private loadGLTF(url: string): Promise<Object3D> {

//         return new Promise((resolve, reject) => {
//             this.gltfLoader.load(
//                 url,
//                 (gltf) => {
//                     gltf.scene.traverse((child) => {
//                         if (child instanceof Mesh) {
//                             child.castShadow = true;
//                             child.receiveShadow = true;
//                         }
//                     });
//                     resolve(gltf.scene);
//                 },
//                 undefined,
//                 (error) => {
//                     console.error('An error occurred while loading the model:', error);
//                     reject(error); 
//                 }
//             );
//         });
//     }


//     private loadFBX(url: string): Promise<Object3D> {
//         return new Promise((resolve, reject) => {
//             this.fbxLoader.load(url, resolve, undefined, reject);
//         });
//     }
// }