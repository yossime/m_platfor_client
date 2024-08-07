import { Object3D, Object3DEventMap, PerspectiveCamera } from "three";
import { Architecture, IArchitecture } from "./Architecture";
import { ISceneObject, SceneObject } from "./models";






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


    
    // exportToJson(): string {
    //     const sceneObject = this.root as SceneObject;
    //     const exportObject: ExportedSceneObject = {
    //         name: sceneObject.name ?? null,
    //         type: sceneObject.type,
    //         position: sceneObject.position ? {
    //             x: sceneObject.position.x,
    //             y: sceneObject.position.y,
    //             z: sceneObject.position.z
    //         } : null,
    //         rotation: sceneObject.rotation ? {
    //             x: sceneObject.rotation.x,
    //             y: sceneObject.rotation.y,
    //             z: sceneObject.rotation.z
    //         } : null,
    //         scale: sceneObject.scale ?? { x: 1, y: 1, z: 1 },
    //         children: sceneObject.getChildren()?.map(child => JSON.parse(this.exportToJson(child))) ?? [],
    //         contentData: Array.from(sceneObject.constentData.entries()).map(([key, value]) => ({
    //             ...value
    //         }))
    //     };
    
    //     return JSON.stringify(exportObject, null, 2);
    // }
}
