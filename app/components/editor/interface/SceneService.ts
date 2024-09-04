import { Object3D, Vector3, Euler } from 'three';
import { ArchitectureType, ISceneObject, BoardType, ProductType } from '../interface/types';
import { Architecture } from '../interface/models/Architecture';
import { Board } from '../interface/models/Board';
// import { Product } from '../interface/models/Product';

export class SceneService {
    public root: ISceneObject | null = null;
    private selectedObject: ISceneObject | null = null;
    private history: string[] = [];
    private historyIndex: number = -1;

    async buildScene(type: ArchitectureType, onLoad: (model: Object3D) => void): Promise<void> {
        try {
            this.root = new Architecture(type, onLoad);
            this.saveState();
        } catch (error) {
            console.error('Error building scene:', error);
            throw new Error('Failed to build scene');
        }
    }

    public getEmptySlots() {
        console.log('Entering empty slots', this.root?.getEmptySlots());
        if (!this.root) return;
        return this.root.getEmptySlots();
    }
    setSelectedObject(selected: ISceneObject | null): void {
        this.selectedObject = selected;
        // this.root?.setSelectedObject(selected);
    }

    getSelectedObject(): ISceneObject | null {
        // return this.root?.g;
        return this.selectedObject;
    }

    async exportToJson(): Promise<string | null> {
        return this.root ? this.root.exportToJson() : null;
    }

    addObject(type: BoardType | ProductType, parentObject: ISceneObject | null = null): void {
        let newObject: ISceneObject;

        switch (true) {
            case Object.values(BoardType).includes(type as BoardType):
                newObject = new Board(type as BoardType);
                break;
            //   case Object.values(ProductType).includes(type as ProductType):
            //     newObject = new Product(type as ProductType);
            //     break;
            default:
                throw new Error(`Unknown object type: ${type}`);
        }

        if (parentObject) {
            parentObject.addChild(newObject);
        } else if (this.root) {
            this.root.addChild(newObject);
        } else {
            throw new Error('No root object to add to');
        }

        this.saveState();
    }

    removeObject(object: ISceneObject): void {
        if (!this.root) return;

        const removeRecursive = (parent: ISceneObject, target: ISceneObject): boolean => {
            const index = parent.children.indexOf(target);
            if (index !== -1) {
                parent.children.splice(index, 1);
                return true;
            }
            for (const child of parent.children) {
                if (removeRecursive(child, target)) {
                    return true;
                }
            }
            return false;
        };

        removeRecursive(this.root, object);
        this.saveState();
    }

    moveObject(object: ISceneObject, newPosition: Vector3): void {
        if (object.getModel()) {
            object.getModel()!.position.copy(newPosition);
            this.saveState();
        }
    }

    rotateObject(object: ISceneObject, newRotation: Euler): void {
        if (object.getModel()) {
            object.getModel()!.rotation.copy(newRotation);
            this.saveState();
        }
    }

    private saveState(): void {
        if (this.root) {
            const state = this.root.exportToJson();
            this.history = this.history.slice(0, this.historyIndex + 1);
            this.history.push(state);
            this.historyIndex++;
        }
    }

    undo(): void {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.loadState(this.history[this.historyIndex]);
        }
    }

    redo(): void {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.loadState(this.history[this.historyIndex]);
        }
    }

    private loadState(state: string): void {
        // Implement logic to recreate the scene from the JSON state
        // This would involve parsing the JSON and recreating all objects
    }

    // Method to handle complex scene manipulations
    async performComplexOperation(operation: () => Promise<void>): Promise<void> {
        try {
            await operation();
            this.saveState();
        } catch (error) {
            console.error('Error performing complex operation:', error);
            throw new Error('Failed to perform operation');
        }
    }

    // Method to optimize scene for rendering
    optimizeScene(): void {
        if (!this.root) return;

        const optimizeRecursive = (object: ISceneObject) => {
            // Implement optimization logic here
            // For example, merging geometries, using instancing for repeated objects, etc.
            object.children.forEach(optimizeRecursive);
        };

        optimizeRecursive(this.root);
    }
}