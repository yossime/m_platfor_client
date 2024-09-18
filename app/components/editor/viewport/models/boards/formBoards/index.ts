import { ContentDataType, ContentForm, FormBoard, InputField, InputLabelType, ISceneObject, ISceneObjectOptions } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { Board } from '../Board';
import { Object3D } from 'three';


export abstract class FormBoardABC extends Board implements FormBoard {
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
    }

    protected async loadModelAndDisplay(onLoad?: (model?: Object3D) => void): Promise<void> {
        super.loadModelAndDisplay(onLoad);
    }

    public getContentForm(type: ContentDataType): ContentForm | null {
        return this.contentsData.get(type)?.contentForm ?? null;
    }
    public getFormInput(type: ContentDataType, label: InputLabelType): InputField | null {
        return this.contentsData.get(type)?.contentForm?.inputs?.get(label) ?? null;
    }

    public setFormInput(type: ContentDataType, label: InputLabelType, contentFormInput: InputField): void {
        const currentContentData = this.contentsData.get(type);
        if(contentFormInput.placeholder) {
            const meshName = `placeholder_${label}`
            this.setContentText(meshName as ContentDataType, contentFormInput.placeholder);
        }

        if (currentContentData) {
            this.contentsData.set(type, {
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