import { Object3D, Vector3, Euler } from 'three';
import { SceneObject } from '../SceneObject';
import { ISceneObjectOptions, ISceneObject, CustomObject3D, ExportedSceneObject } from '../../types';
import { ArchitectureType } from './types';
import { BoardType } from '../boards/types';
import { Board } from '../boards/Board';
import { MasterBoard } from '../boards/MasterBoard';
import { ProductDouBoard } from '../boards/productBoards/ProductDouBoard';

export class Architecture extends SceneObject {
    private placeholderPath: string;
    private selectedSlot: CustomObject3D | null = null;
    private childToAdd: Board | null = null;

    constructor(type: ArchitectureType, options?: ISceneObjectOptions) {
        super(type, options);
        this.placeholderPath = `https://storage.googleapis.com/library-all-test/placeholders/${this.type}.fbx`;
    }


    public addChild(sceneObject: Board, slotNumber?: number): void {
        if (slotNumber) {
            const slot = this.slots.find(placeholder => parseInt(placeholder.name.replace(/\D/g, ''), 10) === slotNumber);
            this.selectedSlot = slot || null;
        }

        if (this.selectedSlot) {
            const slotNumber = parseInt(this.selectedSlot.name.replace(/\D/g, ''), 10);
            sceneObject.slotNumber = slotNumber;
            sceneObject.exchangeSlot(this.selectedSlot);
            this.children.push(sceneObject);

            this.setSlotsVisible(false);
            this.slots = this.slots.filter(placeholder => placeholder !== this.selectedSlot);
            this.selectedSlot = null;
            this.childToAdd = null;
        } else {

            this.setSlotsVisible(true);
            this.childToAdd = sceneObject;
        }
    }




    async loadModelAndDisplay(onLoad?: (model: Object3D) => void): Promise<void> {
        try {
            const archUrl = `https://storage.googleapis.com/library-all-test/architectures/${this.type}.fbx`;
            const model = await this.loader.loadModel(archUrl);
            const customModel = model as CustomObject3D;
            customModel.onPointerDown = () => this.handleSelected(customModel);
            customModel.interactive = true;
            this.model = customModel;

            await this.loadPlaceholders(this.placeholderPath, this.handleSelectSlot)

            onLoad && onLoad(this.model);
        } catch (error) {
            console.error('Error loading model:', error);
            throw new Error('Failed to load architecture model');
        }
    }


    protected handleSelectSlot = (object: CustomObject3D): ISceneObject => {
        // super.handleSelectSlot(object);
        this.selectedSlot = object;

        if (this.childToAdd) {
            this.addChild(this.childToAdd);
        }
        this.highlightMesh(object);
        return this;
    };


    public buildFromJson(exportedObj: ExportedSceneObject) {
        super.buildFromJson(exportedObj);

        exportedObj.children.forEach(childData => {
            let board;

            switch (childData.type as BoardType) {
                case BoardType.Product:
                    board = new ProductDouBoard(childData.type as BoardType, { exportedScenObj: childData });
                    break;
                case BoardType.Header:
                    board = new MasterBoard(childData.type as BoardType, { exportedScenObj: childData });
                    break;
                // case BoardType.DisplayDuo:
                //     board = new ProductDouBoard(childData.type as BoardType, { exportedScenObj: childData });
                //     break;
                // case BoardType.DisplayDuo:
                //     board = new ProductDouBoard(childData.type as BoardType, { exportedScenObj: childData });
                //     break;
                default:
                    break;
            }
            if (board) {
                this.addChild(board, childData.slotNumber);
            }
        })
    }
}

