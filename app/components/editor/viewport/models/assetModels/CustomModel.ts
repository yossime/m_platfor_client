import { AssetModel } from "./AssetModel";
import {  ISceneObjectOptions } from "@/components/editor/types";

export class CustomModel extends AssetModel {
  constructor(type: string, options?: ISceneObjectOptions) {
    super(type, type, options);
    this.libraryUrl = "https://storage.googleapis.com/users-assets-a"                 
  }


}
