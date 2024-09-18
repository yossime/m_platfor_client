import { ContentDataType, ContentForm, FormBoard, InputField, InputLabelType, ISceneObject, ISceneObjectOptions } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { Board } from '../Board';


export abstract class FormBoardABC extends Board implements FormBoard{
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
    }
    setFormInput(type: ContentDataType, label: InputLabelType, contentFormInput: InputField): void {
        // throw new Error('Method not implemented.');
        console.log("hhhh")
    }
  
    setContentForm(type: ContentDataType, contentForn: ContentForm): void {
        throw new Error('Method not implemented.');
    }
    getContentForm(type: ContentDataType): ContentForm {
        throw new Error('Method not implemented.');
    }
    addChild?(sceneObject: ISceneObject): void {
        throw new Error('Method not implemented.');
    }
    removeChild?(sceneObject: ISceneObject): void {
        throw new Error('Method not implemented.');
    }
    getFormInput(type: ContentDataType, label: InputLabelType): InputField | null {
        return null;
    }
}