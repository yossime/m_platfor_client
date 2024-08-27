import { Material, Mesh, Object3D } from "three";
import { BoardType, CustomObject3D, ExportedSceneObject, IContentMaterialType, IContentTextType, ISceneObject, ISceneObjectOptions, SceneObject } from "./models";





export interface IBoard extends ISceneObject {
    // addPoudiom: (name: string) => void;
    slotNumber: number;
}

export class Board extends SceneObject implements IBoard {
    public slotNumber = -1;
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
        this.loadModelAndDisplay(onBoardLoaded);
    }



    async loadModelAndDisplay(onLoad?: () => void) {
        const boardUrl = `https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/boards%2F${this.type}.fbx?alt=media`;
        // const boardUrl = `https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/prodects%2FProd.fbx?alt=media&token=08240ada-8a7a-4e07-baf0-3afbe05a429c`;

        const model = await this.loadModel(boardUrl);

        const custommodel = model.children[0] as CustomObject3D;
        
        custommodel.onPointerDown = () => this.handleSelected(custommodel);
        custommodel.interactive = true;
        this.model = custommodel;


        await this.setPlaceholders();

        if (this.modelParent && this.position && this.rotation) {
            this.modelParent?.attach(this.model);
            this.model.position.copy(this.position);
            this.model.rotation.copy(this.rotation);
        }
        onLoad && onLoad();
    }


    // public async addContentData(data: IContentData): Promise<boolean> {
    //     const geometry = this.getGeometryByName(data.type);
    //     if (geometry) {
    //         await this.ChangeMaterial(geometry, data.texture)
    //         return true;
    //     }
    //     return false;
    // }



    displayEmptySlots() {

    }



    async setPlaceholders(): Promise<void> {
        try {
            if(!this.model) return;

            const slots = this.model.children[0].children.filter(child => child.name.startsWith('Slot_'));

            // const placeholderPath = `fbx-bucket/boards/${this.type}_slot_placeholder.glb`;
            const placeholderPath = `https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/boards%2Fplaceholder.fbx?alt=media&token=fc38725e-1a24-49e4-9d78-2282cc112387`;
            const placeholder = await this.loadModel(placeholderPath);


            slots.forEach(slot => {
                const placeholderClone = placeholder.clone().children[0] as CustomObject3D;

                placeholderClone.onPointerDown = (event) => this.handleSelectSlot(placeholderClone);
                // placeholderClone.onPointerDown = () => this.handleSelectSlot(placeholderClone);
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




    removeChild(sceneObject: SceneObject): void {
        const index = this.children.indexOf(sceneObject);
        if (index > -1) {
            this.children.splice(index, 1);
            // sceneObject.selectedChild = null;
        }
    }

    exportToJson(): string {
        const exportObject: ExportedSceneObject = {
            name: this.name ?? null,
            type: this.type,
            slotNumber: this.slotNumber, 
            position: this.position ? {
                x: this.position.x,
                y: this.position.y,
                z: this.position.z
            } : null,
            rotation: this.rotation ? {
                x: this.rotation.x,
                y: this.rotation.y,
                z: this.rotation.z
            } : null,
            // scale: this.scale ?? { x: 1, y: 1, z: 1 },
            children: this.children.map(child => JSON.parse(child.exportToJson())) ?? [],
            contentMaterial: {},
            contentText: {}
        };


        Array.from(this.contentMaterial.keys()).forEach((type: IContentMaterialType) => {
            const material = this.contentMaterial.get(type);
            console.log("material content", type, material);
            exportObject.contentMaterial[type as IContentMaterialType] = material;
        })

        Array.from(this.contentText.keys()).forEach((type: IContentTextType) => {
            const text = this.contentText.get(type);
            console.log("text content", type, text);
            exportObject.contentText[type as IContentTextType] = text;
        })
        return JSON.stringify(exportObject, null, 2);
    }
}

