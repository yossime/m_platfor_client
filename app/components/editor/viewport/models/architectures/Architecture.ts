import { Object3D, Vector3, Euler } from 'three';
import { SceneObject } from '../SceneObject';
import { ISceneObjectOptions, ISceneObject, CustomObject3D, ExportedSceneObject, IArchitecture, IBoard } from '../../../types';
import { ArchitectureType } from "@/components/editor/types";
import { BoardType } from "@/components/editor/types";
import { Board } from '../boards/Board';
import { ProductMaster } from '../boards/productBoards/ProductMaster.board';
import { createBoardByType } from '@/components/editor/utils/CraeteBoard';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { AddChildCommand } from '../../commands/AddChildCommand';

export class Architecture extends SceneObject implements IArchitecture {
    private placeholderPath: string;
    private selectedSlot: CustomObject3D | null = null;
    private childToAdd: Board | null = null;

    constructor(type: ArchitectureType, options?: ISceneObjectOptions) {
        super(type, options);
        this.placeholderPath = `https://storage.googleapis.com/library-all-test/placeholders/${this.type}.fbx`;
    }
    public addBoard(board: Board): void {
        const command = new AddChildCommand(this, board);
        this.commandManager.execute(command);
    }

    public addChild(sceneObject: Board, slotNumber?: number): void {
        if (slotNumber) {
            const slot = this.slots.find(placeholder => parseInt(placeholder.name.replace(/\D/g, ''), 10) === slotNumber);
            this.selectedSlot = slot || null;
        }

        if (this.selectedSlot) {
            const slotNumber = parseInt(this.selectedSlot.name.replace(/\D/g, ''), 10);
            sceneObject.slotNumber = slotNumber;
            this.selectedSlot.isEmpty = false;
            sceneObject.exchangeSlot(this.selectedSlot);
            this.children.push(sceneObject);

            this.setSlotsVisible(false);
            // this.slots = this.slots.filter(placeholder => placeholder !== this.selectedSlot);
            this.selectedSlot = null;
            this.childToAdd = null;
        } else {

            this.displayEmptySlots();
            this.childToAdd = sceneObject;
        }
    }


    removeChild(sceneObject: ISceneObject): void {
        this.children.filter(child => child !== sceneObject);
        this.model?.children.filter(child => child !== sceneObject.getModel());
        // throw new Error('Method not implemented.');
      }



    async loadModelAndDisplay(onLoad?: (model: Object3D) => void): Promise<void> {

        const archUrl = `https://storage.googleapis.com/library-all-test/architectures/${this.type}.fbx`;
        try {

            const model = await this.loader.loadModel(archUrl);
            const customModel = model as CustomObject3D;
            // const customModel = model.children[0] as CustomObject3D;
            customModel.onPointerDown = () => this.handleSelected(customModel);
            customModel.interactive = true;
            this.model = customModel;
            console.log('customModel', customModel);

            await this.loadPlaceholders(this.placeholderPath, this.handleSelectSlot)

            onLoad && onLoad(this.model);
        } catch (error) {
            console.error('Error loading model:', error);
            throw new Error('Failed to load architecture model');
        }
    }


    protected handleSelectSlot = (slet: CustomObject3D): ISceneObject => {
        // super.handleSelectSlot(object);
        this.selectedSlot = slet;

        if (this.childToAdd) {
            this.addChild(this.childToAdd);
        }
        this.highlightMesh(slet);
        return this;
    };


    public buildFromJson(exportedObj: ExportedSceneObject) {
        super.buildFromJson(exportedObj);

        exportedObj.children?.forEach(childData => {
            const board = createBoardByType(childData.type as BoardType, { exportedScenObj: childData });
            this.addChild(board, childData.slotNumber);
        })
    }
}

