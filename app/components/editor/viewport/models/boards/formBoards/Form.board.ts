import { ISceneObjectOptions } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { FormBoardABC } from '.';


export class FormBoard extends FormBoardABC {
    private boardUrl: string;
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        console.log("FormBoard")
        super(type, options);
        this.boardUrl = `${this.libraryUrl}/borads/${this.type}/${this.type}.fbx`;
    }

    protected getBoardUrl(): string {
        console.log(`Form Board URL: ${this.boardUrl}`, `${this.libraryUrl}/borads/${this.type}.fbx`);
        return `${this.libraryUrl}/borads/${this.type}/${this.type}.fbx`;
    };
}