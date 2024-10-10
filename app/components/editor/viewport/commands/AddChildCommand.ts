import { Command } from './Command';
import { SceneObject } from '../models/SceneObject';

export class AddChildCommand extends Command {
    constructor(
        private sceneObject: SceneObject,
        private childObject: SceneObject,
    ) {
        super(
            () => {
                this.sceneObject.addChild(this.childObject);
            },
            () => {
                this.sceneObject.removeChild(this.childObject);
            }
        );
    }
}