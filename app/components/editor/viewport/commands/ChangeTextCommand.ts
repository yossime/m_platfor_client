import { Command } from './Command';
import { TextObject } from '../../function/curveText';
import { ContentDataType, TextParams } from '../../types';
import { SceneObject } from '../models/SceneObject';

export class ChangeTextCommand extends Command {
    constructor(
        private sceneObject : SceneObject,
        private contentDtype: ContentDataType,
        private textObject: TextObject,
        private newProperties: Partial<TextParams>,
        private oldProperties: TextParams,
    ) {
        super(
            () => {
                this.textObject.update(this.newProperties); 
                this.sceneObject.updateContentData(this.contentDtype, {contentText: {...this.oldProperties , ...this.newProperties}});
            },
            () => {
                this.textObject.update(this.oldProperties); 
                this.sceneObject.updateContentData(this.contentDtype, {contentText: {...this.oldProperties}});
            }
        );
    }
}