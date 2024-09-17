import { Object3D, Vector3, Euler, Material, Texture } from 'three';
import { ArchitectureType } from '../viewport/models/architectures/types';


export interface ISceneObjectOptions {
  name?: string | null;
  position?: Vector3 | null;
  rotation?: Euler | null;
  scale?: Vector3;
  exportedScenObj?: ExportedSceneObject,
  onLoad?: (model?: Object3D) => void;
}

export interface ISceneObject {
  children: ISceneObject[];
  addChild(sceneObject: ISceneObject): void;
  removeChild?(sceneObject: ISceneObject): void;
  getChildren(): ISceneObject[] | null;
  getEmptySlots(): CustomObject3D[];
  displayEmptySlots(): void;
  exportToJson(): string;

  isSelected(selected: boolean): void;
  getContentMaterial(type: ContentDataType): IContentMaterial | null;
  getContentText(type: ContentDataType): IContentText | null;
  setContentMaterial(type: ContentDataType, material: IContentMaterial): void;
  setContentText?(type: ContentDataType, text: IContentText): void;
}

export interface CustomObject3D extends Object3D {
  onPointerDown?: (event: any) => ISceneObject;
  interactive?: boolean;
}

export enum ProductType {
  Poudiom = 'Poudiom',
  ProductDuo = 'Product_Duo_Podium',
  Image = 'ImageBoard',
}

export enum DisplayType {
  DUO = "Spotlight Duo",
  STANDS = "Podium stands",
}

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



export enum ContentDataType {
  TITLE = 'TITLE',
  SUB_TITLE = 'SUB_TITLE',
  BUTTON = 'BUTTON',
  TEXT = 'TEXT',
  SELF = 'SELF',
  IMAGE = 'IMAGE',
  IMAGE_0 = 'IMAGE_0',
  IMAGE_1 = 'IMAGE_1',
  LOGO = 'LOGO',
  FORM = 'FORM',
}



export enum MaterialSlotName {
  RIM = 'RIM',
  BACKGROUND = 'BACKGROUND'
}



export enum EContentImagesType {
  IMAGE = 'image',
  IMAGE_0 = 'image_0',
  IMAGE_1 = 'image_1',
}



export interface ContentData {
  contentObjects?: IContentObjects;
  contentText?: IContentText;
  contentMaterial?: IContentMaterial 
  // contentMaterial?: IContentMaterial | IContentMaterial[];
}

export interface IContentObjects {
  fbx?: string;
  meshName?: string;
  position?: Vector3 | null;
  rotation?: Euler | null;
}

export interface ITextureSource {
  color?: string;
  map?: string | File;
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
  slotname?: MaterialSlotName;
  video?: string | File;
  renderr?: ERenderrType;
  customMaterial?: ICustomMaterial;
}

export enum ERenderrType {
  STONE = 'stone',
  IRON = 'iron',
}

export enum ESkybox {
  DEFAULT = "Default",
  DARK = "Dark",
}


export interface IContentText {
  text: string;
  font?: string;
  color?: string;
  size?: string;
  scale?: [number, number, number];
}

export interface ExportedSceneObject {
  name: string | null;
  type: string;
  configuration: { [key in EConfiguration]?: EConfiguration };
  slotNumber?: number;
  position: Vector3 | null;
  rotation: Euler | null;
  scale?: Vector3;
  children: ExportedSceneObject[];
  contentData: { [key in ContentDataType]?: ContentData };
}

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

export type EventCallback = (...args: any[]) => void;

export interface IEventEmitter {
  on(event: string, callback: EventCallback): void;
  off(event: string, callback: EventCallback): void;
  emit(event: string, ...args: any[]): void;
}

export interface ISceneOptimizer {
  optimizeScene(scene: ISceneObject): void;
  enableLevelOfDetail(object: ISceneObject): void;
  batchGeometries(objects: ISceneObject[]): ISceneObject;
}

export interface IAssetManager {
  loadTexture(url: string): Promise<Texture>;
  loadModel(url: string): Promise<Object3D>;
  unloadAsset(assetId: string): void;
  getLoadedAssets(): string[];
}

export interface IInteractionManager {
  enableDragAndDrop(object: ISceneObject): void;
  disableDragAndDrop(object: ISceneObject): void;
  enableRotation(object: ISceneObject): void;
  disableRotation(object: ISceneObject): void;
  enableScaling(object: ISceneObject): void;
  disableScaling(object: ISceneObject): void;
}

export interface IRenderingOptions {
  shadows: boolean;
  antialiasing: boolean;
  postProcessing: boolean;
}

export interface IRenderer {
  setOptions(options: IRenderingOptions): void;
  render(scene: ISceneObject, camera: Object3D): void;
}

export interface ICameraManager {
  setActiveCamera(cameraType: 'perspective' | 'orthographic'): void;
  zoomToObject(object: ISceneObject): void;
  resetView(): void;
}

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





export enum BaseSize {
  SMALL = "Small",
  MEDIUM = "Medium",
  LARGE = "Large",
}

export enum TextStyle {
  DARK = "Dark",
  BLUE = "Blue",
  BRIGHT = "Bright",
}

export enum ButtonStyle {
  BLUE = "Blue",
  BRIGHT = "Bright",
  DARK = "Dark",
}

export enum ImageStyle {
  CROP = "Crop",
  FILL = "Fill",
}


export enum FormatBoard {
  Model = "Model",
  Frame = "Frame",
  Simple = "Simple",
}

export enum BoardType {
  Product = 'Product_Duo_Test2',
  MasterTextOn = 'MasterTextOn2',
  Header = 'MasterTextOn2',
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
  DisplayDuo = 'DisplayDuo'
}
