import { Mesh, Object3D } from 'three';
import { ISceneObjectOptions, ISceneObject, ProductBoard, ProductStand, FormatBoard, CustomObject3D, ContentDataType, ContentText } from '@/components/editor/types/index';
import { StandType } from "@/components/editor/types";
import { SceneObject } from '../SceneObject';
import { Product } from '@/components/dashboard/types/product.types';



export abstract class Stand extends SceneObject {
    // abstract maxStands: number;
    protected productData: Product;

    constructor(type: StandType,productData: Product, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
        this.productData = productData;

    }
    
    protected modelUrl = `${this.libraryUrl}/stands/${this.type}.fbx`;
    // protected getModelUrl(): string { return `https://storage.googleapis.com/library-all-test/stands/podium.fbx`; };
    protected getModelUrl(): string { return `${this.libraryUrl}/stands/${this.type}.fbx`};

    protected async loadModelAndDisplay(onLoad?: (model?: Object3D) => void): Promise<void> {
        try {
          const model = await this.loader.loadModel(this.getModelUrl());
    
          const customModel = model.children[0] as CustomObject3D;
    
          // customModel.onPointerDown = () => this.handleSelected(customModel);
          customModel.interactive = true;
          this.model = customModel;

          if (this.model && this.modelParent && this.position && this.rotation) {
            this.modelParent.attach(this.model);
            this.model.position.copy(this.position);
            this.model.rotation.copy(this.rotation);
          }
    
          this.position = model.position;
          this.rotation = model.rotation;
          this.initializeContentAreas();
          onLoad && onLoad(model);
        } catch (error) {
          console.error("Error loading board model:", error);
        }
      }
      
      // protected abstract initializeContentAreas(): void ;

      protected initializeContentAreas(): void {
        const {price, title, currencyType, SKU} = this.productData;
            // this.setContentText(ContentDataType.PRICE, {text: price.toString()})
            // this.setContentText(ContentDataType.TITLE, {text: title})
            // this.setContentText(ContentDataType.PRICE_CURRENCY, {text: currencyType || '$'})
            this.contentsData.set(ContentDataType.PRODUCT, {contentObjects:{SKU: SKU, model: '2'}})
    }

      // public setContentText(type: ContentDataType, text: ContentText): void {
      //   let geometryName = type;
      //   if (type === ContentDataType.PRICE) {
      //     geometryName = `${type}_text` as ContentDataType;
      //   }
    
      //   const geometry = this.getGeometryByName(geometryName);

      //   // this.contentsData.set(type, {
      //   //   contentText: text,
      //   // });
    
      //   if (geometry instanceof Mesh) {
      //     this.applyText(geometry, text);
      //   }
      // }


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