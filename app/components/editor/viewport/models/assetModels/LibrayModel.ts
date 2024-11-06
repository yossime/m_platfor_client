import { ISceneObjectOptions } from "@/components/editor/types";
import { AssetModel } from "./AssetModel";

export class LibrayModel extends AssetModel {
  constructor(type: string,  options?: ISceneObjectOptions) {
    const modelPath = `models/${type}`;
    super(type, modelPath, options);
  }
}
