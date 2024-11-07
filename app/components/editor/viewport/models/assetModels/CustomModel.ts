import { AutoModelLoader } from "../../loaderes/AssetLoader";
import { AssetModel } from "./AssetModel";
import {  ISceneObjectOptions } from "@/components/editor/types";

export class CustomModel extends AssetModel {
  constructor(type: string, userID:string,  options?: ISceneObjectOptions) {
    const loader = new AutoModelLoader();
    super(type, type, options,loader);
    this.libraryUrl = `https://storage.googleapis.com/users-assets-a/${userID}`        
  }
}
