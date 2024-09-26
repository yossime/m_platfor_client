import { Object3D } from 'three';
import { ISceneObjectOptions, ISceneObject, ProductBoard, ProductStand, FormatBoard } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { Board } from '../Board';
import { Product } from '@/components/dashboard/types/product.types';
import { Stand } from '../../products';

export abstract class ProductBoardABC extends Board implements ProductBoard {
    protected slotsMap: Map<number, Object3D> =new Map();
    // protected slotsMap: Map<string, Object3D> =new Map();

    abstract maxStands: number;

    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
        this.format = FormatBoard.Podium;
        this.loadModelAndDisplay(onBoardLoaded);
    }


    removeStand(productStand: ProductStand): void {
        throw new Error('Method not implemented.');
    }

    getStands(): ProductStand[] | null {
        return null;
    }
    public abstract addStand(product: Product): void;


    protected boardUrl = `${this.libraryUrl}/borads/${this.type}`;
    protected getBoardUrl(): string { return `${this.boardUrl}/${this.format}.fbx`; };

    // public abstract addChild(sceneObject: ISceneObject): void;

    // protected async loadModelAndDisplay(onLoad?: (model?: Object3D) => void): Promise<void> {

    //     await super.loadModelAndDisplay(onLoad);

    //     this.slots = this.getSlotsPosition();
    // }

    protected async loadModelAndDisplay(onLoad?: (model?: Object3D) => void): Promise<void> {
        console.log('Loading model',`${this.boardUrl}/${this.format}_2.fbx`);
        if (!this.format) return;
        await super.loadModelAndDisplay(onLoad);
        this.slots = this.getSlotsPosition();

        this.slots.forEach(slot => this.slotsMap.set(parseInt(slot.name.replace(/\D/g, ''), 10), slot));
        // this.slots.forEach(slot => this.slotsMap.set(slot.name, slot));

    }


    public addChild(stand: Stand, slotNumber?: number): void {
        if (slotNumber) {
            const slot = this.slots.find(slot => parseInt(slot.name.replace(/\D/g, ''), 10) === slotNumber);
            
            if (!slot) return;

            stand.exchangeSlot(slot);
            // this.children.push(stand);

            // this.slots = this.slots.filter(placeholder => placeholder !== this.selectedSlot);
            // this.childToAdd = null;
        } else {

            // this.childToAdd = sceneObject;
        }
    }

}