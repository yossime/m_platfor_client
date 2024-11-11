import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

export abstract class ModelLoader {
    abstract loadModel(url: string): Promise<THREE.Object3D | null>;
}

export class GLTFModelLoader extends ModelLoader {
    private gltfLoader = new GLTFLoader();

    async loadModel(url: string): Promise<THREE.Object3D | null> {
        return new Promise((resolve, reject) => {
            const fixUrl = `${url}.glb`
            this.gltfLoader.load(
                fixUrl,
                (gltf) => {
                    const model = gltf.scene.children[0];
                    if (model && model instanceof THREE.Object3D) {
                        resolve(model);
                    } else {
                        reject(new Error("Loaded model is not a valid Object3D."));
                    }
                },
                undefined,
                (error) => {
                    if (error instanceof Error) {
                        reject(new Error(`Failed to load GLTF model: ${error.message}`));
                    } else {
                        reject(new Error("An unknown error occurred during model loading."));
                    }
                }
            );
        });
    }
}

export class FBXModelLoader extends ModelLoader {
    private fbxLoader = new FBXLoader();

    async loadModel(url: string): Promise<THREE.Object3D | null> {
        return new Promise((resolve, reject) => {
            const fixUrl = `${url}.fbx`

            this.fbxLoader.load(
                fixUrl,
                (fbx) => {
                    if (fbx && fbx instanceof THREE.Object3D) {
                        resolve(fbx);
                    } else {
                        reject(new Error("Loaded model is not a valid Object3D."));
                    }
                },
                undefined,
                (error) => {
                    if (error instanceof Error) {
                        reject(new Error(`Failed to load FBX model: ${error.message}`));
                    } else {
                        reject(new Error("An unknown error occurred during model loading."));
                    }
                }
            );
        });
    }
}

export class OBJModelLoader extends ModelLoader {
    private objLoader = new OBJLoader();

    async loadModel(url: string): Promise<THREE.Object3D | null> {
        return new Promise((resolve, reject) => {
            this.objLoader.load(
                url,
                (obj) => {
                    if (obj && obj instanceof THREE.Object3D) {
                        resolve(obj);
                    } else {
                        reject(new Error("Loaded model is not a valid Object3D."));
                    }
                },
                undefined,
                (error) => {
                    if (error instanceof Error) {
                        reject(new Error(`Failed to load OBJ model: ${error.message}`));
                    } else {
                        reject(new Error("An unknown error occurred during model loading."));
                    }
                }
            );
        });
    }
}



export class AutoModelLoader extends ModelLoader {
    private gltfLoader = new GLTFLoader();
    private fbxLoader = new FBXLoader();
    private objLoader = new OBJLoader();

    async loadModel(url: string): Promise<THREE.Object3D | null> {
        const extension = url.split('.').pop()?.toLowerCase();
        if (!extension) {
            throw new Error("File extension could not be determined.");
        }

        switch (extension) {
            case 'gltf':
            case 'glb':
                return this.loadGLTFModel(url);
            case 'fbx':
                return this.loadFBXModel(url);
            case 'obj':
                return this.loadOBJModel(url);
            default:
                throw new Error(`Unsupported file format: ${extension}`);
        }
    }

    private loadGLTFModel(url: string): Promise<THREE.Object3D | null> {
        return new Promise((resolve, reject) => {
            this.gltfLoader.load(
                url,
                (gltf) => {
                    resolve(gltf.scene);
                },
                undefined,
                (error) => {
                    if (error instanceof Error) {
                        reject(new Error(`Failed to load GLTF model: ${error.message}`));
                    } else {
                        reject(new Error("An unknown error occurred during GLTF model loading."));
                    }
                }
            );
        });
    }
    
    private loadFBXModel(url: string): Promise<THREE.Object3D | null> {
        return new Promise((resolve, reject) => {
            this.fbxLoader.load(
                url,
                (fbx) => resolve(fbx),
                undefined,
                (error) => {
                    if (error instanceof Error) {
                        reject(new Error(`Failed to load FBX model: ${error.message}`));
                    } else {
                        reject(new Error("An unknown error occurred during FBX model loading."));
                    }
                }
            );
        });
    }
    
    private loadOBJModel(url: string): Promise<THREE.Object3D | null> {
        return new Promise((resolve, reject) => {
            this.objLoader.load(
                url,
                (obj) => resolve(obj),
                undefined,
                (error) => {
                    if (error instanceof Error) {
                        reject(new Error(`Failed to load OBJ model: ${error.message}`));
                    } else {
                        reject(new Error("An unknown error occurred during OBJ model loading."));
                    }
                }
            );
        });
    }
    
}

export class TestLoader extends ModelLoader {
    private gltfLoader = new GLTFLoader();

    async loadModel(url: string): Promise<THREE.Object3D | null> {
        return new Promise((resolve, reject) => {
            console.log("urlurlurlurl", url)

            const fixUrl = `${url}`
            this.gltfLoader.load(
                fixUrl,
                (gltf) => {
                    console.log("gltf", gltf)
                    const model = gltf.scene.children[0];
                    if (model && model instanceof THREE.Object3D) {
                        resolve(model);
                    } else {
                        reject(new Error("Loaded model is not a valid Object3D."));
                    }
                },
                undefined,
                (error) => {
                    if (error instanceof Error) {
                        reject(new Error(`Failed to load GLTF model: ${error.message}`));
                    } else {
                        reject(new Error("An unknown error occurred during model loading."));
                    }
                }
            );
        });
    }
}