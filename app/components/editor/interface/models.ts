// import { BackSide, Color, Euler, Material, MaterialParameters, Mesh, MeshBasicMaterial, MeshPhongMaterial, MeshStandardMaterial, Object3D, Texture, TextureLoader, Vector3 } from "three";
// import { FBXLoader, Font, FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { BaseSize, FontFamily, IText } from "./paramsType";
// import { getAuthDownloadUrl } from "@/services/firebase";
// import { Board } from "./Board";

import { Material, MeshStandardMaterial, Texture, TextureLoader } from "three";
import { ICustomMaterial } from "./types";



// export interface CustomObject3D extends Object3D {
//     onPointerDown?: (event: any) => SceneObject;
//     interactive?: boolean;
// }


async function loadTextureFromSource(source: File | string): Promise<Texture> {
    return new Promise<Texture>((resolve, reject) => {
        const loader = new TextureLoader();
        const url = source instanceof File ? URL.createObjectURL(source) : source;

        loader.load(
            url,
            (texture) => {
                if (source instanceof File) URL.revokeObjectURL(url);
                resolve(texture);
            },
            undefined,
            (error) => reject(error)
        );
    });
}


async function applyTextureMaps(material: Material, textureMaps: ICustomMaterial): Promise<void> {
    if (!(material instanceof MeshStandardMaterial)) {
        console.error('Material is not a MeshStandardMaterial.');
        return;
    }

    const stdMaterial = material as MeshStandardMaterial;
    const texturePromises: Promise<void>[] = [];

    const textureProperties: { [key in keyof ICustomMaterial]: keyof MeshStandardMaterial } = {
        diffuse: 'map',
        opacity: 'alphaMap',
        roughness: 'roughnessMap',
        normal: 'normalMap',
        metallic: 'metalnessMap',
        emission: 'emissiveMap',
        tint: 'color'
    };

    for (const [key, property] of Object.entries(textureProperties)) {
        const textureSource = textureMaps[key as keyof ICustomMaterial];
        if (textureSource) {
            if (textureSource.map) {
                const source = textureSource.map;
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


// export interface ISceneObjectOptions {
//     name?: string | null;
//     position?: Vector3 | null;
//     rotation?: Euler | null;
//     // scale?: { x: number; y: number; z: number };
// }

// export interface ISceneObject {
//     children: ISceneObject[];

//     setName(name: string): void;
//     addChild(sceneObject: ISceneObject): void;
//     // removeChild(sceneObject: SceneObject): void;
//     getChildren(): ISceneObject[] | null;
//     getEmptySlots(): CustomObject3D[];
//     displayEmptySlots(): void;
//     exportToJson(): string;
//     getModel(): Object3D | null;

//     getContentMaterial(type: IContentMaterialType): IContentMaterial | null;
//     getContentImage(type: EContentImagesType): IContentMaterial | null;
//     getContentText(type: IContentTextType): IContentText | null;
//     setContentMaterial(type: IContentMaterialType, material: IContentMaterial): void;
//     setContentImage(type: EContentImagesType, material: IContentMaterial): void;
//     setContentText(type: IContentTextType, text: IContentText): void;
//     exchangeSlot(slot: CustomObject3D): void;
// }

// export abstract class SceneObject implements ISceneObject {
//     protected name: string | null = null;
//     protected type: string;
//     protected selectedChild: SceneObject | null = null;
//     protected selectedSlot: CustomObject3D | null = null;
//     protected model: Object3D | null = null;
//     public children: ISceneObject[] = [];

//     protected childToAdd: ISceneObject | null = null;
//     protected placeholders: CustomObject3D[] = [];

//     protected modelParent: Object3D | null = null;

//     protected position: Vector3 | null = null;
//     protected rotation: Euler | null = null;
//     // protected scale: { x: number; y: number; z: number } = { x: 1, y: 1, z: 1 };
//     protected contentMaterial: Map<IContentMaterialType, IContentMaterial> = new Map<IContentMaterialType, IContentMaterial>();
//     protected contentImages: Map<EContentImagesType, IContentMaterial> = new Map<EContentImagesType, IContentMaterial>();
//     protected contentText: Map<IContentTextType, IContentText> = new Map<IContentTextType, IContentText>();



//     constructor(type: string, options?: ISceneObjectOptions) {
//         this.type = type;

//         if (options) {
//             this.name = options.name ?? this.name;
//             this.position = options.position ?? this.position;
//             this.rotation = options.rotation ?? this.rotation;
//             // this.scale = options.scale ?? this.scale;
//         }
//     }
//     getContentImage(type: EContentImagesType): IContentMaterial | null {
//         return this.contentImages.get(type) ?? null;
//     }
//     setContentImage(type: EContentImagesType, material: IContentMaterial): void {
//         // throw new Error("Method not implemented.");
//     }


//     public setName(name: string) { this.name = name }
//     // abstract removeChild(sceneObject: SceneObject): void;
//     abstract displayEmptySlots(): void;

//     public getContentMaterial(type: IContentMaterialType) {
//         return this.contentMaterial.get(type) ?? null;
//     };
//     public getContentText(type: IContentTextType) {
//         return this.contentText.get(type) ?? null;
//     };

//     public async setContentMaterial(type: IContentMaterialType, contentMaterial: IContentMaterial) {
//         // public async setContentMaterial(type: IContentMaterialType, material: IContentMaterial | MaterialType) {
//         const geometry = this.getGeometryByName(type);
//         const renderLibrary = `https://storage.cloud.google.com/library-materials-test-all`
//         let material;
//         if (geometry) {
//             if (contentMaterial.render) {
//                 const renderMaterial: ICustomMaterial = {
//                     tint: {
//                         color: 'blue'
//                     },
//                     diffuse: {
//                         // map: `${renderLibrary}/${contentMaterial.render}`
//                         map: `https://storage.cloud.google.com/library-materials-test-all/stone.jpg?authuser=0`
//                     }
//                 }
//                 material = renderMaterial;
//             }
//             if (contentMaterial.customMaterial) {
//                 material = contentMaterial.customMaterial
//             }
//             if (material) {
//                 const v = new Vector3(-8.448, 26.274, 10.00)
//                 geometry.position.copy(v)
//                 await this.ChangeMaterial(geometry, material);
//                 this.contentMaterial.set(type, contentMaterial);
//                 return true;
//             }
//         }
//     };



//     // public async setContentText(type: IContentTextType, text: IContentText) {
//     //     const geometry = this.getGeometryByName(type);
//     //     if (geometry instanceof Mesh) {
//     //         this.straightText(geometry, text);
//     //         this.contentText.set(type, text);
//     //         return true;
//     //     }
//     //     return false;
//     // };

//     public async setContentText(type: IContentTextType, text: IContentText) {
//         const geometry = this.getGeometryByName(type);
//         if (geometry instanceof Mesh) {
//             this.straightText(geometry, text);
//             this.contentText.set(type, text);
//             return true;
//         }
//         return false;
//     };

//     async loadFont(url: string): Promise<Font> {
//         const loader = new FontLoader();

//         return new Promise((resolve, reject) => {
//             loader.load(url, resolve, undefined, reject);
//         });
//     }

//     async straightText(mesh: Mesh, text: IContentText) {
//         try {
//             const font = await this.loadFont('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json');
//             const geometry = new TextGeometry(text.text, {
//                 font: font,
//                 size: 0.5,
//                 height: 0.1,
//             });

//             const material = new MeshPhongMaterial({ color: 0xffffff });
//             const newMesh = new Mesh(geometry, material);
//             newMesh.position.copy(mesh.position);

//             mesh.geometry.dispose();
//             mesh.geometry = geometry;
//             mesh = newMesh;

//         } catch (error) {
//             console.error('Error replacing text:', error);
//         }
//     }

//     public getModel() { return this.model };
//     public getEmptySlots() { return this.placeholders }
//     public setSelectedChild(child: SceneObject | null) { this.selectedChild = child; };
//     public setSelectedSlot(child: SceneObject | null) { this.selectedChild = child; };
//     public setConfigurationn() { };
//     public getChildren() { return null }
//     // setMaterial(name: string): void {
//     //     if (this.model instanceof Object3D) {
//     //         this.model.traverse(child => {
//     //             if (child instanceof Mesh) {
//     //                 (child.material as Material).name = name;
//     //             }
//     //         });
//     //     }
//     // }

//     exchangeSlot(slot: CustomObject3D) {
//         this.setPosition(slot.position);
//         this.setRotation(slot.rotation);
//         this.modelParent = slot.parent;

//         if (this.model instanceof Object3D) {
//             slot.parent?.attach(this.model);
//             this.model.position.copy(slot.position);
//             this.model.rotation.copy(slot.rotation);
//         }
//         slot.parent?.remove(slot);
//     }


//     protected getGeometryByName(name: string): Object3D | null {
//         if (!this.model) return null;

//         let found: Object3D | null = null;
//         this.model.traverse((child) => {
//             if (child.name === name) {
//                 found = child;
//             }
//         });
//         return found;
//     }

//     highlightMesh = (object: Object3D) => {
//         object.traverse((mesh) => {
//             if (mesh instanceof Mesh) {
//                 const highlightMaterial = new MeshStandardMaterial({
//                     color: new Color(0xff0000),
//                 });
//                 mesh.material = highlightMaterial;
//             }
//         });
//     };

//     protected handleSelectSlot = (object: CustomObject3D) => {
//         this.highlightMesh(object);
//         this.selectedSlot = object;

//         if (this.childToAdd) {
//             this.addChild(this.childToAdd)
//         }
//         return this;
//     };


//     protected handleSelected = (object: CustomObject3D) => { return this};

//     public addChild(sceneObject: ISceneObject): void {
//         if (this.selectedSlot) {

//             sceneObject.exchangeSlot(this.selectedSlot);
//             this.children.push(sceneObject);

//             this.setSlotsVisible(false);
//             this.placeholders = this.placeholders.filter(placeholder => placeholder !== this.selectedSlot);
//             this.selectedSlot = null;
//             this.childToAdd = null;

//         } else {
//             this.setSlotsVisible(true);
//             this.childToAdd = sceneObject;
//         }
//     }



//     protected async ChangeMaterial(mesh: Object3D, textureMap: ICustomMaterial): Promise<void> {
//         if (!(mesh instanceof Mesh)) return;
//         // console.log(`Changing material`, mesh, textureMap);
//         let material;
//         if (mesh.material instanceof MeshStandardMaterial) {
//             material = mesh.material
//         } else {
//             material = new MeshStandardMaterial();
//             mesh.material = material;
//         }

//         await applyTextureMaps(material, textureMap);
//     }

//     protected setSlotsVisible(visible: boolean) {
//         this.placeholders.forEach(slot => {
//             slot.visible = visible;
//         });
//     }


//     setPosition(position: Vector3): void { this.position = position}
//     setRotation(rotation: Euler): void {this.rotation = rotation}


//     async loadModel(modelPath: string, onLoad?: () => void, onError?: (error: Error) => void): Promise<CustomObject3D> {
//         return new Promise((resolve, reject) => {
//             const loader = new FBXLoader();

//             loader.load(
//                 modelPath,
//                 model => resolve(model as CustomObject3D),
//                 undefined,
//                 (error) => reject(error)
//             );
//         });
//     }

//     async loadGLTFModel(modelPath: string, onLoad?: () => void, onError?: (error: Error) => void): Promise<CustomObject3D> {
//         return new Promise((resolve, reject) => {
//             const loader = new GLTFLoader();

//             loader.load(
//                 modelPath,
//                 model => resolve(model.scene as CustomObject3D),
//                 undefined,
//                 (error) => reject(error)
//             );
//         });
//     }

//     // async loadModelUrl(filePath: string, onLoad?: () => void, onError?: (error: Error) => void): Promise<Object3D> {
//     //     return new Promise(async (resolve, reject) => {
//     //         // Extract the file extension before any query parameters
//     //         const url = await getAuthDownloadUrl(filePath);

//     //         if(!url) return;

//     //         const fileExtension = url.split('?')[0].split('.').pop()?.toLowerCase();

//     //         console.log(`Attempting to load model from URL: ${url}`);
//     //         console.log(`Detected file extension: ${fileExtension}`);

//     //         let loader;
//     //         switch (fileExtension) {
//     //             case 'fbx':
//     //                 loader = new FBXLoader();
//     //                 loader.load(
//     //                     url,
//     //                     (model: Object3D) => {
//     //                         if (onLoad) onLoad();
//     //                         resolve(model);
//     //                     },
//     //                     undefined,
//     //                     (error: unknown) => {
//     //                         if (onError) onError(error instanceof Error ? error : new Error('Unknown error occurred'));
//     //                         reject(error instanceof Error ? error : new Error('Unknown error occurred'));
//     //                     }
//     //                 );
//     //                 break;
//     //             case 'glb':
//     //             case 'gltf':
//     //                 loader = new GLTFLoader();
//     //                 loader.load(
//     //                     url,
//     //                     (gltf) => {
//     //                         if (onLoad) onLoad();
//     //                         // Extract the scene from the GLTF object
//     //                         const model = gltf.scene;
//     //                         resolve(model);
//     //                     },
//     //                     undefined,
//     //                     (error: unknown) => {
//     //                         if (onError) onError(error instanceof Error ? error : new Error('Unknown error occurred'));
//     //                         reject(error instanceof Error ? error : new Error('Unknown error occurred'));
//     //                     }
//     //                 );
//     //                 break;
//     //             default:
//     //                 const error = new Error(`Unsupported file format: ${fileExtension}`);
//     //                 console.error(error.message);
//     //                 if (onError) onError(error);
//     //                 reject(error);
//     //                 return;
//     //         }
//     //     });
//     // }

//     exportToJson(): string {
//         const exportObject: ExportedSceneObject = {
//             name: this.name ?? null,
//             type: this.type,
//             position: this.position ? {
//                 x: this.position.x,
//                 y: this.position.y,
//                 z: this.position.z
//             } : null,
//             rotation: this.rotation ? {
//                 x: this.rotation.x,
//                 y: this.rotation.y,
//                 z: this.rotation.z
//             } : null,
//             // scale: this.scale ?? { x: 1, y: 1, z: 1 },
//             children: this.children.map(child => JSON.parse(child.exportToJson())) ?? [],
//             contentMaterial: {},
//             contentText: {}
//         };


//         Array.from(this.contentMaterial.keys()).forEach((type: IContentMaterialType) => {
//             const material = this.contentMaterial.get(type);
//             exportObject.contentMaterial[type as IContentMaterialType] = material;
//         })

//         Array.from(this.contentText.keys()).forEach((type: IContentTextType) => {
//             const text = this.contentText.get(type);
//             exportObject.contentText[type as IContentTextType] = text;
//         })
//         return JSON.stringify(exportObject, null, 2);
//     }
// };


// export enum BoardType {
//     Product = 'ProductBoard',
//     // Header = 'header_butns',
//     Header = 'header_image_null10',
//     // Header = 'header_image_2',
//     Image = 'header_image',
//     Slider = 'SliderBoard',
//     Video = 'VideoBoard',
//     Testimonials = 'TestimonialsBoard',
//     Subscription = 'SubscriptionBoard',
//     Services = 'ServicesBoard',
//     Gamification = 'GamificationBoard',
//     Form = 'FormBoard',
//     Socials = 'SocialsBoard',
//     Article = 'ArticleBoard',
//     DisplayStands = 'stands',
//     DisplayDuo = 'DisplayDuo',
// }


// export enum ArchitectureType {
//     Barbiz = 'barbiz',
//     TOW_CIRCLES = 'two_circles'
// }

// // export enum MaterialType {
// //     Barbiz = 'barbiz',
// // }


// export interface ITextureSource {
//     color?: string;
//     map?: File | string;
//     file?: File;
//     url?: string;
//     intensity?: number;
// }

// export interface ICustomMaterial {
//     diffuse?: ITextureSource;
//     opacity?: ITextureSource;
//     roughness?: ITextureSource;
//     normal?: ITextureSource;
//     metallic?: ITextureSource;
//     emission?: ITextureSource;
//     tint?: ITextureSource;
// }

// export interface IContentMaterial {
//     video?: ITextureSource;
//     render?: ERenderType;
//     customMaterial?: ICustomMaterial;
//     contentName?: string;
//     position?: Vector3 | null;
//     rotation?: Euler | null;
// }


// export enum ERenderType {
//     STONE = 'stone',
//     IRON = 'iron',
// }


// export enum ProductType {
//     Poudiom = 'PoudiomProduct',
//     Header = 'HeaderBoard',
//     Image = 'ImageBoard',
// }


// export enum EConfigType {
//     HORIZONTAL = 'HORIZONTAL',
//     VERTICAL = 'VERTICAL',
// }

// export enum EConfiguration {
//     // TOP_LEFT = 'T_L',
//     // TOP_CENTER = 'T_C',
//     // TOP_RIGHT = 'T_R',
//     // CENTER_LEFT = 'C_L',
//     // CENTER_CENTER = 'C_C',
//     // CENTER_RIGHT = 'C_R',
//     // BOTTOM_LEFT = 'B_L',
//     // BOTTOM_CENTER = 'B_C',
//     // BOTTOM_RIGHT = 'B_R',

//     LEFT = 'LEFT',
//     RIGHT = 'RIGHT',
//     CENTER = 'CENTER',
//     TOP = 'TOP',
//     BOTTOM = 'BOTTOM',




//     // LEFT = 'Left',
//     // RIGHT = 'Right',
//     // CENTER = 'Center',
//     // TOP = 'Top',
//     // BOTTOM = 'Bottom',
//     // MIDDLE = 'Middle',
//     // FULL_WIDTH = 'FullWidth',
//     // FULL_HEIGHT = 'FullHeight',
// }

// export enum IContentTextType {
//     TITLE = 'text_B_L',
//     SUB_TITLE = 'Sub_Title',
//     BUTTON = 'button',
//     TEST = 'Header',
//     IMAGE_CONTENT = 'ImageCenter',
//     IMAGE_Left = 'ImageLeft',
//     IMAGE_RIGHT = 'ImageRight',
//     TEXT = 'Text',
//     CTA = 'CTA',
//     TESTIMONIALS = 'Testimonials',
//     FORM = 'Form',
//     IMAGE_0 = 'Image_0',
//     IMAGE_1 = 'Image_1',
// }


// export enum IContentMaterialType {
//     TITLE = 'Title',
//     SUB_TITLE = 'Sub_Title',
//     BUTTON = 'button',
//     TEST = 'Header',
//     IMAGE_CONTENT = 'ImageCenter',
//     IMAGE_Left = 'ImageLeft',
//     IMAGE_RIGHT = 'ImageRight',
//     TEXT = 'Text',
//     CTA = 'CTA',
//     TESTIMONIALS = 'Testimonials',
//     FORM = 'Form',
//     SELF = 'self',      //yossi
//     IMAGE = 'image',
//     IMAGE_0 = 'image_0',
//     IMAGE_1 = 'image_1',
// }

// export enum EContentImagesType {  
//     IMAGE = 'image',
//     IMAGE_0 = 'image_0',
//     IMAGE_1 = 'image_1',
// }


// export interface IContentText {
//     text: string;
//     font?: FontFamily;
//     color?: string;
//     size?: BaseSize;               // yossi
//     scale?: [number, number, number];
// }

// export interface ExportedSceneObject {
//     name: string | null;
//     type: string;
//     slotNumber?: number;
//     position: { x: number; y: number; z: number } | null;
//     rotation: { x: number; y: number; z: number } | null;
//     scale?: { x: number; y: number; z: number };
//     children: ExportedSceneObject[];
//     contentMaterial: { [key in IContentMaterialType]?: IContentMaterial };
//     contentText: { [key in IContentTextType]?: IContentText };
// }



export {}
