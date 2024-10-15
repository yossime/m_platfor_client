import { Object3D, Vector3, Euler, Mesh, Material, TextureLoader, MeshStandardMaterial, Texture, MeshPhongMaterial, MeshBasicMaterial } from 'three';
import { v4 as uuidv4 } from 'uuid';
import { ISceneObject, ISceneObjectOptions, CustomObject3D, ICustomMaterial, ContentMaterial, ContentText, ContentObjects, ContentDataType, ContentData, ExportedSceneObject, TextAlign, FontWeight, TextParams } from '../../types';
import { FBXLoader, Font, FontLoader, GLTFLoader, TextGeometry } from 'three/examples/jsm/Addons.js';
import { TextureManager } from '../utils/TextureManager';
import { ModelLoader } from '../loaderes/ModelLoader';
import { Text as TroikaText } from 'troika-three-text';
import * as THREE from 'three';
import { CommandManager } from '../commands/CommandManager';
import { ChangeTextCommand } from '../commands/ChangeTextCommand';
import { TextObject } from '../../function/curveText';
import { createMaterial } from '../../material/createMaterialSphere';
import { AssetLoader } from '../loaderes/AssetLoader';


export abstract class SceneObject implements ISceneObject {
  public id: string = uuidv4();
  public name: string | null = null;
  public type: string;
  protected model: Object3D | null = null;
  public children: SceneObject[] = [];
  protected slots: CustomObject3D[] = [];
  protected position: Vector3 | null = null;
  protected rotation: Euler | null = null;
  protected scale: Vector3 = new Vector3(1, 1, 1);
  protected modelParent: Object3D | null = null;
  protected contentsData: Map<ContentDataType, ContentData> = new Map<ContentDataType, ContentData>();
  protected readonly libraryUrl: string;
  protected commandManager = CommandManager.getInstance();
  protected modelPath: string;
  // protected static getModelPath: () => string;


  constructor(type: string, modelPath: string, options?: ISceneObjectOptions) {
    this.libraryUrl = 'https://storage.googleapis.com/library-all-test';
    this.type = type;
    this.modelPath = modelPath;

    if (options) {
      this.name = options.exportedScenObj?.name || options.name || this.name;
      // this.position = options.position ?? this.position;
      // this.rotation = options.rotation ?? this.rotation;
    }


    this.loadModelAndDisplay(options?.onLoad);
    // this.loadModelAndDisplay(options?.onLoad).then(() => {
    //   if (options?.exportedScenObj !== undefined) {
    //     this.buildFromJson(options.exportedScenObj);
    //   }
    // });
  }
  // protected abstract loadModelAndDisplay(onLoad?: (model?: Object3D) => void): Promise<void>;


  protected async loadModelAndDisplay(onLoad?: (model: Object3D) => void): Promise<void> {
    const modelUrl = `${this.libraryUrl}/${this.modelPath}.glb`;
    try {
      const model = await AssetLoader.loadModel(modelUrl);
      model?.traverse((child: CustomObject3D) => {
        // child.onPointerDown = () => { console.log('this.handleSelected(model)'); return this };
        child.onPointerDown = () => this.handleSelected(model);
        child.interactive = true;
      });
      this.model = model;
      if (this.model && this.modelParent && this.position && this.rotation) {
        this.modelParent.attach(this.model);
        this.model.position.copy(this.position);
        this.model.rotation.copy(this.rotation);
      }

      onLoad && onLoad(this.model!);
    } catch (error) {
      console.error('Error loading model:', error);
      throw new Error('Failed to load architecture model');
    }
  }

  getModel() { return this.model }
  addChild(sceneObject: ISceneObject): void {
    throw new Error('Method not implemented.');
  }
  removeChild(sceneObject: ISceneObject): void {
    throw new Error('Method not implemented.');
  }
  getPosition(): Vector3 | null {
    return this.position;
  }
  getRotation(): Euler | null {
    return this.rotation;
  }


  protected initializeContentText(type: ContentDataType, initproperties: TextParams, meshName?: string): void {
    const mesh = this.getGeometryByName(meshName || type);
    if (mesh instanceof THREE.Mesh) {
      const textObject = new TextObject(mesh, initproperties);

      this.contentsData.set(type,
        {
          contentText: {
            ...textObject.getParams(),
          }
        });
    }
  }

  protected initializeContentFram(type?: ContentDataType): void {
    this.model?.traverse(
      (child) => {
        if (child.name.startsWith('ph_')) {
          child.visible = false;
        }
      }
    )
    // const mesh = this.getGeometryByName(type);

    // if (mesh instanceof THREE.Mesh) {
    //   mesh.visible = false;
    // }
  }

