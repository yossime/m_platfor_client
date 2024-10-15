import { Object3D } from 'three';
import { ISceneObjectOptions, ISceneObject, ProductBoard, ProductStand, FormatBoard, ContentDataType } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { Board } from '../Board';
import { Product } from '@/components/dashboard/types/product.types';
import { Stand } from '../../products';
import { SUB_TITLE, TITLE } from '@/constants/editor/boards/text.constants';

export abstract class ProductBoardABC extends Board implements ProductBoard {
    protected slotsMap: Map<number, Object3D> = new Map();
    protected abstract format: FormatBoard;
    abstract maxStands: number;

    constructor(type: BoardType, difFormat: string, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        const boardPath = `${type}/${difFormat}`;
        super(type, boardPath, options);
    }

    protected async loadModelAndDisplay(): Promise<void> {
        await super.loadModelAndDisplay();
        this.initializeContentAreas()
        this.slots = this.getSlotsPosition();
        this.slots.forEach(slot => this.slotsMap.set(parseInt(slot.name.replace(/\D/g, ''), 10), slot));
    }

    initializeContentAreas(): void {
        // this.contentsData.set(ContentDataType.TITLE, {});
        // this.contentsData.set(ContentDataType.SUB_TITLE, {});
        // this.contentsData.set(ContentDataType.FRAME, {});
        // this.contentsData.set(ContentDataType.BUTTON, {});

        this.initializeContentText(ContentDataType.TITLE, TITLE)
        this.initializeContentText(ContentDataType.SUB_TITLE, SUB_TITLE)
        // this.initializeContentText(ContentDataType.BUTTON, TITLE, `${ContentDataType.BUTTON}_text` as ContentDataType)
        // this.initializeContentFram()
    }

    public abstract removeStand(productStand: ProductStand): void;

    getStands(): ProductStand[] | null {
        return null;
    }
    public abstract addStand(product: Product): void;

    protected setMaxStands(maxStands: number): void {
        this.maxStands = maxStands;
    }

    protected boardUrl = `${this.libraryUrl}/borads/${this.type}`;
    protected getBoardUrl(): string { return `${this.boardUrl}/${this.format}.fbx`; };

    // public abstract addChild(sceneObject: ISceneObject): void;

    // protected async loadModelAndDisplay(onLoad?: (model?: Object3D) => void): Promise<void> {

    //     await super.loadModelAndDisplay(onLoad);

    //     this.slots = this.getSlotsPosition();
    // }




    public addChild(stand: Stand, slotNumber?: number): void {
        if (slotNumber !== undefined) {
            // console.log("adding child", this.slots)
            const slot = this.slots.find(slot => parseInt(slot.name.replace(/\D/g, ''), 10) === slotNumber);
            if (!slot) return;

            stand.exchangeSlot(slot);
            this.children.push(stand);

            // this.slots = this.slots.filter(placeholder => placeholder !== this.selectedSlot);
            // this.childToAdd = null;
        } else {
            // this.childToAdd = sceneObject;
        }
    }

}