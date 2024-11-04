import { Object3D } from "three";
import { AssetModel } from "./AssetModel";
import {  ISceneObjectOptions } from "@/components/editor/types";

export class CustomModel extends AssetModel {
  constructor(type: string, modelPath: string, options?: ISceneObjectOptions) {
    super(type, modelPath, options);
    this.libraryUrl = "https://storage.googleapis.com/users-assets-a"                 
  }


}
