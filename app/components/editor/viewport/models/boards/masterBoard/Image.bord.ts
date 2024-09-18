import { ISceneObjectOptions, ISceneObject } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { MasterBoardABC } from '.';


export class ImageBoard extends MasterBoardABC {
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
    }

}