import { FormatBoard, ISceneObjectOptions } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { FormBoardABC } from '.';


export class SubscriptionBoard extends FormBoardABC {
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
    }

    protected getBoardUrl(): string {
        return `${this.libraryUrl}/borads/${this.type}/${this.type}.fbx`;
    };
}