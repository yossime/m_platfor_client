import { Color, Euler, Material, Mesh, MeshStandardMaterial, Object3D, PerspectiveCamera } from "three";
import { ArchitectureType, CustomObject3D, ISceneObject, ISceneObjectOptions, SceneObject } from "./models";
import { Board } from "./Board";




export interface IArchitecture extends ISceneObject {
    // getModel: () => Object3D | null;
}


export class Architecture extends SceneObject implements IArchitecture {
    constructor(type: ArchitectureType, onLoad?: (model: Object3D) => void, options?: ISceneObjectOptions) {
        super(type, options);
        this.setPlaceholders();
        this.loadModelAndDisplay(onLoad);
    }
    getModel() { return this.model; };







    async loadModelAndDisplay(onLoad?: (model: Object3D) => void) {
        // const archUrl = `https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/architectures%2FBarbiz.fbx?alt=media&token=1f805fdd-c127-45c5-b61f-2601b2aa8519`;
        const archUrl = `https://storage.googleapis.com/library-all-test/architectures/${this.type}.fbx`;
        const placeholderPath = `fbx-bucket/architectures/${this.type}_slot_placeholder.glb`;

        const model = await this.loadModel(archUrl);
        const custommodel = model as CustomObject3D;
        custommodel.onPointerDown = () => this.handleSelected(custommodel);
        custommodel.interactive = true;
        this.model = custommodel;
        // console.log("this.model,", this.model);
        await this.setPlaceholders();
        
        onLoad && onLoad(this.model);
    }

    displayEmptySlots() {
        this.setSlotsVisible(true);
    }



    async setPlaceholders(): Promise<void> {
        if (!this.model) return;

        try {
            const [groupA, groupB] = [
                this.model.children[0].children[0].children,
                this.model.children[0].children[1].children
            ];

            const slots = [...groupA, ...groupB].filter(child => child.name.startsWith('slot_'));
            const placeholderPath = `https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/architectures%2Fplaceholder.fbx?alt=media&token=980c6ee5-aaa5-4628-9636-1eddd8e0f91e`;
            // const placeholderPath = `fbx-bucket/architectures/${this.type}_slot_placeholder.glb`;
            const placeholder = await this.loadModel(placeholderPath);

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




    // removeChild(sceneObject: SceneObject): void {
    //     const index = this.children.indexOf(sceneObject);
    //     if (index > -1) {
    //         this.children.splice(index, 1);
    //         sceneObject.selectedChild = null;
    //     }
    // }


}

