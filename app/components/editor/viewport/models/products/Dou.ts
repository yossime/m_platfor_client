// import { Object3D} from 'three';
// import { ISceneObjectOptions, ISceneObject, CustomObject3D, ProductType } from '../../../types';
// import { Product } from './Product';

// export class DouProduct extends Product {

//     constructor(type: ProductType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
//         super(type, options);
//         this.loadModelAndDisplay(onBoardLoaded);
//     }

//     public addChild(sceneObject: ISceneObject): void {
//     }

    
//     protected async loadModelAndDisplay(onLoad?: (model?: Object3D) => void): Promise<void> {
//         try {
//             const boardUrl = `https://storage.googleapis.com/library-all-test/products/${this.type}.fbx`;
//             const model = await this.loader.loadModel(boardUrl);

//             const customModel = model.children[0] as CustomObject3D;

//             customModel.onPointerDown = () => this.handleSelected(customModel);
//             customModel.interactive = true;
//             this.model = customModel;
            
//             if (this.model && this.modelParent && this.position && this.rotation) {
//                 this.modelParent.attach(this.model);
//                 this.model.position.copy(this.position);
//                 this.model.rotation.copy(this.rotation);
//             }

//             // this.initializeContentAreas();
//             onLoad && onLoad();

//         } catch (error) {
//             console.error('Error loading board model:', error);
//             throw new Error('Failed to load board model');
//         }
//     }
// }