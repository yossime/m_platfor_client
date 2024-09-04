import { Object3D, Vector3, Euler } from 'three';
import { SceneObject } from './SceneObject';
import { ArchitectureType, ISceneObjectOptions, ISceneObject, CustomObject3D } from '../types';
import { Board } from './Board';

export class Architecture extends SceneObject {
    private placeholderPath: string;
    private selectedSlot: CustomObject3D | null = null;
    private childToAdd: ISceneObject | null = null;

    constructor(type: ArchitectureType, onLoad?: (model: Object3D) => void, options?: ISceneObjectOptions) {
        super(type, options);
        this.placeholderPath = `https://storage.googleapis.com/library-all-test/placeholders/${this.type}.fbx`;
        // this.setPlaceholders();
        this.loadModelAndDisplay(onLoad);
    }

    public addChild(sceneObject: ISceneObject): void {
        if (this.selectedSlot) {
            
            if (sceneObject instanceof Board) {
                console.log('addChild slot');
                const slotNumber = parseInt(this.selectedSlot.name.replace(/\D/g, ''), 10);
                (sceneObject as Board).slotNumber = slotNumber;
                console.log('addChild slot (sceneObject as Board)');

                sceneObject.exchangeSlot(this.selectedSlot);
            }

            this.children.push(sceneObject);

            this.setSlotsVisible(false);
            this.placeholders = this.placeholders.filter(placeholder => placeholder !== this.selectedSlot);
            this.selectedSlot = null;
            this.childToAdd = null;
        } else {

            this.setSlotsVisible(true);
            this.childToAdd = sceneObject;
        }
    }

    public displayEmptySlots(): void {
        this.setSlotsVisible(true);
    }

    private async loadModelAndDisplay(onLoad?: (model: Object3D) => void): Promise<void> {
        try {
            const archUrl = `https://storage.googleapis.com/library-all-test/architectures/${this.type}.fbx`;
            const model = await this.loadModel(archUrl);
            const customModel = model as CustomObject3D;
            customModel.onPointerDown = () => this.handleSelected(customModel);
            customModel.interactive = true;
            this.model = customModel;

            await this.setPlaceholders();

            onLoad && onLoad(this.model);
        } catch (error) {
            console.error('Error loading model:', error);
            throw new Error('Failed to load architecture model');
        }
    }

    private async setPlaceholders(): Promise<void> {
        if (!this.model) return;

        try {
            const [groupA, groupB] = [
                this.model.children[0].children[0].children,
                this.model.children[0].children[1].children
            ];

            const slots = [...groupA, ...groupB].filter(child => child.name.startsWith('slot_'));
            const placeholder = await this.loadModel(this.placeholderPath);

            slots.forEach(slot => {
                const placeholderClone = placeholder.clone().children[0] as CustomObject3D;
                placeholderClone.onPointerDown = () => this.handleSelectSlot(placeholderClone);
                placeholderClone.interactive = true;
                slot.parent?.attach(placeholderClone);
                placeholderClone.position.copy(slot.position);
                placeholderClone.rotation.copy(slot.rotation);
                placeholderClone.name = slot.name;
                placeholderClone.visible = false;
                slot.parent?.remove(slot);
                this.placeholders.push(placeholderClone);

            });
        } catch (error) {
            console.error('Error setting placeholders:', error);
            throw new Error('Failed to set placeholders');
        }
    }

    protected handleSelectSlot = (object: CustomObject3D): ISceneObject => {
        // super.handleSelectSlot(object);
        this.selectedSlot = object;
        
        if (this.childToAdd) {
            console.log('Select slot');
            this.addChild(this.childToAdd);
        }
        return this;
    };

    //   protected handleSelected = (object: CustomObject3D): ISceneObject => {
    //     // Implement selection logic here
    //     return this;
    //   };
}