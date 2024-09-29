import { Object3D, Vector3, Euler, Mesh, Material, TextureLoader, MeshStandardMaterial, Texture, MeshPhongMaterial, MeshBasicMaterial } from 'three';

import { ISceneObject, ISceneObjectOptions, CustomObject3D, ICustomMaterial, ContentMaterial, ContentText, ContentObjects, ContentDataType, ContentData, ExportedSceneObject } from '../../types';
import { FBXLoader, Font, FontLoader, GLTFLoader, TextGeometry } from 'three/examples/jsm/Addons.js';
import { TextureManager } from '../utils/TextureManager';
import { EventManager } from '../utils/EventManager';
import { ModelLoader } from '../loaderes/ModelLoader';
// import { useEditor } from '@/context/useEditorContext';
// const { sceneModel } = useEditor();

export abstract class SceneObject implements ISceneObject {
  protected eventManager: EventManager;
  protected name: string | null = null;
  public type: string;
  protected model: Object3D | null = null;
  public children: ISceneObject[] = [];
  // protected placeholders: CustomObject3D[] = [];
  protected slots: CustomObject3D[] = [];
  protected position: Vector3 | null = null;
  protected rotation: Euler | null = null;
  protected scale: Vector3 = new Vector3(1, 1, 1);
  protected modelParent: Object3D | null = null;
  protected contentsData: Map<ContentDataType, ContentData> = new Map<ContentDataType, ContentData>();
  // protected onLoad: (model?: Object3D) => void;
  protected loader = new ModelLoader();
  protected readonly libraryUrl: string;

  constructor(type: string, options?: ISceneObjectOptions) {
    this.libraryUrl = 'https://storage.googleapis.com/library-all-test';
    this.type = type;
    this.eventManager = EventManager.getInstance();

    if (options) {
      this.name = options.exportedScenObj?.name || options.name || this.name;
      // this.position = options.position ?? this.position;
      // this.rotation = options.rotation ?? this.rotation;
    }

    this.loadModelAndDisplay(options?.onLoad).then(() => {
      if (options?.exportedScenObj !== undefined) {
        this.buildFromJson(options.exportedScenObj);
      }
    });
  }
  addChild?(sceneObject: ISceneObject): void {
    throw new Error('Method not implemented.');
  }
  removeChild?(sceneObject: ISceneObject): void {
    throw new Error('Method not implemented.');
  }
  getPosition(): Vector3 | null {
    return this.position;
  }
  getRotation(): Euler | null {
    return this.rotation;
  }




  // public abstract addChild(sceneObject: ISceneObject, slotNumber?: number): void;

  public displayEmptySlots(visible: boolean = true): void {
    this.setSlotsVisible(visible);
  }

  protected setSlotsVisible(visible: boolean): void {
    this.slots.forEach(slot => {
      slot.visible = visible;
    });
  };

  protected abstract loadModelAndDisplay(onLoad?: (model?: Object3D) => void): Promise<void>;

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

  public setContentText(type: ContentDataType, text: ContentText): void { }

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
    this.model?.traverse((child) => {
      if (child.name.startsWith('slot_')) {
        slots.push(child)
      }
    });
    return slots;
  }

  protected async loadPlaceholders(placeholderPath: string, handleSelectSlot: (object: CustomObject3D) => any): Promise<void> {
    if (!this.model) return;

    const placeholder = await this.loader.loadModel(placeholderPath);
    const slots = this.getSlotsPosition();

    slots.forEach(slot => {
      const placeholderClone = placeholder.clone().children[0] as CustomObject3D;
      placeholderClone.onPointerDown = () => handleSelectSlot(placeholderClone);
      placeholderClone.interactive = true;
      slot.parent?.attach(placeholderClone);
      placeholderClone.position.copy(slot.position);
      placeholderClone.rotation.copy(slot.rotation);
      placeholderClone.name = slot.name;
      placeholderClone.visible = false;
      slot.parent?.remove(slot);
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
          this.setContentText(key as ContentDataType, value.contentText)
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

  protected async changeMaterial(mesh: Object3D, material: ICustomMaterial): Promise<void> {
    if (!(mesh instanceof Mesh)) {
      console.warn('Attempted to change material of non-Mesh object');
      return;
    }

    const newMaterial = new MeshStandardMaterial();
    const textureManager = TextureManager.getInstance();

    if (material.diffuse) {
      if (material.diffuse.color) {
        newMaterial.color.setStyle(material.diffuse.color);
      }
      if (material.diffuse.map) {
        const texture = await textureManager.loadTexture(material.diffuse.map);
        newMaterial.map = texture;
      }
    }

    if (material.metalness) {
      newMaterial.metalness = material.metalness.value ?? 0;
      if (material.metalness.map) {
        const texture = await textureManager.loadTexture(material.metalness.map);
        newMaterial.metalnessMap = texture;
      }
    }

    if (material.roughness) {
      newMaterial.roughness = material.roughness.value ?? 0.5;
      if (material.roughness.map) {
        const texture = await textureManager.loadTexture(material.roughness.map);
        newMaterial.roughnessMap = texture;
      }
    }

    if (material.normal && material.normal.map) {
      const texture = await textureManager.loadTexture(material.normal.map);
      newMaterial.normalMap = texture;
    }

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

    this.modelParent = slot.parent;
    if (this.model && this.modelParent) {
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
    this.eventManager.setSelectedObject(this);


    // sceneModel?.setSelectedObject(this)
    // console.log(this.eventManager.getSelectedObject.name)
    return this
  };

  public isSelected = (selected: boolean): void => {
    const selectedMesh = this.getGeometryByName('selected');
    if (!selectedMesh) return;

    selectedMesh.visible = selected;
  }

  protected highlightMesh = (object: Object3D): void => {
    object.traverse((child) => {
      if (child instanceof Mesh) {
        const highlightMaterial = new MeshStandardMaterial({
          color: 0xff0000,
          emissive: 0xff0000,
          emissiveIntensity: 0.5,
        });
        child.material = highlightMaterial;
      }
    });
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
    try {
      const font = await this.loadFont('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json');
      const geometry = new TextGeometry(text.text, {
        font: font,
        size: 0.5,
        depth: 0.1,
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
