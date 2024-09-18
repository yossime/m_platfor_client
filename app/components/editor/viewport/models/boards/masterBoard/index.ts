import { ISceneObjectOptions, ISceneObject } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { Board } from '../Board';
import { Object3D } from 'three';

export abstract class MasterBoardABC extends Board {
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
    }
    protected boardUrl = `${this.libraryUrl}/borads/${this.type}`;
    protected getBoardUrl(): string { return `${this.boardUrl}/${this.format}.fbx`; };

    protected async loadModelAndDisplay(onLoad?: (model?: Object3D) => void): Promise<void> {
        if (!this.format) return;
        super.loadModelAndDisplay(onLoad);
    }
}