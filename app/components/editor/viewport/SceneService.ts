import { Object3D } from 'three';
import { ExportedSceneObject, ISceneObject } from './types';
import { ArchitectureType } from './models/architectures/types';
import { Architecture } from './models/architectures/Architecture';


export class SceneService {
  public root: ISceneObject | null = null;
  private selectedObject: ISceneObject | null = null;
  private history: string[] = [];
  private historyIndex: number = -1;

  async buildScene(type: ArchitectureType, onLoad: (model?: Object3D) => void, exportedScenObj?: ExportedSceneObject): Promise<void> {
    try {
      // this.root = new Architecture(type, {onLoad});
      // const json = JSON.stringify(extractedObj, null, 2);
      // const exportedScenObj = JSON.parse(json);

      this.root = new Architecture(type, { exportedScenObj, onLoad });

    } catch (error) {
      console.error('Error building scene:', error);
      throw new Error('Failed to build scene');
    }
  }

  setSelectedObject(selected: ISceneObject | null): void {
    this.selectedObject = selected;
  }

  getSelectedObject(): ISceneObject | null {
    return this.selectedObject;
  }

  async exportToJson(): Promise<string | null> {
    return this.root ? this.root.exportToJson() : null;
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
    try {
      const exportedScenObj = JSON.parse(state);

      const rootObject = new Architecture(ArchitectureType.TWO_CIRCLES, { exportedScenObj });
      if (rootObject) {
        this.root = rootObject;
      } else {
        throw new Error('Failed to load state: Invalid scene object');
      }
    } catch (error) {
      console.error('Error loading state:', error);
    }
  }

}
