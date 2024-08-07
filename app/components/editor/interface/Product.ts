import { Material, Mesh, Object3D } from "three";
import { CustomObject3D, IContentData, ISceneObject, SceneObject } from "./models";



export enum ProductType {
    Poudiom = 'PoudiomProduct',
    Header = 'HeaderBoard',
    Image = 'ImageBoard',
  }
  

export interface IProduct extends ISceneObject {
    addPoudiom: (name: string) => void;
}


export class Product extends SceneObject implements IProduct {
    constructor(type: ProductType, name?: string) {
        super(type, name);
        this.loadModelAndDisplay();
    }



    async loadModelAndDisplay(onLoad?: () => void) {
        const productUrl = `https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/Podium.fbx?alt=media&token=36ec521e-6930-44ef-b8f0-d23a5a24756d`;
        const model = await this.loadModel(productUrl);
        const custommodel = model.children[0] as CustomObject3D;
        custommodel.onPointerDown = () => this.handleSelected(custommodel);
        custommodel.interactive = true;
        this.model = custommodel;
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
        if (this.selectedSlot) {
            this.children.push(sceneObject);
            sceneObject.selectedChild = this;
            this.setSlotsVisible(false);
            this.selectedSlot = null;
        } else {
            this.setSlotsVisible(true);
            this.childToAdd = sceneObject;
        }
    }




    removeChild(sceneObject: SceneObject): void {
        const index = this.children.indexOf(sceneObject);
        if (index > -1) {
            this.children.splice(index, 1);
            sceneObject.selectedChild = null;
        }
    }
}

