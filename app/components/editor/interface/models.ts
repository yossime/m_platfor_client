import { Color, Euler, Material, MaterialParameters, Mesh, MeshStandardMaterial, Object3D, Texture, TextureLoader, Vector3 } from "three";
import { FBXLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { IText } from "./paramsType";



export interface CustomObject3D extends Object3D {
    onPointerDown?: (event: PointerEvent) => void;
    interactive?: boolean;
}


async function loadTextureFromSource(source: File | string): Promise<Texture> {
    return new Promise<Texture>((resolve, reject) => {
        const loader = new TextureLoader();
        const url = source instanceof File ? URL.createObjectURL(source) : source;

        loader.load(
            url,
            (texture) => {
                // Revoke object URL if it was used
                if (source instanceof File) URL.revokeObjectURL(url);
                resolve(texture);
            },
            undefined,
            (error) => reject(error)
        );
    });
}


async function applyTextureMaps(material: Material, textureMaps: ITextureMaps): Promise<void> {
    if (!(material instanceof MeshStandardMaterial)) {
        console.error('Material is not a MeshStandardMaterial.');
        return;
    }

    const stdMaterial = material as MeshStandardMaterial;
    const texturePromises: Promise<void>[] = [];

    // Map texture properties to their corresponding material properties
    const textureProperties: { [key in keyof ITextureMaps]: keyof MeshStandardMaterial } = {
        diffuse: 'map',
        opacity: 'alphaMap',
        roughness: 'roughnessMap',
        normal: 'normalMap',
        metallic: 'metalnessMap',
        emission: 'emissiveMap',
        tint: 'color'
    };

    for (const [key, property] of Object.entries(textureProperties)) {
        const textureSource = textureMaps[key as keyof ITextureMaps];
        if (textureSource) {
            if (textureSource.file || textureSource.url) {
                const source = textureSource.file ?? textureSource.url;
                if (source) {
                    texturePromises.push(
                        loadTextureFromSource(source).then(texture => {
                            (stdMaterial as any)[property] = texture;
                            stdMaterial.needsUpdate = true;
                        }).catch(error => {
                            console.error(`Failed to load texture for ${key}:`, error);
                        })
                    );
                }
            } else if (property === 'color' && textureSource.color) {
                stdMaterial.color.set(textureSource.color);
            }
        }
    }

    try {
        await Promise.all(texturePromises);
        console.log('All textures applied successfully.');
    } catch (error) {
        console.error('Error applying textures:', error);
    }
}




export interface ISceneObject {
    name: string | null;
    type: string;
    model: Object3D;


    getModel(): Object3D;

    addChild(sceneObject: SceneObject): void;
    removeChild(sceneObject: SceneObject): void;

    // isSelected: boolean;
    children: ISceneObject[];
    // objectData: ISceneObjectData[];
    constentData: Map<IContentDataType, IContentData>;

    // position: { x: number; y: number; z: number };
    // rotation: { x: number; y: number; z: number };
    // scale: { x: number; y: number; z: number };

    // setMaterial: (name: string) => void;

    setPosition: (position: Vector3) => void;
    setRotation: (rotation: Euler) => void;
    setScale: (x: number, y: number, z: number) => void;

    displayEmptySlots(): void;
    loadModel(modelUrl: string, onLoad?: () => void, onError?: (error: Error) => void): void;


}

export abstract class SceneObject implements ISceneObject {
    name: string | null = null;
    type: string;
    selectedChild: SceneObject | null = null;
    selectedSlot: CustomObject3D | null = null;
    model: Object3D;
    children: SceneObject[] = [];
    protected childToAdd: SceneObject | null = null;
    constentData: Map<IContentDataType, IContentData> = new Map();
    placeholders: Object3D[] = [];
    objectData: ISceneObjectData[] = [];

    protected modelParent: Object3D | null = null;

    position: Vector3 | null = null;
    rotation: Euler | null = null;
    scale: { x: number; y: number; z: number } = { x: 1, y: 1, z: 1 };

    constructor(type: string, model: Object3D) {
        // this.name = name;
        this.type = type;
        this.model = model;
        // this.loadModel(type);
    }

    abstract addChild(sceneObject: SceneObject): void;
    abstract removeChild(sceneObject: SceneObject): void;

    public abstract addContentData(data: IContentData): Promise<boolean>;

    abstract displayEmptySlots(): void;

    setMaterial(name: string): void {
        if (this.model instanceof Object3D) {
            this.model.traverse(child => {
                if (child instanceof Mesh) {
                    (child.material as Material).name = name;
                }
            });
        }
    }

    exchangeSlot(slot: CustomObject3D) {
        this.setPosition(slot.position);
        this.setRotation(slot.rotation);
        this.modelParent = slot.parent;

        if (this.model instanceof Object3D) {
            slot.parent?.attach(this.model);
            this.model.position.copy(slot.position);
            this.model.rotation.copy(slot.rotation);
        }
        slot.parent?.remove(slot);

        this.selectedChild = this;
    }


    protected getGeometryByName(name: string): Object3D | null {
        let found: Object3D | null = null;
        this.model.traverse((child) => {
            if (child.name === name) {
                found = child;
            }
        });
        return found;
    }

    protected  handleSelectSlot = (object: Object3D) => {
        this.selectedSlot = object;

        if(this.childToAdd) {
            this.addChild(this.childToAdd)
        }

        if (object instanceof Mesh) {
            const highlightMaterial = new MeshStandardMaterial({
                color: new Color(0xff0000),
            });

            object.material = highlightMaterial;
        }
    };

    // protected handleSelectSlot = (slot: CustomObject3D) => {
    //     if (this.childToAdd) {

    //         this.children.push(this.childToAdd);

    //         slot.parent?.attach(this.childToAdd.model);
    //         this.childToAdd.model.position.copy(slot.position);
    //         this.childToAdd.model.rotation.copy(slot.rotation);
    //         slot.parent?.remove(slot);

    //         this.childToAdd.selectedChild = this;
    //         this.setSlotsVisible(false);
    //         this.childToAdd = null;
    //         this.selectedSlot = null;
    //     } else {
    //         this.selectedSlot = slot;
    //     }
    // };


    protected async ChangeMaterial(mesh: Object3D, textureMap: ITextureMaps): Promise<void> {
        if (!(mesh instanceof Mesh)) return;

        let material;
        if (mesh.material instanceof Material) {
            material = mesh.material
        } else {
            material = new MeshStandardMaterial();
            mesh.material = material;
        }

        await applyTextureMaps(material, textureMap);

    }

    protected setSlotsVisible(visible: boolean) {
        this.placeholders.forEach(slot => {
            slot.visible = visible;
        });
    }

    getModel(): Object3D { return this.model; }

    setPosition(position: Vector3): void {
        this.position = position;
        // this.model?.position.set(position);
    }

    setRotation(rotation: Euler): void {
        this.rotation = rotation;
    }

    setScale(x: number, y: number, z: number): void {
        this.scale = { x, y, z };
        this.model?.scale.set(x, y, z);
    }

    async loadModel(modelPath: string, onLoad?: () => void, onError?: (error: Error) => void): Promise<Object3D> {
        return new Promise((resolve, reject) => {
            const loader = new FBXLoader();

            loader.load(
                modelPath,
                (model: CustomObject3D) => resolve(model),
                undefined,
                (error) => reject(error)
            );
        });
    }

};


export enum BoardType {
    Product = 'ProductBoard',
    Header = 'HeaderBoard',
    Image = 'ImageBoard',
}





export interface ITextureSource {
    color?: string;
    map?: File | string;
    file?: File;
    url?: string;
    intensity?: number;
}

export interface ITextureMaps {
    diffuse?: ITextureSource;
    opacity?: ITextureSource;
    roughness?: ITextureSource;
    normal?: ITextureSource;
    metallic?: ITextureSource;
    emission?: ITextureSource;
    tint?: ITextureSource;
}



export enum IContentDataType {
    TITLE = 'Title',
    SUB_TITLE = 'Sub_Title',
    IMAGE = 'Image',
    BUTTON = 'button',
    TEST = 'Header'
}


export interface IContentData {
    type: IContentDataType;
    name?: string;
    texture: ITextureMaps;
    text?: IText;
}



export interface ISceneObjectData {
    type: string;
    name: string;
    material: string;

    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
    scale: { x: number; y: number; z: number };

}



export const libLaoder = async (modelUrl: string, onLoad: (model: Object3D) => void) => {
    const loader = new FBXLoader();

    loader.load(
        modelUrl,
        (fbx) => {
            onLoad(fbx);
        },
        undefined,
        (error) => {
            console.error('An error happened:', error);
        }
    )
}
