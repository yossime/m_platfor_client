import { ArchitectureType, CustomObject3D, ISceneObjectOptions, LandscapeType } from '@/components/editor/types';
import { Architecture } from '../architectures/Architecture';
import { SceneObject } from '../SceneObject';
import { Group, Object3D } from 'three';
import { Landscape } from '../landscape/Landscape ';


export class World extends SceneObject   {

    public architecture: Architecture | null = null;
    public landscape: Landscape | null = null;


    constructor(type: ArchitectureType, options?: ISceneObjectOptions) {
        super("world","testWorld",options);
        this.architecture = new Architecture(type,{modelParent:this.model});
        this.landscape = new Landscape("DesertTerrain",{modelParent:this.model})

    }


    async loadModelAndDisplay(
      onLoad?: (model: Object3D) => void
    ): Promise<void> {
      try {
        const model = new Group(); 
    
        model?.traverse((child: CustomObject3D) => {
            child.onPointerDown = () => this.handleSelected(model);
            child.onPointerOver = () => this.handleHover();
            child.interactive = true;
            child.userData.draggable = false;
          });
    
        this.model = model;
    
        if (this.model && this.modelParent) {
          this.modelParent.attach(this.model);
        }
    
        if (this.model && this.position && this.rotation) {
          this.model.position.copy(this.position);
          this.model.rotation.copy(this.rotation);
        }

        onLoad && onLoad(this.model);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    }
    

    public async changeArchitecture(architecture: string) {
      if (this.model && this.architecture?.getModel()) {
          const model = this.architecture.getModel();
          if (model) {
              await this.removeModel(model);
          }
      }
    this.architecture =  new Architecture(architecture, { modelParent: this.model });
  }
  
  
  public async changeLandscape(landscape:string){
    if (this.model && this.landscape?.getModel() ) {
      const model= this.landscape.getModel()
      if (model) {
        await this.removeModel(model);
      }
    }
    this.landscape = new Landscape(landscape,{modelParent:this.model});
  }



    
  public async changeTest(){
    if (this.model && this.landscape?.getModel() ) {
      const model= this.landscape.getModel()
      if (model) {
        await this.removeModel(model);
      }
    }
    console.log(this.landscape?.getModel())
    this.landscape = null
  }


  private removeModel(model: any): Promise<void> {
      return new Promise((resolve) => {
        if(this.model)
          this.model.remove(model);
          resolve();
      });
  }
}


