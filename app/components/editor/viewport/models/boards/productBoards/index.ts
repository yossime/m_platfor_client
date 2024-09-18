import { Object3D } from 'three';
import { ISceneObjectOptions, ISceneObject, ProductBoard } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { Board } from '../Board';

export abstract class ProductBoardABC extends Board implements ProductBoard {
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
        this.loadModelAndDisplay(onBoardLoaded);
    }

    public abstract addChild(sceneObject: ISceneObject): void;
    
    protected async loadModelAndDisplay(onLoad?: (model?: Object3D) => void): Promise<void> {

        await super.loadModelAndDisplay(onLoad);

        this.slots = this.getSlotsPosition();
    }


    

}