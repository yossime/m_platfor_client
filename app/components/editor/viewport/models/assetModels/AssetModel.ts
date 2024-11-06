import { SceneObject } from "../SceneObject";
import { CustomObject3D, ISceneObjectOptions } from "../../../types";
import { Euler, Object3D, Vector3 } from "three";

export abstract class AssetModel extends SceneObject {
  constructor(type: string, modelPath: string, options?: ISceneObjectOptions) {
    super(type, modelPath, options);
    this.name = "Model";
  }

  async loadModelAndDisplay(onLoad?: (model: Object3D) => void): Promise<void> {
    const modelUrl = `${this.libraryUrl}/${this.modelPath}`;
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

  public updatePosition(newPosition: Vector3): void {
    if (this.model) {
      this.model.position.copy(newPosition);
    }
  }

  public updateRotation(newRotation: Euler): void {
    if (this.model) {
      this.model.rotation.copy(newRotation);
    }
  }

  public updateScale(newScale: Vector3): void {
    if (this.model) {
      this.model.scale.copy(newScale);
    }
  }
}
