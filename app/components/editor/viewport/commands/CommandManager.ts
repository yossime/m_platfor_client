import { Command } from '../commands/Command';



export class CommandManager {

    private static instance: CommandManager;
    private commands: Command[] = [];
    private undoStack: Command[] = [];

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
        console.log("Command undo")

        if (this.undoStack.length === 0) return;
        const command = this.undoStack.pop();
        command?.undo();
    }


    redo() {
        // const command = this.undoStack.pop();
        // command?.undo();
        console.log("Command redo")
        // Implement redo logic if needed
    }
}
