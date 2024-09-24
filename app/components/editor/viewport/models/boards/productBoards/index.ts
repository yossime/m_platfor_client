import { Object3D } from 'three';
import { ISceneObjectOptions, ISceneObject, ProductBoard, ProductStand } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { Board } from '../Board';
import { Product } from '@/components/dashboard/types/product.types';

export abstract class ProductBoardABC extends Board implements ProductBoard {
    abstract maxStands: number;

    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
        this.loadModelAndDisplay(onBoardLoaded);
    }
    removeStand(productStand: ProductStand): void {
        throw new Error('Method not implemented.');
    }
    getStands(): ProductStand[] | null {
       return null;
    }
    addStand(product: Product): void {
       ;
    }
    
 
    protected boardUrl = `${this.libraryUrl}/borads/${this.type}`;
    protected getBoardUrl(): string { return `${this.boardUrl}/${this.format}.fbx`; };

    public abstract addChild(sceneObject: ISceneObject): void;
    
    // protected async loadModelAndDisplay(onLoad?: (model?: Object3D) => void): Promise<void> {

    //     await super.loadModelAndDisplay(onLoad);

    //     this.slots = this.getSlotsPosition();
    // }

    protected async loadModelAndDisplay(onLoad?: (model?: Object3D) => void): Promise<void> {
        if (!this.format) return;
        super.loadModelAndDisplay(onLoad);
    }

}