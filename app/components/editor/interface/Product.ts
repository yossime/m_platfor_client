// import { Material, Mesh, Object3D } from "three";
// import { CustomObject3D, ISceneObject, ISceneObjectOptions, ProductType, SceneObject } from "./models";




  

// export interface IProduct extends ISceneObject {
//     addPoudiom: (name: string) => void;
// }


// export class Product extends SceneObject implements IProduct {
//     constructor(type: ProductType, options?: ISceneObjectOptions) {
//         super(type, options);
//         this.loadModelAndDisplay();
//     }



//     async loadModelAndDisplay(onLoad?: () => void) {
//         const productUrl = `https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/Podium.fbx?alt=media&token=36ec521e-6930-44ef-b8f0-d23a5a24756d`;
//         // const filePath = `fbx-bucket/displays/${this.type}`;

//         const model = await this.loadModel(productUrl);
//         const custommodel = model.children[0] as CustomObject3D;
//         custommodel.onPointerDown = () => this.handleSelected(custommodel);
//         custommodel.interactive = true;
//         this.model = custommodel;
//         onLoad && onLoad();
//     }





//     displayEmptySlots() {

//     }

//     addPoudiom = (name: string) => {

//     };




//     // removeChild(sceneObject: SceneObject): void {
//     //     const index = this.children.indexOf(sceneObject);
//     //     if (index > -1) {
//     //         this.children.splice(index, 1);
//     //         sceneObject.selectedChild = null;
//     //     }
//     // }
// }



export {}
