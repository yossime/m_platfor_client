import { FormatBoard, ISceneObjectOptions } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { FormBoardABC } from '.';


export class FormBoard extends FormBoardABC {
    protected format: FormatBoard = FormatBoard.Duo;
    private boardUrl: string;
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
        this.boardUrl = `${this.libraryUrl}/borads/${this.type}/${this.type}.fbx`;
    }

    protected getBoardUrl(): string {
        return `${this.libraryUrl}/borads/${this.type}/${this.type}.fbx`;
    };
}