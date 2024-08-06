import { Object3D, Object3DEventMap, PerspectiveCamera } from "three";
import { Architecture, IArchitecture } from "./Architecture";
import { ISceneObject } from "./models";


export interface IScene {
    root: ISceneObject;
}


export class SceneModel implements IScene {
    root: IArchitecture;

    constructor(archType: string, model: Object3D) {

        this.root = new Architecture(archType, model);
    }
}
