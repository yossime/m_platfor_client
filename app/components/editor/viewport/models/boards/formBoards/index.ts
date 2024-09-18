import { ContentDataType, ContentForn, FormBoard, ISceneObject, ISceneObjectOptions } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { Board } from '../Board';


export abstract class FormBoardABC extends Board implements FormBoard{
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
    }
    setContentForn(type: ContentDataType, contentForn: ContentForn): void {
        throw new Error('Method not implemented.');
    }
    getContentForn(type: ContentDataType): ContentForn {
        throw new Error('Method not implemented.');
    }
    addChild?(sceneObject: ISceneObject): void {
        throw new Error('Method not implemented.');
    }
    removeChild?(sceneObject: ISceneObject): void {
        throw new Error('Method not implemented.');
    }
}