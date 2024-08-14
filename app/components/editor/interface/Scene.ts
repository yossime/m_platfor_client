import { Euler, Object3D, Object3DEventMap, PerspectiveCamera, Vector3 } from "three";
import { Architecture, IArchitecture } from "./Architecture";
import { ArchitectureType, BoardType, ExportedSceneObject, ISceneObject, ProductType, SceneObject } from "./models";
import { Board } from "./Board";
import { Product } from "./Product";
import axios from "@/utils/axios";






export interface IScene {
    root?: ISceneObject;
    getSelectedObject: () => ISceneObject | null;
    setSelectedObject: (selected: ISceneObject | null) => void;
    buildingFromScratch: (type: ArchitectureType, onLoad: (model: Object3D) => void) => Promise<ISceneObject>;
    buildFromJson:(json: string) => Promise<ISceneObject>;
    exportToJson:() => Promise<string>;
}


export class SceneModel implements IScene {
    public root?: ISceneObject;
    private selectedObject: ISceneObject | null = null;
    onLoad?: (model: Object3D) => void;
    // constructor(type: ArchitectureType, onLoad: (model: Object3D) => void) {
    //     this.root = new Architecture(type, onLoad);
    // }

    constructor(onLoad?: (model: Object3D) => void) {
        this.onLoad = onLoad;
    }
    // exportToJson = async () => {
    //     return new Promise<string>((resolve, reject) => {
    //         resolve('json')
    //     });
    // };

    async sendToServer() {
        if (!this.root) return null;

        const jsonData = this.root.exportToJson();
        console.log("data jsonData", jsonData);

        try {
            const response = await axios.post('https://server-cloud-run-service-kruirvrv6a-uc.a.run.app/preview/tytytytyty33333333333333333', jsonData, {

                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Data sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }

    exportToJson = async () => {
        if (!this.root) return null;
        await this.sendToServer();
        return this.root.exportToJson();
    };

    buildingFromScratch = (type: ArchitectureType): Promise<ISceneObject> => {
        this.root = new Architecture(type, this.onLoad);
        return Promise.resolve(this.root);
    };
    buildFromJson = (json: string): Promise<ISceneObject> => {
        this.root = this.buildSceneObjectFromJson(json);
        return Promise.resolve(this.root);
    };

    getSelectedObject() { return this.selectedObject; };
    setSelectedObject(selected: ISceneObject | null) { this.selectedObject = selected };





    buildSceneObjectFromJson(json: string): SceneObject {
        const data: ExportedSceneObject = JSON.parse(json);

        let sceneObject: SceneObject;

        function isArchitectureType(type: any): type is ArchitectureType {
            return Object.values(ArchitectureType).includes(type);
        }

        function isBoardType(type: any): type is BoardType {
            return Object.values(BoardType).includes(type);
        }

        function isProjectType(type: any): type is ProductType {
            return Object.values(ProductType).includes(type);
        }

        const options = {
            name: data.name,
            position: data.position ? new Vector3(data.position.x, data.position.y, data.position.z) : null,
            rotation: data.rotation ? new Euler(data.rotation.x, data.rotation.y, data.rotation.z) : null,
            scale: new Vector3(1, 1, 1)
        }

        switch (true) {
            case isArchitectureType(data.type):
                sceneObject = new Architecture(data.type, this.onLoad, options);
                break;
            case isBoardType(data.type):
                sceneObject = new Board(data.type, options);
                break;
            case isProjectType(data.type):
                sceneObject = new Product(data.type, options);
                break;
            default:
                throw new Error(`Unknown type: ${data.type}`);
        }



        data.children.forEach(childData => {
            const childJson = JSON.stringify(childData);
            const childObject = this.buildSceneObjectFromJson(childJson);
            sceneObject.addChild(childObject);
        });

        return sceneObject;
    }
}
