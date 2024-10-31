import { Object3D } from "three";
import { AssetModel } from "./AssetModel";
import { CustomObject3D, ISceneObjectOptions } from "@/components/editor/types";
import { AssetLoader } from "../../loaderes/AssetLoader";

export class CustomModel extends AssetModel {
  constructor(type: string, modelPath: string, options?: ISceneObjectOptions) {
    super(type, modelPath, options);
  }


}
