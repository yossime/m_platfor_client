import { Object3D, Vector3, Euler, Material, Texture } from 'three';


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
  addChild?(sceneObject: ISceneObject): void;
  removeChild?(sceneObject: ISceneObject): void;
  getChildren(): ISceneObject[] | null;
  getEmptySlots(): CustomObject3D[];
  displayEmptySlots(): void;
  exportToJson(): string;
  getPosition(): Vector3 | null;
  getRotation(): Euler | null;

  isSelected(selected: boolean): void;
  getContentMaterial(type: ContentDataType): ContentMaterial | null;
  getContentText(type: ContentDataType): ContentText | null;
  setContentMaterial(type: ContentDataType, material: ContentMaterial): void;
  setContentText?(type: ContentDataType, text: ContentText): void;
}

export interface IArchitecture extends ISceneObject {
  addBoard(board: IBoard): void;
}

export interface IBoard extends ISceneObject {
  // addBoard(board: IBoard): void;
}

export interface ProductBoard extends ISceneObject {
  addChild?(sceneObject: ISceneObject): void;
  addProduct?(board: IBoard): void;
}
export interface FormBoard extends ISceneObject {
  getFormInput(type: ContentDataType, label: InputLabelType): InputField | null;
  setFormInput(type: ContentDataType, label: InputLabelType, contentFormInput: InputField): void;
  getContentForm?(type: ContentDataType): ContentForm | null;
  setContentForm?(type: ContentDataType,contentForn: ContentForm): void;
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
  TITLE = 'title',
  SUB_TITLE = 'subtitle',
  BUTTON = 'button',
  TEXT = 'text',
  SELF = 'self',
  FRAME = 'frame',
  FRAME_0 = 'frame_0',
  FRAME_1 = 'frame_1',
  LOGO = 'logo',
  FORM = 'form',
  NAME = 'name',
  DESCRIPTION = 'description',
  PRIC = 'price',
  PRODUCT = 'product',
  EMAIL = 'email',

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
  contentObjects?: ContentObjects;
  contentText?: ContentText;
  contentMaterial?: ContentMaterial
  contentForm?: ContentForm;
}



export interface ContentForm {
  inputs?: Map<InputLabelType, InputField>;
}

export interface InputField {
  label?: ContentText;
  placeholder?: ContentText;
  required?: boolean;
  default?:ContentText;
}

export enum InputLabelType {
  NAME = 'name',
  EMAIL = 'email',
  PHONE_NUMBER = 'phoneNumber',
  COMPANY_NAME = 'companyName',
  FREE_TEXT = 'freeText',
}

export interface ContentObjects {
  model?: string;
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

export interface ContentMaterial {
  slotname?: MaterialSlotName;
  video?: string | File;
  renderer?: ERendererType;
  customMaterial?: ICustomMaterial;
}

export enum ERendererType {
  STONE = 'stone',
  IRON = 'iron',
}

export enum ESkybox {
  DEFAULT = "Default",
  DARK = "Dark",
}


export interface ContentText {
  text: string;
  font?: string;
  color?: string;
  size?: string;
  scale?: [number, number, number];
}

export interface ExportedSceneObject {
  name: string | null;
  type: string;
  format?: FormatBoard;
  configuration: { [key in EConfiguration]?: EConfiguration };
  slotNumber?: number;
  position: Vector3 | null;
  rotation: Euler | null;
  scale?: Vector3;
  children: ExportedSceneObject[];
  contentsData: { [key in ContentDataType]?: ContentData };
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
  Model = "model",
  Frame = "frame",
  Simple = "simple",
}


export enum BoardType {
  Video = 'video',
  Header = 'header',
  Image = 'image',
  Product = 'product',
  Form = 'form',
  Subscription = 'subscription',
  Slider = 'SliderBoard',
  Testimonials = 'TestimonialsBoard',
  Services = 'ServicesBoard',
  Gamification = 'GamificationBoard',
  Socials = 'SocialsBoard',
  Article = 'ArticleBoard',
}

export enum ArchitectureType {
  TWO_CIRCLES = 'two_circles'
}






