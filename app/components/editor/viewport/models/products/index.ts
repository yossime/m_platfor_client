import { Mesh, Object3D } from 'three';
import { ISceneObjectOptions, ISceneObject, ProductBoard, ProductStand, FormatBoard, CustomObject3D, ContentDataType, ContentText } from '@/components/editor/types/index';
import { StandType } from "@/components/editor/types";
import { SceneObject } from '../SceneObject';



export abstract class Stand extends SceneObject {
    // abstract maxStands: number;

    constructor(type: StandType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
        // this.loadModelAndDisplay(onBoardLoaded);
    }
    
    protected modelUrl = `${this.libraryUrl}/stands/${this.type}`;
    protected getModelUrl(): string { return `https://storage.googleapis.com/library-all-test/stands/podium.fbx`; };

    protected async loadModelAndDisplay(onLoad?: (model?: Object3D) => void): Promise<void> {
        try {
          const model = await this.loader.loadModel(this.getModelUrl());
    
          const customModel = model.children[0] as CustomObject3D;
    
          customModel.onPointerDown = () => this.handleSelected(customModel);
          customModel.interactive = true;
          this.model = customModel;
          console.log("model!!!!!!!!!",this.type, this.position);
    
          if (this.model && this.modelParent && this.position && this.rotation) {
            this.modelParent.attach(this.model);
            this.model.position.copy(this.position);
            this.model.rotation.copy(this.rotation);
            console.log("model$$$$$$$$$$$", this.position);
          }
    
          // this.position = model.position;
          // this.rotation = model.rotation;
          // this.initializeContentAreas();
          onLoad && onLoad(model);
        } catch (error) {
          console.error("Error loading board model:", error);
        }
      }

      public setContentText(type: ContentDataType, text: ContentText): void {
        let geometryName = type;
        if (type === ContentDataType.PRICE) {
          geometryName = `${type}_text` as ContentDataType;
        }
    
        const geometry = this.getGeometryByName(geometryName);

    
        // this.contentsData.set(type, {
        //   contentText: text,
        // });
    
        if (geometry instanceof Mesh) {
          this.applyText(geometry, text);
        }
      }


      public exportToJson(): string {
        const exportObject = {
          ...JSON.parse(super.exportToJson()),
          // contentObjects: Object.fromEntries(this.contentObjects),
          // contentImages: Object.fromEntries(this.contentImages),
          contentsData: Object.fromEntries(this.contentsData),
        };
        return JSON.stringify(exportObject, null, 2);
      }
}