// import { Vector3, Euler, Object3D, Mesh } from 'three';


// export interface ISceneObject {
//   loadModel(): Promise<void>;
//   setPosition(position: Position): void;
//   setRotation(rotation: Rotation): void;
//   addChild(child: ISceneObject): void;
//   removeChild(child: ISceneObject): void;
//   getModel(): Object3D | null;
//   setContentMaterial(type: ContentType, material: ContentMaterial): void;
//   setContentText(type: ContentType, text: ContentText): void;
//   toJSON(): object;
// }

// export interface IArchitecture extends ISceneObject {
//   // Additional methods specific to Architecture, if any
// }

// export interface IBoard extends ISceneObject {
//   setConfiguration(type: ConfigurationType, config: Configuration): void;
// }

// export interface IProduct extends ISceneObject {
//   // Additional methods specific to Product, if any
// }

// export interface IScene {
//   buildFromScratch(type: SceneObjectType, options: SceneObjectOptions): Promise<void>;
//   buildFromJSON(json: string): Promise<void>;
//   setSelectedObject(object: ISceneObject | null): void;
//   getSelectedObject(): ISceneObject | null;
//   toJSON(): string;
// }




// export interface Position {
//   x: number;
//   y: number;
//   z: number;
// }

// export interface Rotation {
//   x: number;
//   y: number;
//   z: number;
// }

// export interface SceneObjectOptions {
//   name?: string;
//   position?: Position;
//   rotation?: Rotation;
// }

// export interface Texture {
//   file?: File;
//   url?: string;
//   color?: string;
//   intensity?: number;
// }

// export interface CustomMaterial {
//   diffuse?: Texture;
//   opacity?: Texture;
//   roughness?: Texture;
//   normal?: Texture;
//   metallic?: Texture;
//   emission?: Texture;
//   tint?: Texture;
// }

// export interface ContentMaterial {
//   video?: Texture;
//   render?: string;
//   customMaterial?: CustomMaterial;
//   contentName?: string;
//   position?: Position;
//   rotation?: Rotation;
// }

// export interface ContentText {
//   text: string;
//   font?: string;
//   color?: string;
//   size?: string;
//   scale?: [number, number, number];
// }

// export enum SceneObjectType {
//   Architecture = 'Architecture',
//   Board = 'Board',
//   Product = 'Product',
// }

// export enum ConfigurationType {
//   Horizontal = 'Horizontal',
//   Vertical = 'Vertical',
// }

// export enum Configuration {
//   Left = 'Left',
//   Right = 'Right',
//   Center = 'Center',
//   Top = 'Top',
//   Bottom = 'Bottom',
// }

// export enum ContentType {
//   Title = 'Title',
//   SubTitle = 'SubTitle',
//   Button = 'Button',
//   Image = 'Image',
//   Text = 'Text',
//   Video = 'Video',
// }


export {}