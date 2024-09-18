import { ContentDataType, ContentForm, FormBoard, InputField, InputLabelType, ISceneObject, ISceneObjectOptions } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { Board } from '../Board';
import { Object3D } from 'three';


export abstract class FormBoardABC extends Board implements FormBoard {
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
    }
    // protected boardUrl = `${this.libraryUrl}/borads/${this.type}.fbx`;
    // protected getBoardUrl(): string {
    //     console.log(`Form Board URL: ${this.boardUrl}`, `${this.libraryUrl}/borads/${this.type}.fbx`);
    //     return `${this.libraryUrl}/borads/${this.type}.fbx`;
    // };

    protected async loadModelAndDisplay(onLoad?: (model?: Object3D) => void): Promise<void> {
        super.loadModelAndDisplay(onLoad);
    }

    public getContentForm(type: ContentDataType): ContentForm | null {
        return this.contentData.get(type)?.contentForm ?? null;
    }
    public getFormInput(type: ContentDataType, label: InputLabelType): InputField | null {
        return this.contentData.get(type)?.contentForm?.inputs?.get(label) ?? null;
    }

    public setFormInput(type: ContentDataType, label: InputLabelType, contentFormInput: InputField): void {
        console.log("HHHHH")
        const currentContentData = this.contentData.get(type);
        if (currentContentData) {
            this.contentData.set(type, {
                ...currentContentData,
                contentForm: {
                    inputs: currentContentData.contentForm?.inputs
                        ? { ...currentContentData.contentForm.inputs, [label]: contentFormInput }
                        : new Map([[label, contentFormInput]])
                }
            });
        }
    }
}