import { ISceneObjectOptions, ISceneObject, ContentDataType, ContentText } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { Board } from '../Board';
import { Object3D } from 'three';
import { Text as TroikaText } from 'troika-three-text';
import { ChangeTextCommand } from '../../../commands/ChangeTextCommand';
import { TITLE } from '@/constants/editor/boards/text.constants';

export abstract class MasterBoardABC extends Board {
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
        // if(options?.exportedScenObj?.format) {
        //     this.setFormat(options?.exportedScenObj?.format);
        //   }
    }
    protected boardUrl = `${this.libraryUrl}/borads/${this.type}`;
    protected getBoardUrl(): string { return `${this.boardUrl}/${this.format}.fbx`; };

    protected async loadModelAndDisplay(onLoad?: (model?: Object3D) => void): Promise<void> {
        if (!this.format) return;
        await super.loadModelAndDisplay(onLoad);
        this.initializeContentAreas();
    }

    initializeContentAreas(): void {
        this.contentsData.set(ContentDataType.TITLE, {});
        this.contentsData.set(ContentDataType.SUB_TITLE, {});
        this.contentsData.set(ContentDataType.FRAME, {});
        this.contentsData.set(ContentDataType.BUTTON, {});

        this.initializeContentText(ContentDataType.TITLE, TITLE)
        this.initializeContentText(ContentDataType.SUB_TITLE, TITLE)
        this.initializeContentText(`${ContentDataType.BUTTON}_text` as ContentDataType, TITLE)
    }
}