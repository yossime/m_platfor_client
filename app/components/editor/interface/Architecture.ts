import { Color, Euler, Material, Mesh, MeshStandardMaterial, Object3D, PerspectiveCamera } from "three";
import { CustomObject3D, IContentData, ISceneObject, SceneObject } from "./models";
import { Board } from "./Board";




export interface IArchitecture extends ISceneObject {
    getModel: () => Object3D | null;
}


export class Architecture extends SceneObject implements IArchitecture {
    constructor(type: string, onLoad: (model: Object3D) => void) {
        super(type);
        this.setPlaceholders();
        this.loadModelAndDisplay(onLoad);
    }
    getModel() { return this.model; };







    async loadModelAndDisplay(onLoad?: (model: Object3D) => void) {
        const archUrl = 'https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/architectures%2FBarbizKip1.fbx?alt=media';

        const model = await this.loadModel(archUrl);
        const custommodel = model as CustomObject3D;
        custommodel.onPointerDown = () => this.handleSelected(custommodel);
        custommodel.interactive = true;
        this.model = custommodel;

        await this.setPlaceholders();

        // if (this.modelParent && this.position && this.rotation) {
        //     this.modelParent?.attach(this.model);
        //     this.model.position.copy(this.position);
        //     this.model.rotation.copy(this.rotation);
        // }

        onLoad && onLoad(this.model);
    }

    displayEmptySlots() {
        this.setSlotsVisible(true);
    }



    async addContentData(data: IContentData): Promise<boolean> {
        const geometry = this.getGeometryByName(data.type);
        if (geometry) {
            await this.ChangeMaterial(geometry, data.texture)
            return true;
        }
        return false;
    }



    async setPlaceholders(): Promise<void> {
        if (!this.model) return;

        try {
            const [groupA, groupB] = [
                this.model.children[0].children[0].children,
                this.model.children[0].children[1].children
            ];

            const slots = [...groupA, ...groupB].filter(child => child.name.startsWith('Slot_'));

            const placeholderUrl = "https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/boards%2Fplaceholder.fbx?alt=media&token=fc38725e-1a24-49e4-9d78-2282cc112387";

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




    removeChild(sceneObject: SceneObject): void {
        const index = this.children.indexOf(sceneObject);
        if (index > -1) {
            this.children.splice(index, 1);
            sceneObject.selectedChild = null;
        }
    }


}

