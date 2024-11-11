import { Object3D } from "three";
import { AutoModelLoader, GLTFModelLoader, TestLoader } from "../../loaderes/AssetLoader";
import { AssetModel } from "./AssetModel";
import {  CustomObject3D, ISceneObjectOptions } from "@/components/editor/types";

export class GenerateModel extends AssetModel {
  constructor(type: string, userID:string,  options?: ISceneObjectOptions) {
    const loader = new TestLoader();
    super(type, type, options,loader);
    this.libraryUrl = type 
  }

  async loadModelAndDisplay(onLoad?: (model: Object3D) => void): Promise<void> {
    const modelUrl = `${this.libraryUrl}`;
    try {
      const model = await this.modelLoader?.loadModel(modelUrl);
      model?.traverse((child: CustomObject3D) => {
        child.onPointerDown = () => this.handleSelected(model);
        child.onPointerOver = () => this.handleHover();
        child.interactive = true;
        child.userData.draggable = true;
      });
      if (model) this.model = model;
      if (this.model && this.modelParent) {
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
