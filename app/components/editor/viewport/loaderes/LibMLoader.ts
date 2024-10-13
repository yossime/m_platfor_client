
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ISceneObject } from '../../types';


export interface EventsOptions {
    onProgress?: (event: ProgressEvent) => void;
    onLoaded?: (event: THREE.Object3D) => void;
    onError?: (event: ErrorEvent) => void;
    handleSelected?:(event: any) => ISceneObject;
}

export class LibMLoader {
    private gltfLoader: GLTFLoader;
    private fbxLoader: FBXLoader;

    constructor() {
        this.gltfLoader = new GLTFLoader();
        this.fbxLoader = new FBXLoader();
    }

    public loadModel(url: string, eventsOptions?: EventsOptions): Promise<THREE.Object3D> {
        const extension = url.split('.').pop()?.toLowerCase();

        switch (extension) {
            case 'gltf':
            case 'glb':
                return this.loadGLTF(url);
            case 'fbx':
                return this.loadFBX(url);
            default:
                throw new Error(`Unsupported file format: ${extension}`);
        }
    }

    private loadGLTF(url: string): Promise<THREE.Object3D> {

        return new Promise((resolve, reject) => {
            this.gltfLoader.load(
                url,
                (gltf) => {
                    gltf.scene.traverse((child) => {
                        if (child instanceof THREE.Mesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                            child.visible
                        }
                    });
                    resolve(gltf.scene);
                },
                undefined,
                (error) => {
                    console.error('An error occurred while loading the model:', error);
                    reject(error); 
                }
            );
        });
    }
    // private loadGLTF(url: string): PromiseLike<Object3D<Object3DEventMap>> {
    //     return new Promise((resolve, reject) => {
    //         this.gltfLoader.load(url, (gltf: { scene: Object3D<Object3DEventMap> | PromiseLike<Object3D<Object3DEventMap>>; }) => resolve(gltf.scene), undefined, reject);
    //     });
    // }

    private loadFBX(url: string, eventsOptions?: EventsOptions): Promise<THREE.Object3D> {
        return new Promise((resolve, reject) => {
            this.fbxLoader.load(
                url,
                (fbx) => {
                    // Trigger onLoaded event if provided
                    if (eventsOptions?.onLoaded) {
                        fbx.traverse((child) => {
                            if (child instanceof THREE.Mesh) {
                                // child.onSelecte = () => this.handleSelected(customModel);
                                // customModel.onPointerDown = () => this.handleSelected(customModel);
                                // customModel.interactive = true;
                            }
                        });
                        eventsOptions.onLoaded(fbx);
                    }
                    resolve(fbx);
                },
                // Progress event handler
                (progressEvent) => {
                    if (eventsOptions?.onProgress) {
                        eventsOptions.onProgress(progressEvent);
                    }
                },
                // Error handler
                (error) => {
                    console.error('An error occurred while loading the FBX model:', error);
    
                    // Trigger onError event if provided
                    if (eventsOptions?.onError) {
                        eventsOptions.onError(new ErrorEvent('error', { error }));
                    }
                    reject(error);
                }
            );
        });
    }
}