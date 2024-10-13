import { Command } from '../commands/Command';



export class CommandManager {

    private static instance: CommandManager;
    private commands: Command[] = [];
    private undoStack: Command[] = [];
    private redoStack: Command[] = [];

    public static getInstance(): CommandManager {
        if (!CommandManager.instance) {
            CommandManager.instance = new CommandManager();
        }
        return CommandManager.instance;
    }

    execute(command: Command) {
        command.execute();
        this.commands.push(command);
        this.undoStack.push(command);
    }

    undo() {
        if (this.undoStack.length === 0) return;
        const command = this.undoStack.pop();
        command?.undo();
        this.redoStack.push(command!);
    }


    redo() {
        if (this.redoStack.length > 0) {
            const command = this.redoStack.pop()!;
            command.execute();
            this.undoStack.push(command);
        }
    }
}