  protected getTextObject(type: ContentDataType): TextObject | null {
    let meshName = type;
    if (type === ContentDataType.BUTTON) {
      meshName = `${type}_text` as ContentDataType;
    }
    const object = this.getGeometryByName(type);
    if (object instanceof TextObject) return object;
    return null;
  }

  public setContentText(type: ContentDataType, newParams: Partial<TextParams>): void {
    if (!this.model) return;
    const textObject = this.getTextObject(type);
    if (!textObject) return;

    const oldProperties = { ...textObject.getParams() }
    const command = new ChangeTextCommand(this, type, textObject, newParams, oldProperties);
    this.commandManager.execute(command);
  }

  public updateContentData(type: ContentDataType, updatedData: ContentData): void {
    this.contentsData.set(type, updatedData);
  }

  public displayEmptySlots(visible: boolean = true): void {
    this.slots.forEach(slot => {
      if (slot.isEmpty) {
        slot.visible = visible;
      }
    });
  }

  protected setSlotsVisible(visible: boolean): void {
    this.slots.forEach(slot => {
      if (slot.isEmpty) {
        slot.visible = visible;
      }
    });
  };


  public setName(name: string): void { this.name = name };

  public getContentMaterial(type: ContentDataType): ContentMaterial | null {
    return this.contentsData.get(type)?.contentMaterial ?? null;
  };

  public getContentText(type: ContentDataType): ContentText | null {
    return this.contentsData.get(type)?.contentText ?? null;
  };

  public getChildren(): ISceneObject[] | null {
    return this.children.length > 0 ? this.children : null;
  }

  public getEmptySlots(): CustomObject3D[] {
    return this.slots;
  }

  // public setContentText(type: ContentDataType, text: ContentText): void { }

  public setContentMaterial(type: ContentDataType, material: ContentMaterial) { }


  protected setPosition(position: Vector3): void {
    this.position = position;
    if (this.model) {
      this.model.position.copy(position);
    }
  }





  protected setRotation(rotation: Euler): void {
    this.rotation = rotation;
    if (this.model) {
      this.model.rotation.copy(rotation);
    }
  }

  protected setScale(scale: Vector3): void {
    this.scale = scale;
    if (this.model) {
      this.model.scale.copy(scale);
    }
  }

  protected getSlotsPosition(): Object3D[] {
    if (!this.model) return [];
    const slots: Object3D[] = [];
    // const slotsGroups: THREE.Object3D[] = [];


    // this.model?.traverse((child) => {
    //   if (child.name.startsWith('Group')) {
    //     slotsGroups.push(child)
    //   }
    // });
    // slotsGroups.forEach((group) => {
    //   const clonedGroup = group.clone();
    //   clonedGroup.name = `boards_${group.name}`;
    //   group.parent?.attach(clonedGroup);
    // });
    this.model?.traverse((child) => {
      if (child.name.startsWith('slot_')) {
        slots.push(child)
      }
    });
    return slots;
  }

  protected async loadPlaceholders(placeholderPath: string, handleSelectSlot: (object: CustomObject3D) => any): Promise<void> {
    if (!this.model) return;
    const placeholder = await AssetLoader.loadModel(placeholderPath);
    const slots = this.getSlotsPosition();

    slots.forEach(slotMesh => {
      const placeholderClone = placeholder?.clone() as CustomObject3D;
      placeholderClone.traverse((child: CustomObject3D) => {
        child.onPointerDown = () => handleSelectSlot(placeholderClone);
        child.interactive = true;
      });

      slotMesh.parent?.attach(placeholderClone);
      placeholderClone.isEmpty = true;
      placeholderClone.visible = false;
      placeholderClone.position.copy(slotMesh.position);
      placeholderClone.rotation.copy(slotMesh.rotation);
      placeholderClone.name = slotMesh.name;
      slotMesh.parent?.remove(slotMesh);
      this.slots.push(placeholderClone);
    });
  } catch(error: any) {
    console.error('Error setting placeholders:', error);
    throw new Error('Failed to set placeholders');
  }


  public exportToJson(): string {
    const exportObject = {
      name: this.name,
      type: this.type,
      // position: this.position,
      // rotation: this.rotation,
      // scale: this.scale,
      children: this.children.map(child => JSON.parse(child.exportToJson()))
    };
    return JSON.stringify(exportObject, null, 2);
  }


