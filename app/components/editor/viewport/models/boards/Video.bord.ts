import { ISceneObjectOptions, ISceneObject } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { Board } from './Board';

export class VideoBoard extends Board {
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
    }

    public addChild(sceneObject: ISceneObject): void {
    }
}