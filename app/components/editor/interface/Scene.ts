import { Object3D, Object3DEventMap, PerspectiveCamera } from "three";
import { Architecture, IArchitecture } from "./Architecture";
import { ISceneObject } from "./models";


export interface IScene {
    root: ISceneObject;
    getSelectedObject: () => ISceneObject | null;
    setSelectedObject: (selected: ISceneObject | null) => void;

}


export class SceneModel implements IScene {
    public root: IArchitecture;
    private selectedObject: ISceneObject | null = null;

    constructor(archType: string, onLoad: (model: Object3D) => void) {
        this.root = new Architecture(archType, onLoad);
    }
    
    getSelectedObject() {return this.selectedObject;};
    setSelectedObject(selected: ISceneObject | null) {this.selectedObject = selected};
}
