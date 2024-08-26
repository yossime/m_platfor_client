import { BackSide, Color, Euler, Material, MaterialParameters, Mesh, MeshBasicMaterial, MeshPhongMaterial, MeshStandardMaterial, Object3D, Texture, TextureLoader, Vector3 } from "three";
import { FBXLoader, Font, FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { BaseSize, FontFamily, IText } from "./paramsType";
import { getAuthDownloadUrl } from "@/services/firebase";



export interface CustomObject3D extends Object3D {
    onPointerDown?: (event: any) => SceneObject;
    interactive?: boolean;
}


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


async function applyTextureMaps(material: Material, textureMaps: IContentMaterial): Promise<void> {
    if (!(material instanceof MeshStandardMaterial)) {
        console.error('Material is not a MeshStandardMaterial.');
        return;
    }

    const stdMaterial = material as MeshStandardMaterial;
    const texturePromises: Promise<void>[] = [];

    const textureProperties: { [key in keyof IContentMaterial]: keyof MeshStandardMaterial } = {
        diffuse: 'map',
        opacity: 'alphaMap',
        roughness: 'roughnessMap',
        normal: 'normalMap',
        metallic: 'metalnessMap',
        emission: 'emissiveMap',
        tint: 'color'
    };

    for (const [key, property] of Object.entries(textureProperties)) {
        const textureSource = textureMaps[key as keyof IContentMaterial];
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


export interface ISceneObjectOptions {
    name?: string | null;
    position?: Vector3 | null;
    rotation?: Euler | null;
    scale?: { x: number; y: number; z: number };
}

export interface ISceneObject {
    // type: string;

    children: ISceneObject[];

    setName(name: string): void;
    addChild(sceneObject: ISceneObject): void;
    // removeChild(sceneObject: SceneObject): void;
    getChildren(): ISceneObject[] | null;
    getEmptySlots(): CustomObject3D[];
    displayEmptySlots(): void;
    exportToJson(): string;
    getModel(): Object3D | null;

    getContentMaterial(type: IContentMaterialType): IContentMaterial | null;
    getContentText(type: IContentTextType): IContentText | null;
    getConfiguration(): IConfiguration | null;
    setContentMaterial(type: IContentMaterialType, material: IContentMaterial): void;
    setContentText(type: IContentTextType, text: IContentText): void;
    setConfigurationn(config: IConfiguration): void;
    exchangeSlot(slot: CustomObject3D): void;
}

export abstract class SceneObject implements ISceneObject {
    protected name: string | null = null;
    protected type: string;
    protected selectedChild: SceneObject | null = null;
    protected selectedSlot: CustomObject3D | null = null;
    protected model: Object3D | null = null;
    public children: ISceneObject[] = [];

    protected childToAdd: ISceneObject | null = null;
    protected placeholders: CustomObject3D[] = [];

    protected modelParent: Object3D | null = null;

    protected position: Vector3 | null = null;
    protected rotation: Euler | null = null;
    protected scale: { x: number; y: number; z: number } = { x: 1, y: 1, z: 1 };
    protected contentMaterial: Map<IContentMaterialType, IContentMaterial> = new Map<IContentMaterialType, IContentMaterial>();
    protected contentText: Map<IContentTextType, IContentText> = new Map<IContentTextType, IContentText>();



    constructor(type: string, options?: ISceneObjectOptions) {
        this.type = type;

        if (options) {
            this.name = options.name ?? this.name;
            this.position = options.position ?? this.position;
            this.rotation = options.rotation ?? this.rotation;
            this.scale = options.scale ?? this.scale;
        }
    }


    public setName(name: string) { this.name = name }
    // abstract removeChild(sceneObject: SceneObject): void;
    abstract displayEmptySlots(): void;

    public getContentMaterial(type: IContentMaterialType) {
        return this.contentMaterial.get(type) ?? null;
    };
    public getContentText(type: IContentTextType) {
        return this.contentText.get(type) ?? null;
    };
    // public async setContentMaterial(type: IContentMaterialType, material: IContentMaterial) {
    public async setContentMaterial(type: IContentMaterialType, material: IContentMaterial | MaterialType) {
        const geometry = this.getGeometryByName(type);
        if (geometry) {
            let materialInstance: IContentMaterial;

            if (Object.values(MaterialType).includes(material as MaterialType)) {
                // materialInstance = getMaterialParams(material);
                return ;
            } else {
                materialInstance = material as IContentMaterial;
            }


            await this.ChangeMaterial(geometry, materialInstance);
            this.contentMaterial.set(type, materialInstance);
        }
    };

    public async setContentText(type: IContentTextType, text: IContentText) {
        const geometry = this.getGeometryByName(type);
        if (geometry instanceof Mesh) {
            this.straightText(geometry, text);
            this.contentText.set(type, text);
            return true;
        }
        return false;
    };

    async loadFont(url: string): Promise<Font> {
        const loader = new FontLoader();

        return new Promise((resolve, reject) => {
            loader.load(url, resolve, undefined, reject);
        });
    }

    async straightText(mesh: Mesh, text: IContentText) {
        try {
            const font = await this.loadFont('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json');
            const geometry = new TextGeometry(text.text, {
                font: font,
                size: 0.5,
                height: 0.1,
            });

            const material = new MeshPhongMaterial({ color: 0xffffff });
            const newMesh = new Mesh(geometry, material);
            newMesh.position.copy(mesh.position);

            mesh.geometry.dispose();
            mesh.geometry = geometry;
            mesh = newMesh;

        } catch (error) {
            console.error('Error replacing text:', error);
        }
    }
    public getConfiguration() { return null; }

    public getModel() { return this.model };
    public getEmptySlots() { return this.placeholders }
    public setSelectedChild(child: SceneObject | null) { this.selectedChild = child; };
    public setSelectedSlot(child: SceneObject | null) { this.selectedChild = child; };
    public setConfigurationn() { };
    public getChildren() { return null; }
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
        // this.selectedChild = this;
    }


    protected getGeometryByName(name: string): Object3D | null {
        if (!this.model) return null;

        let found: Object3D | null = null;
        this.model.traverse((child) => {
            if (child.name === name) {
                found = child;
            }
        });
        return found;
    }


    // protected getModelDimensions(model: Object3D) {
    //     const box = new Box3().setFromObject(model);
    //     const size = new Vector3();
    //     box.getSize(size);
    //     return {
    //         width: size.x,
    //         height: size.y,
    //         depth: size.z
    //     };
    // }


    highlightMesh = (mesh: Object3D) => {
        const outlineMaterial = new MeshBasicMaterial({
            color: 0xff0000,
            side: BackSide
        });

        const outlineMesh = new Mesh((mesh as Mesh).geometry, outlineMaterial);
        outlineMesh.scale.multiplyScalar(1.01);
        mesh.add(outlineMesh);
    };

    protected handleSelectSlot = (object: CustomObject3D) => {
        this.selectedSlot = object;
        // this.highlightMesh(object);

        if (this.childToAdd) {
            this.addChild(this.childToAdd)
        }

        if (object instanceof Mesh) {
            const highlightMaterial = new MeshStandardMaterial({
                color: new Color(0xff0000),
            });

            object.material = highlightMaterial;
        }
        return this;
    };


    protected handleSelected = (object: CustomObject3D) => {
        return this;
    };

    public addChild(sceneObject: ISceneObject): void {
        if (this.selectedSlot) {
            sceneObject.exchangeSlot(this.selectedSlot);
            this.children.push(sceneObject);
            // sceneObject.selectedChild = this;

            this.setSlotsVisible(false);
            this.placeholders = this.placeholders.filter(placeholder => placeholder !== this.selectedSlot);
            this.selectedSlot = null;
            this.childToAdd = null;

        } else {
            this.setSlotsVisible(true);
            this.childToAdd = sceneObject;
        }
    }



    protected async ChangeMaterial(mesh: Object3D, textureMap: IContentMaterial): Promise<void> {
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

    async loadModel(modelPath: string, onLoad?: () => void, onError?: (error: Error) => void): Promise<CustomObject3D> {
        return new Promise((resolve, reject) => {
            const loader = new FBXLoader();

            loader.load(
                modelPath,
                model => resolve(model as CustomObject3D),
                undefined,
                (error) => reject(error)
            );
        });
    }

    // async loadModelUrl(filePath: string, onLoad?: () => void, onError?: (error: Error) => void): Promise<Object3D> {
    //     return new Promise(async (resolve, reject) => {
    //         // Extract the file extension before any query parameters
    //         // const url = await getAuthDownloadUrl(filePath);
    //         const url = 'await getAuthDownloadUrl(filePath)';

    //         if(!url) return;

    //         const fileExtension = url.split('?')[0].split('.').pop()?.toLowerCase();

    //         console.log(`Attempting to load model from URL: ${url}`);
    //         console.log(`Detected file extension: ${fileExtension}`);

    //         let loader;
    //         switch (fileExtension) {
    //             case 'fbx':
    //                 loader = new FBXLoader();
    //                 loader.load(
    //                     url,
    //                     (model: Object3D) => {
    //                         if (onLoad) onLoad();
    //                         resolve(model);
    //                     },
    //                     undefined,
    //                     (error: unknown) => {
    //                         if (onError) onError(error instanceof Error ? error : new Error('Unknown error occurred'));
    //                         reject(error instanceof Error ? error : new Error('Unknown error occurred'));
    //                     }
    //                 );
    //                 break;
    //             case 'glb':
    //             case 'gltf':
    //                 loader = new GLTFLoader();
    //                 loader.load(
    //                     url,
    //                     (gltf) => {
    //                         if (onLoad) onLoad();
    //                         // Extract the scene from the GLTF object
    //                         const model = gltf.scene;
    //                         resolve(model);
    //                     },
    //                     undefined,
    //                     (error: unknown) => {
    //                         if (onError) onError(error instanceof Error ? error : new Error('Unknown error occurred'));
    //                         reject(error instanceof Error ? error : new Error('Unknown error occurred'));
    //                     }
    //                 );
    //                 break;
    //             default:
    //                 const error = new Error(`Unsupported file format: ${fileExtension}`);
    //                 console.error(error.message);
    //                 if (onError) onError(error);
    //                 reject(error);
    //                 return;
    //         }
    //     });
    // }

    exportToJson(): string {
        const exportObject: ExportedSceneObject = {
            name: this.name ?? null,
            type: this.type,
            position: this.position ? {
                x: this.position.x,
                y: this.position.y,
                z: this.position.z
            } : null,
            rotation: this.rotation ? {
                x: this.rotation.x,
                y: this.rotation.y,
                z: this.rotation.z
            } : null,
            // scale: this.scale ?? { x: 1, y: 1, z: 1 },
            children: this.children.map(child => JSON.parse(child.exportToJson())) ?? [],
            contentMaterial: {},
            contentText: {}
        };


        Array.from(this.contentMaterial.keys()).forEach((type: IContentMaterialType) => {
            const material = this.contentMaterial.get(type);
            console.log("material content", type, material);
            exportObject.contentMaterial[type as IContentMaterialType] = material;
        })

        Array.from(this.contentText.keys()).forEach((type: IContentTextType) => {
            const text = this.contentText.get(type);
            console.log("text content", type, text);
            exportObject.contentText[type as IContentTextType] = text;
        })
        return JSON.stringify(exportObject, null, 2);
    }
};


export enum BoardType {
    Product = 'ProductBoard',
    Header = 'HeaderBoard',
    Image = 'ImageBoard',
    Slider = 'SliderBoard',
    Video = 'VideoBoard',
    Testimonials = 'TestimonialsBoard',
    Subscription = 'SubscriptionBoard',
    Services = 'ServicesBoard',
    Gamification = 'GamificationBoard',
    Form = 'FormBoard',
    Socials = 'SocialsBoard',
    Article = 'ArticleBoard',
    DisplayStands = 'stands',
    DisplayDuo = 'DisplayDuo',
}


export enum ArchitectureType {
    Barbiz = 'barbiz',
}

export enum MaterialType {
    Goold = 'goold',
}


export interface ITextureSource {
    color?: string;
    map?: File | string;
    file?: File;
    url?: string;
    intensity?: number;
}

export interface IContentMaterial {
    diffuse?: ITextureSource;
    opacity?: ITextureSource;
    roughness?: ITextureSource;
    normal?: ITextureSource;
    metallic?: ITextureSource;
    emission?: ITextureSource;
    tint?: ITextureSource;
}

export enum ProductType {
    Poudiom = 'PoudiomProduct',
    Header = 'HeaderBoard',
    Image = 'ImageBoard',
}



export enum IConfiguration {
    LEFT = 'Left',
    RIGHT = 'Right',
    CENTER = 'Center',
    TOP = 'Top',
    BOTTOM = 'Bottom',
    MIDDLE = 'Middle',
    FULL_WIDTH = 'FullWidth',
    FULL_HEIGHT = 'FullHeight',
}

export enum IContentTextType {
    TITLE = 'title',
    SUB_TITLE = 'Sub_Title',
    BUTTON = 'button',
    TEST = 'Header',
    IMAGE_CONTENT = 'ImageCenter',
    IMAGE_Left = 'ImageLeft',
    IMAGE_RIGHT = 'ImageRight',
    TEXT = 'Text',
    CTA = 'CTA',
    TESTIMONIALS = 'Testimonials',
    FORM = 'Form',
    IMAGE_0 = 'Image_0',
    IMAGE_1 = 'Image_1',
}


export enum IContentMaterialType {
    TITLE = 'Title',
    SUB_TITLE = 'Sub_Title',
    BUTTON = 'button',
    TEST = 'Header',
    IMAGE_CONTENT = 'ImageCenter',
    IMAGE_Left = 'ImageLeft',
    IMAGE_RIGHT = 'ImageRight',
    TEXT = 'Text',
    CTA = 'CTA',
    TESTIMONIALS = 'Testimonials',
    FORM = 'Form',
    SALF = 'salf',      //yossi
    IMAGE_0 = 'Image_0',
    IMAGE_1 = 'Image_1',
}



export interface IContentText {
    text: string;
    font?: FontFamily;
    color?: string;
    size?: BaseSize;               // yossi
    scale?: [number, number, number];
}

export interface ExportedSceneObject {
    name: string | null;
    type: string;
    position: { x: number; y: number; z: number } | null;
    rotation: { x: number; y: number; z: number } | null;
    scale?: { x: number; y: number; z: number };
    children: ExportedSceneObject[];
    contentMaterial: { [key in IContentMaterialType]?: IContentMaterial };
    contentText: { [key in IContentTextType]?: IContentText };
}
