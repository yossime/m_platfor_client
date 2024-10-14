import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

export class AssetLoader {
    private static gltfLoader = new GLTFLoader();

    static async loadModel(url: string): Promise<THREE.Object3D | null> {
        return new Promise((resolve, reject) => {
            this.gltfLoader.load(
                url,
                // (gltf) => resolve(gltf.scene),
                (gltf) => {
                    const model = gltf.scene.children[0];
                    if (model && model instanceof THREE.Object3D) {
                        resolve(model);
                    } else {
                        reject(new Error("Loaded model is not a valid Object3D."));
                    }
                },
                undefined,
                reject
            );
        });
    }
}