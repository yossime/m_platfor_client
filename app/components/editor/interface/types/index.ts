import { Object3D, Vector3, Euler, Material, Texture } from 'three';

// Basic 3D types
export interface IVector3 {
  x: number;
  y: number;
  z: number;
}

export interface IEuler {
  x: number;
  y: number;
  z: number;
}

// Scene object types
export interface ISceneObjectOptions {
  name?: string | null;
  position?: Vector3 | null;
  rotation?: Euler | null;
  scale?: Vector3;
}

export interface ISceneObject {
  children: ISceneObject[];
  addChild(sceneObject: ISceneObject): void;
  removeChild?(sceneObject: ISceneObject): void;
  getChildren(): ISceneObject[] | null;
  getEmptySlots(): CustomObject3D[];
  displayEmptySlots(): void;
  exportToJson(): string;
  getModel(): Object3D | null;
  setPosition(position: Vector3): void;
  setRotation(rotation: Euler): void;
  setScale(scale: Vector3): void;
  updateMatrixWorld(force?: boolean): void;
  clone(): ISceneObject;
  dispose(): void;

  getContentMaterial(type: IContentMaterialType): IContentMaterial| null;
  getContentImage(type: EContentImagesType): IContentMaterial | null;
  getContentText(type: IContentTextType): IContentText | null;
  getContentObjects(type: ContentDataType): IContentObjects | null;
  setContentMaterial(type: IContentMaterialType, material: IContentMaterial): void;
  setContentImage?(type: EContentImagesType, material: IContentMaterial): void;
  setContentText?(type: IContentTextType, text: IContentText): void;
  setContentObjects?(type: ContentDataType, text: IContentObjects): void;
}

export interface CustomObject3D extends Object3D {
  // onPointerDown: (event: any) => ISceneObject;
  onPointerDown?: (event: any) => ISceneObject;
  interactive?: boolean;
}

// Enums for different types of objects
export enum ArchitectureType {
  Barbiz = 'barbiz',
  TWO_CIRCLES = 'two_circles'
}

export enum BoardType {
  Product = 'ProductBoard',
  Header = 'MasterBoard11',
  Image = 'header_image',
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

export enum ProductType {
  Poudiom = 'PoudiomProduct',
  Header = 'HeaderBoard',
  Image = 'ImageBoard',
}

// Configuration types
export enum EConfigType {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
}

export enum EConfiguration {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  CENTER = 'CENTER',
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
}

// Content types
export enum IContentTextType {
  TITLE = 'title',
  SUB_TITLE = 'sub_title',
  BUTTON = 'button_text',
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
  TITLE = 'title',
  SUB_TITLE = 'sub_title',
  BUTTON = 'button',
  TEST = 'Header',
  IMAGE_CONTENT = 'ImageCenter',
  IMAGE_Left = 'ImageLeft',
  IMAGE_RIGHT = 'ImageRight',
  TEXT = 'Text',
  CTA = 'CTA',
  TESTIMONIALS = 'Testimonials',
  FORM = 'Form',
  SELF = 'self',
  IMAGE = 'image',
  IMAGE_0 = 'image_0',
  IMAGE_1 = 'image_1',
}


export enum EContentImagesType {
  IMAGE = 'image',
  IMAGE_0 = 'image_0',
  IMAGE_1 = 'image_1',
}

export type ContentDataType = EContentImagesType | IContentMaterialType | IContentTextType;


export interface ContentData {
  contentObjects?: IContentObjects;
  contentText?: IContentText;
  contentMaterial?: IContentMaterial;
}

export interface IContentObjects {
  fbx?: string;
  meshName?: string;
  position?: Vector3 | null;
  rotation?: Euler | null;
}

// Material and texture types
export interface ITextureSource {
  color?: string;
  map?: string | File;
  // file?: File;
  // url?: string;
  intensity?: number;
  value?: number;
}

export interface ICustomMaterial {
  diffuse?: ITextureSource;
  opacity?: ITextureSource;
  roughness?: ITextureSource;
  normal?: ITextureSource;
  metalness?: ITextureSource;
  metallic?: ITextureSource;
  emission?: ITextureSource;
  tint?: ITextureSource;
}

export interface IContentMaterial {
  video?: ITextureSource;
  render?: ERenderType;
  customMaterial?: ICustomMaterial;
  // contentName?: string;
  // position?: Vector3 | null;
  // rotation?: Euler | null;
}

export enum ERenderType {
  STONE = 'stone',
  IRON = 'iron',
}

// Text content type
export interface IContentText {
  text: string;
  font?: string;
  color?: string;
  size?: string;
  scale?: [number, number, number];
}

// Export types
export interface ExportedSceneObject {
  name: string | null;
  type: string;
  slotNumber?: number;
  position: IVector3 | null;
  rotation: IEuler | null;
  scale?: IVector3;
  children: ExportedSceneObject[];
  contentMaterial: { [key in IContentMaterialType]?: IContentMaterial };
  contentText: { [key in IContentTextType]?: IContentText };
}

// Scene management types
export interface ISceneManager {
  root: ISceneObject | null;
  selectedObject: ISceneObject | null;
  buildScene(type: ArchitectureType): Promise<void>;
  addObject(type: BoardType | ProductType, parent?: ISceneObject): void;
  removeObject(object: ISceneObject): void;
  selectObject(object: ISceneObject | null): void;
  exportScene(): string;
  importScene(sceneData: string): void;
}

// Undo/Redo types
export interface ICommand {
  execute(): void;
  undo(): void;
}

export interface IUndoRedoManager {
  executeCommand(command: ICommand): void;
  undo(): void;
  redo(): void;
  canUndo(): boolean;
  canRedo(): boolean;
}

// Event system types
export type EventCallback = (...args: any[]) => void;

export interface IEventEmitter {
  on(event: string, callback: EventCallback): void;
  off(event: string, callback: EventCallback): void;
  emit(event: string, ...args: any[]): void;
}

// Performance optimization types
export interface ISceneOptimizer {
  optimizeScene(scene: ISceneObject): void;
  enableLevelOfDetail(object: ISceneObject): void;
  batchGeometries(objects: ISceneObject[]): ISceneObject;
}

// Asset management types
export interface IAssetManager {
  loadTexture(url: string): Promise<Texture>;
  loadModel(url: string): Promise<Object3D>;
  unloadAsset(assetId: string): void;
  getLoadedAssets(): string[];
}

// UI interaction types
export interface IInteractionManager {
  enableDragAndDrop(object: ISceneObject): void;
  disableDragAndDrop(object: ISceneObject): void;
  enableRotation(object: ISceneObject): void;
  disableRotation(object: ISceneObject): void;
  enableScaling(object: ISceneObject): void;
  disableScaling(object: ISceneObject): void;
}

// Rendering types
export interface IRenderingOptions {
  shadows: boolean;
  antialiasing: boolean;
  postProcessing: boolean;
}

export interface IRenderer {
  setOptions(options: IRenderingOptions): void;
  render(scene: ISceneObject, camera: Object3D): void;
}

// Camera types
export interface ICameraManager {
  setActiveCamera(cameraType: 'perspective' | 'orthographic'): void;
  zoomToObject(object: ISceneObject): void;
  resetView(): void;
}

// Plugin system types
export interface IPlugin {
  name: string;
  version: string;
  initialize(sceneManager: ISceneManager): void;
  cleanup(): void;
}

export interface IPluginManager {
  registerPlugin(plugin: IPlugin): void;
  unregisterPlugin(pluginName: string): void;
  getPlugin(pluginName: string): IPlugin | undefined;
}

