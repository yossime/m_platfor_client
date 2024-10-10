import { Command } from './Command';
import { TextObject } from '../../function/curveText';
import { TextParams } from '../../types';

export class ChangeTextCommand extends Command {
    constructor(
        private textObject: TextObject,
        private newProperties: Partial<TextParams>,
        private oldProperties: TextParams,
    ) {
        super(
            () => {
                this.textObject.update(this.newProperties); 
            },
            () => {
                this.textObject.update(this.oldProperties); 
            }
        );
    }
}