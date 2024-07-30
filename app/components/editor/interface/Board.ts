import { Material, Mesh, Object3D } from "three";
import { CustomObject3D, IContentData, ISceneObject, ISceneObjectData, SceneObject } from "./models";



export enum BoardType {
    Product = 'ProductBoard',
    Header = 'HeaderBoard',
    Image = 'ImageBoard',
}


export interface IBoard extends ISceneObject {
    // addPoudiom: (name: string) => void;
}


export class Board extends SceneObject implements IBoard {
    constructor(type: BoardType, onBoardLoaded?: () => void) {
        super(type, {} as Object3D);
        this.loadModelAndDisplay(onBoardLoaded);

    }



    async loadModelAndDisplay(onLoad?: () => void) {
        // const boardUrl = `https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/boards%2F${this.type}.fbx?alt=media`;
        const boardUrl = `https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/prodects%2FProd.fbx?alt=media&token=08240ada-8a7a-4e07-baf0-3afbe05a429c`;

        const model = await this.loadModel(boardUrl);
        this.model = model.children[0];


        await this.setPlaceholders();

        if (this.modelParent && this.position && this.rotation) {
            this.modelParent?.attach(this.model);
            this.model.position.copy(this.position);
            this.model.rotation.copy(this.rotation);
        }
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



    async setPlaceholders(): Promise<void> {
        try {

            const slots = this.model.children[0].children.filter(child => child.name.startsWith('Slot_'));

            const placeholderUrl = "https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/prodects%2FpoudiomPlaceholder.fbx?alt=media&token=73fd7d81-3728-485b-b486-6248521dd188";

            const placeholder = await this.loadModel(placeholderUrl);

            slots.forEach(slot => {
                const placeholderClone = placeholder.clone().children[0] as CustomObject3D;

                placeholderClone.onPointerDown = () => this.handleSelectSlot(placeholderClone);


                placeholderClone.interactive = true;

                slot.parent?.attach(placeholderClone);
                placeholderClone.position.copy(slot.position);
                placeholderClone.rotation.copy(slot.rotation);
                placeholderClone.visible = false;
                slot.parent?.remove(slot);
                this.placeholders.push(placeholderClone);
            });

        } catch (error) {
            console.error("Error loading or setting placeholders:", error);
        }

    }




    addChild(sceneObject: SceneObject): void {
        console.log("Adding child")
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
