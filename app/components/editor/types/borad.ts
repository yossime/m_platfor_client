import { EConfigType, EConfiguration, ISceneObject } from "../interface/models";

export interface IBoard extends ISceneObject {
    // addPoudiom: (name: string) => void;
    slotNumber: number;
    getConfiguration: () => Map<EConfigType, EConfiguration>;
    setConfiguration: (type: EConfigType, config: EConfiguration) => void;
}


export enum IBoardContentMaterialType {
    SALF = 'salf',
    IMAGE_0 = 'Image_0',
    IMAGE_1 = 'Image_1',
    BUTTON_0 = 'button_0',
    FORM = 'form',
}


export enum IBoardContentTextType {
    TITLE = 'title',
    SUB_TITLE = 'Sub_Title',
    BUTTON_0 = 'button_0',
}