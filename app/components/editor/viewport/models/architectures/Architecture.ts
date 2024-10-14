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
import { AssetLoader } from '../../loaderes/AssetLoader';

export class Architecture extends SceneObject implements IArchitecture {
    private placeholderPath: string;
    private selectedSlot: CustomObject3D | null = null;
    private childToAdd: Board | null = null;
    // categoryType = 'architecture';
    constructor(type: ArchitectureType, options?: ISceneObjectOptions) {
        const architecturePath = `architectures/${type}`;

        super(type, architecturePath, options);
        this.placeholderPath = `https://storage.googleapis.com/library-all-test/placeholders/${this.type}.glb`;
    }

    async loadModelAndDisplay(onLoad?: (model: Object3D) => void): Promise<void> {
        await super.loadModelAndDisplay(onLoad);
        try {
           await this.loadPlaceholders(this.placeholderPath, this.handleSelectSlot)
        } catch (error) {
            console.error('Error loading model:', error);
            throw new Error('Failed to load architecture model');
        }
    }


    public addBoard(board: Board): void {
        if (this.selectedSlot) {
            const command = new AddChildCommand(this, board);
            this.commandManager.execute(command);
        } else {
            this.childToAdd = board;
        }
    }

    public addChild(sceneObject: Board, slotNumber?: number): void {
        if (slotNumber !== -1) {
            const slot = this.slots.find(placeholder => parseInt(placeholder.name.replace(/\D/g, ''), 10) === slotNumber);
            this.selectedSlot = slot || null;
        }
        if (this.selectedSlot) {
            const slotNumber = parseInt(this.selectedSlot.name.replace(/\D/g, ''), 10);
            sceneObject.slotNumber = slotNumber;
            this.selectedSlot.isEmpty = false;
            sceneObject.exchangeSlot(this.selectedSlot);
            this.children.push(sceneObject as SceneObject);

            this.setSlotsVisible(false);
            // this.slots = this.slots.filter(placeholder => placeholder !== this.selectedSlot);
            this.selectedSlot = null;
            this.childToAdd = null;
        } else {

            this.displayEmptySlots();
            this.childToAdd = sceneObject;
        }
    }


    removeChild(sceneObject: SceneObject): void {
        this.children = this.children.filter(child => child.id !== sceneObject.id);
        const slotName = sceneObject.getModel()!.name;
        const slot = this.getGeometryByName(slotName) as CustomObject3D;
        slot.isEmpty = true;
    }





    protected handleSelectSlot = (slet: CustomObject3D): ISceneObject => {
        // super.handleSelectSlot(object);
        this.selectedSlot = slet;

        if (this.childToAdd) {
            const command = new AddChildCommand(this, this.childToAdd);
            this.commandManager.execute(command);
            // this.addChild(this.childToAdd);
            return this.childToAdd;
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

