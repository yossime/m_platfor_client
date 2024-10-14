import { ISceneObjectOptions, ISceneObject, ContentDataType, ContentText, FormatBoard } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { Board } from '../Board';
import { Object3D } from 'three';
import { SUB_TITLE, TITLE } from '@/constants/editor/boards/text.constants';

export abstract class MasterBoardABC extends Board {
    constructor(type: BoardType, difFormat: FormatBoard, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        const boardPath = `${type}/${difFormat}`;
        super(type, boardPath, options);
        // if(options?.exportedScenObj?.format) {
        //     this.setFormat(options?.exportedScenObj?.format);
        //   }
    }
    protected boardUrl = `${this.libraryUrl}/borads/${this.type}`;
    protected getBoardUrl(): string { return `${this.boardUrl}/${this.format}.fbx`; };

    // protected async loadModelAndDisplay(onLoad?: (model?: Object3D) => void): Promise<void> {
    protected async loadModelAndDisplay(): Promise<void> {
        if (!this.format) return;
        await super.loadModelAndDisplay();
        this.initializeContentAreas();
    }

    initializeContentAreas(): void {
        this.contentsData.set(ContentDataType.TITLE, {});
        this.contentsData.set(ContentDataType.SUB_TITLE, {});
        this.contentsData.set(ContentDataType.FRAME, {});
        this.contentsData.set(ContentDataType.BUTTON, {});

        this.initializeContentText(ContentDataType.TITLE, TITLE)
        this.initializeContentText(ContentDataType.SUB_TITLE, SUB_TITLE)
        this.initializeContentText(ContentDataType.BUTTON, TITLE, `${ContentDataType.BUTTON}_text` as ContentDataType)
        this.initializeContentFram()
    }

}