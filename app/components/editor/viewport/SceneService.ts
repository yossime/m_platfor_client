// import { Object3D } from 'three';
// import { ExportedSceneObject, ISceneObject } from '../types';
// import { ArchitectureType } from "../types";
// import { Architecture } from './models/architectures/Architecture';
// import { EventManager } from './utils/EventManager';


// export class SceneService {
//   public root: Architecture | null = null;

//   constructor() { 
//   }

//   async buildScene(type: ArchitectureType, onLoad: (model?: Object3D) => void, exportedScenObj?: ExportedSceneObject): Promise<void> {
//     try {
//       // this.root = new Architecture(type, {onLoad});
//       // const json = JSON.stringify(extractedObj, null, 2);
//       // const exportedScenObj = JSON.parse(json);

//       this.root = new Architecture(type, { exportedScenObj, onLoad });

//     } catch (error) {
//       console.error('Error building scene:', error);
//       throw new Error('Failed to build scene');
//     }
//   }

//   async exportToJson(): Promise<string | null> {
//     if(!this.root) return null;
//     const data = JSON.parse(this.root.exportToJson());
//     return JSON.stringify({
//       // hdri: null,
//       architecture: data
//     });
//   }

// }



import { Object3D } from 'three';
import { ExportedSceneObject, ISceneObject } from '../types';
import { ArchitectureType } from "../types";
import { World } from './models/world/World';
import { Board } from './models/boards/Board';


export class SceneService {
  setSelectedObject(newBoard: Board) {
    throw new Error("Method not implemented.");
  }
  public root: World | null = null;

  constructor() { 
  }

  async buildScene(type: ArchitectureType, onLoad: (model?: Object3D) => void, exportedScenObj?: ExportedSceneObject): Promise<void> {
    try {
      this.root = new World(type, { exportedScenObj, onLoad });

    } catch (error) {
      console.error('Error building scene:', error);
      throw new Error('Failed to build scene');
    }
  }

  async exportToJson(): Promise<string | null> {
    if(!this.root) return null;
    const data = JSON.parse(this.root.exportToJson());
    return JSON.stringify({
      // hdri: null,
      architecture: data
    });
  }

}
