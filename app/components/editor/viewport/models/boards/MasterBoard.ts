import { ISceneObjectOptions, ISceneObject } from '@/components/editor/viewport/types';
import { BoardType } from './types';
import { Board } from './Board';

export class MasterBoard extends Board {
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
    }

    public addChild(sceneObject: ISceneObject): void {
    }
}