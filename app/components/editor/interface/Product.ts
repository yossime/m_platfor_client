import { Material, Mesh, Object3D } from "three";
import { IContentData, ISceneObject, ISceneObjectData, SceneObject } from "./models";



export enum ProductType {
    Poudiom = 'PoudiomProduct',
    Header = 'HeaderBoard',
    Image = 'ImageBoard',
  }
  

export interface IProduct extends ISceneObject {
    addPoudiom: (name: string) => void;
}


export class Product extends SceneObject implements IProduct {
    constructor(type: ProductType, onProductLoaded?: () => void) {
        super(type, {} as Object3D);
        this.loadModelAndDisplay(onProductLoaded);
    }



    async loadModelAndDisplay(onLoad?: () => void) {
        const productUrl = `https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/Podium.fbx?alt=media&token=36ec521e-6930-44ef-b8f0-d23a5a24756d`;
        const model = await this.loadModel(productUrl);
        this.model = model.children[0];
        onLoad && onLoad();
    }

    
    public async addContentData(data: IContentData): Promise<boolean> {
        const geometry = this.getGeometryByName(data.type);
        if (geometry) {
            await this.ChangeMaterial(geometry, data.texture)
            return true;
        }
        return false;
    }



    displayEmptySlots() {

    }

    addPoudiom = (name: string) => {

    };

    addChild(sceneObject: SceneObject): void {
        this.children.push(sceneObject);
        sceneObject.selectedChild = this;
    }



    removeChild(sceneObject: SceneObject): void {
        const index = this.children.indexOf(sceneObject);
        if (index > -1) {
            this.children.splice(index, 1);
            sceneObject.selectedChild = null;
        }
    }
}

