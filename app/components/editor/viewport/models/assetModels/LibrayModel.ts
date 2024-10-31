import { ISceneObjectOptions } from "@/components/editor/types";
import { AssetModel } from "./AssetModel";

export class LibrayModel extends AssetModel {
  constructor(type: string, modelType: string, options?: ISceneObjectOptions) {
    const modelPath = `assets/${modelType}`;
    super(type, modelPath, options);
  }
}
