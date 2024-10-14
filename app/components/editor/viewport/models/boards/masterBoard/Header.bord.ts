import { ISceneObjectOptions, ISceneObject, ContentDataType, FormatBoard } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { MasterBoardABC } from '.';

export class HeaderBoard extends MasterBoardABC {
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, '' as FormatBoard, options);
    }

    initializeContentAreas(): void {
        this.contentsData.set(ContentDataType.LOGO, {});
        super.initializeContentAreas();
    }

    // initializeContentAreas(): void {
    //     console.log('initializing content')
    //     this.contentsData.set(ContentDataType.TITLE, {});
    //     this.contentsData.set(ContentDataType.SUB_TITLE, {});
    //     this.contentsData.set(ContentDataType.FRAME, {});
    //     this.contentsData.set(ContentDataType.BUTTON, {});
    // }
}