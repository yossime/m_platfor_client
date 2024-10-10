



export class Command {
    constructor(private executeFn: () => void, private undoFn: () => void) {}

    execute() {
        this.executeFn();
    }

    undo() {
        this.undoFn();
    }
}
