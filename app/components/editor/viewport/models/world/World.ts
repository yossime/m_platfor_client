import { ArchitectureType, CustomObject3D, ISceneObjectOptions } from '@/components/editor/types';
import { Architecture } from '../architectures/Architecture';
import { SceneObject } from '../SceneObject';


export class World extends SceneObject   {

    public architecture: Architecture | null = null;

    constructor(type: ArchitectureType, options?: ISceneObjectOptions) {
        super("world","testWorld",options);
        this.architecture = new Architecture(type,options);

    }

    async loadModelAndDisplay(): Promise<void> {
      }
}


