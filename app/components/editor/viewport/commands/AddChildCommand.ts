import { Command } from './Command';
import { SceneObject } from '../models/SceneObject';
import { Board } from '../models/boards/Board';
import { Architecture } from '../models/architectures/Architecture';

export class AddChildCommand extends Command {
    constructor(
        private sceneObject: Architecture,
        private board: Board,
    ) {
        super(
            () => {
                this.sceneObject.addChild(this.board, this.board.slotNumber);
            },
            () => {
                this.sceneObject.removeChild(this.board);
            }
        );
    }
}