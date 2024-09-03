import { Object3D, Vector3, Euler, Mesh, Material, TextureLoader, MeshStandardMaterial, Texture } from 'three';

import { ISceneObject, ISceneObjectOptions, CustomObject3D, ICustomMaterial, IContentMaterialType, EContentImagesType, IContentMaterial, IContentText, IContentTextType, IContentObjects, ContentDataType, ContentData } from '../types';
import { FBXLoader, GLTFLoader } from 'three/examples/jsm/Addons.js';
import { TextureManager } from '../utils/TextureManager';

export abstract class SceneObject implements ISceneObject {
  protected name: string | null = null;
  protected type: string;
  protected model: Object3D | null = null;
  public children: ISceneObject[] = [];
  protected placeholders: CustomObject3D[] = [];
  protected position: Vector3 | null = null;
  protected rotation: Euler | null = null;
  protected scale: Vector3 = new Vector3(1, 1, 1);
  protected modelParent: Object3D | null = null;

  protected contentMaterial: Map<IContentMaterialType, IContentMaterial> = new Map<IContentMaterialType, IContentMaterial>();
  protected contentImages: Map<EContentImagesType, IContentMaterial> = new Map<EContentImagesType, IContentMaterial>();
  protected contentObjects: Map<ContentDataType, IContentObjects> = new Map<ContentDataType, IContentObjects>();
  protected contentText: Map<IContentTextType, IContentText> = new Map<IContentTextType, IContentText>();
  protected contentData: Map<ContentDataType, ContentData> = new Map<ContentDataType, ContentData>();

  constructor(type: string, options?: ISceneObjectOptions) {
    this.type = type;
    if (options) {
      this.name = options.name ?? this.name;
      this.position = options.position ?? this.position;
      this.rotation = options.rotation ?? this.rotation;
    }
  }

  abstract addChild(sceneObject: ISceneObject): void;
  abstract displayEmptySlots(): void;

  public setName(name: string): void {
    this.name = name;
  }

  public getContentMaterial(type: IContentMaterialType): IContentMaterial | null {
    return this.contentMaterial.get(type) ?? null;
  };
  public getContentText(type: IContentTextType): IContentText | null {
    return this.contentText.get(type) ?? null;
  };
  public getContentImage(type: EContentImagesType): IContentMaterial | null {
    return this.contentImages.get(type) ?? null;
  }

  public getContentObjects(type: ContentDataType): IContentObjects | null {
    return this.contentObjects.get(type) ?? null;
  }

  public getChildren(): ISceneObject[] | null {
    return this.children.length > 0 ? this.children : null;
  }

  public getEmptySlots(): CustomObject3D[] {
    return this.placeholders;
  }

  public getModel(): Object3D | null {
    return this.model;
  }

  public setPosition(position: Vector3): void {
    this.position = position;
    if (this.model) {
      this.model.position.copy(position);
    }
  }

  public setRotation(rotation: Euler): void {
    this.rotation = rotation;
    if (this.model) {
      this.model.rotation.copy(rotation);
    }
  }

  public setScale(scale: Vector3): void {
    this.scale = scale;
    if (this.model) {
      this.model.scale.copy(scale);
    }
  }

  public setContentMaterial(type: IContentMaterialType, material: IContentMaterial) {
    console.log('setContentMaterial')
  }

  public setContentObjects(type: ContentDataType, material: IContentObjects) {
    console.log('setContentObjects')
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

  protected setSlotsVisible(visible: boolean): void {
    this.placeholders.forEach(slot => {
      slot.visible = visible;
    });
  }



  protected async loadModel(modelPath: string, onLoad?: () => void, onError?: (error: Error) => void): Promise<CustomObject3D> {
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
  // protected async loadModel(modelPath: string): Promise<CustomObject3D> {
  //   const fileExtension = modelPath.split('.').pop()?.toLowerCase();
  //   let loader;

  //   switch (fileExtension) {
  //     case 'fbx':
  //       loader = new FBXLoader();
  //       break;
  //     case 'gltf':
  //     case 'glb':
  //       loader = new GLTFLoader();
  //       break;
  //     default:
  //       throw new Error(`Unsupported file format: ${fileExtension}`);
  //   }

  //   return new Promise((resolve, reject) => {
  //     loader.load(
  //       modelPath,
  //       (loadedModel) => {
  //         const model = loadedModel instanceof Object3D ? loadedModel : loadedModel.scene;
  //         resolve(model as CustomObject3D);
  //       },
  //       undefined,
  //       (error: { message: any; }) => reject(new Error(`Error loading model: ${error.message}`))
  //     );
  //   });
  // }

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

  private async loadTexture(path: string): Promise<Texture> {
    return new Promise((resolve, reject) => {
      new TextureLoader().load(
        path,
        resolve,
        undefined,
        (error) => reject(new Error(`Error loading texture: ${(error as Error).message}`))
      );
    });
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
    if (!this.model) {
      console.warn('Attempted to exchange slot without a model');
      return;
    }

    this.setPosition(slot.position);
    this.setRotation(slot.rotation);
    this.modelParent = slot.parent;

    if (this.modelParent) {
      this.modelParent.attach(this.model);
      this.model.position.copy(slot.position);
      this.model.rotation.copy(slot.rotation);
    }

    if (slot.parent) {
      slot.parent.remove(slot);
    }
  }

  protected handleSelected = (object: CustomObject3D) => { return this };

  // protected handleSelectSlot = (object: CustomObject3D): void => {
  //   this.highlightMesh(object);
  //   this.selectedSlot = object;
  // };

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

  // Performance optimization for large scenes
  public updateMatrixWorld(force?: boolean): void {
    if (this.model) {
      this.model.updateMatrixWorld(force);
    }
  }

  // Utility method for cloning
  public clone(): SceneObject {
    const clone = Object.create(Object.getPrototypeOf(this));
    Object.assign(clone, this);
    if (this.model) {
      clone.model = this.model.clone();
    }
    clone.children = this.children.map(child => child.clone());
    return clone;
  }

  // Cleanup method
  public dispose(): void {
    if (this.model) {
      this.model.traverse((object) => {
        if (object instanceof Mesh) {
          object.geometry.dispose();
          if (object.material instanceof Material) {
            object.material.dispose();
          }
        }
      });
    }
    this.children.forEach(child => child.dispose());
  }
}
