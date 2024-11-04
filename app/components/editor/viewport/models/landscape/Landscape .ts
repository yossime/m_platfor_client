import { CustomObject3D, ISceneObjectOptions } from '@/components/editor/types';
import { SceneObject } from '../SceneObject';
import {  Object3D } from 'three';
import { FBXModelLoader, GLTFModelLoader } from '../../loaderes/AssetLoader';


export class Landscape  extends SceneObject   {



  constructor(type: string, options?: ISceneObjectOptions) {
    const landscapePath = `Landscape/${type}`;
    const loader = new GLTFModelLoader();
    super(type, landscapePath, options, loader);

  }

  async loadModelAndDisplay(
    onLoad?: (model: Object3D) => void
  ): Promise<void> {
   const modelUrl = `${this.libraryUrl}/${this.modelPath}`
    try {

      const model = await this.modelLoader?.loadModel(modelUrl);
      model?.traverse((child: CustomObject3D) => {
        child.onPointerDown = () => this.handleSelected(model);
        child.onPointerOver = () => this.handleHover();
        child.interactive = true;
        child.userData.draggable = false;
      });
      if (model) {
        // model.scale.set(0.05, 0.05, 0.05); 
        this.model = model;
      }      if (this.model && this.modelParent) {
        this.modelParent.attach(this.model);
      }
      if (this.model && this.position && this.rotation) {
        this.model.position.copy(this.position);
        this.model.rotation.copy(this.rotation);
      }
      onLoad && onLoad(this.model!);
    } catch (error) {
      console.error("Error loading model:", error);
    }
  }

  }