  public buildFromJson(exportedObj: ExportedSceneObject) {
    if (exportedObj.contentsData) {
      for (const [key, value] of Object.entries(exportedObj.contentsData)) {

        if (value.contentMaterial) {
          this.setContentMaterial(key as ContentDataType, value.contentMaterial)
        }
        if (value.contentText) {
          // this.setContentText(key as ContentDataType, value.contentText)
        }
        if (value.contentForm) {
          // this.setContentText(key as ContentDataType, value.contentText)
        }
      }
    }
  }

  protected async applyVideoMaterial(mesh: Object3D, src: string | File): Promise<void> {
    if (!(mesh instanceof Mesh)) {
      console.warn('Attempted to apply video material to non-Mesh object');
      return;
    }
    const newMaterial = new MeshBasicMaterial();
    const textureManager = TextureManager.getInstance();

    if (src) {
      const videoTexture = await textureManager.loadVideoTexture(src);
      newMaterial.map = videoTexture;
      mesh.material = newMaterial;
    }
  }

  protected async changeMaterial(mesh: THREE.Mesh, material: ICustomMaterial): Promise<void> {
    const newMaterial = await createMaterial(material)
    mesh.material = newMaterial;
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

  public exchangeSlot(slot: CustomObject3D): void {
    this.setPosition(slot.position);
    this.setRotation(slot.rotation);

    slot.visible = false;
    this.modelParent = slot.parent;
    if (this.model && this.modelParent) {
      this.model.name = slot.name;
      this.modelParent.attach(this.model);
      this.model.position.copy(slot.position);
      this.model.rotation.copy(slot.rotation);
    }

    // if (slot.parent) {
    //   slot.parent.remove(slot);
    // }
  }

  protected handleSelected = (object: CustomObject3D) => {
    this.highlightMesh(object);

    // sceneModel?.setSelectedObject(this)
    // console.log('this.eventManager.getSelectedObject.name', this.name)
    return this
  };

  public isSelected = (selected: boolean): void => {
    const selectedMesh = this.getGeometryByName('selected');
    if (!selectedMesh) return;

    selectedMesh.visible = selected;
  }

  protected highlightMesh = (object: Object3D): void => {
    // object.traverse((child) => {
    //   if (child instanceof Mesh) {
    //     const highlightMaterial = new MeshStandardMaterial({
    //       color: 0xff0000,
    //       emissive: 0xff0000,
    //       emissiveIntensity: 0.5,
    //     });
    //     child.material = highlightMaterial;
    //   }
    // });
  };

  protected applyText(mesh: Mesh, text: ContentText): void {
    this.straightText(mesh, text)
  }

  protected async applyRenderMaterial(mesh: Mesh, renderType: string): Promise<void> {
    const textureManager = TextureManager.getInstance();
    const textureUrl = `https://storage.googleapis.com/library-materials-test-all/${renderType}.jpg`;

    await this.changeMaterial(mesh, { diffuse: { map: textureUrl } });
  }

  async loadFont(url: string): Promise<Font> {
    const loader = new FontLoader();

    return new Promise((resolve, reject) => {
      loader.load(url, resolve, undefined, reject);
    });
  }

  async straightText(mesh: Mesh, text: ContentText) {
    // try {
    //   const font = await this.loadFont('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json');
    //   const geometry = new TextGeometry(text.text, {
    //     font: font,
    //     size: 0.5,
    //     depth: 0.1,
    //   });

    //   const material = new MeshPhongMaterial({ color: 0xffffff });
    //   const newMesh = new Mesh(geometry, material);
    //   newMesh.position.copy(mesh.position);

    //   mesh.geometry.dispose();
    //   mesh.geometry = geometry;
    //   mesh = newMesh;

    // } catch (error) {
    //   console.error('Error replacing text:', error);
    // }
  }

  // Performance optimization for large scenes
  public updateMatrixWorld(force?: boolean): void {
    if (this.model) {
      this.model.updateMatrixWorld(force);
    }
  }

  // Utility method for cloning
  // public clone(): SceneObject {
  //   const clone = Object.create(Object.getPrototypeOf(this));
  //   Object.assign(clone, this);
  //   if (this.model) {
  //     clone.model = this.model.clone();
  //   }
  //   clone.children = this.children.map(child => child.clone());
  //   return clone;
  // }

  // Cleanup method
  // public dispose(): void {
  //   if (this.model) {
  //     this.model.traverse((object) => {
  //       if (object instanceof Mesh) {
  //         object.geometry.dispose();
  //         if (object.material instanceof Material) {
  //           object.material.dispose();
  //         }
  //       }
  //     });
  //   }
  //   this.children.forEach(child => child.dispose());
  // }
}
