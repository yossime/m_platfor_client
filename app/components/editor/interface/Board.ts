// import { Color, Material, Mesh, MeshStandardMaterial, Object3D, Vector3 } from "three";
// import { BoardType, CustomObject3D, ExportedSceneObject, EConfiguration, IContentMaterialType, IContentTextType, ISceneObject, ISceneObjectOptions, SceneObject, EConfigType, ICustomMaterial, IContentMaterial, EContentImagesType } from "./models";
// import { IBoard } from "../types/borad";






// export class Board extends SceneObject implements IBoard {
//     public slotNumber = -1;
//     private configuration = new Map<EConfigType, EConfiguration>([
//         [EConfigType.HORIZONTAL, EConfiguration.CENTER],
//         [EConfigType.VERTICAL, EConfiguration.CENTER],
//     ]);
//     constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
//         super(type, options);
//         this.loadModelAndDisplay(onBoardLoaded);
//     }


//     getConfiguration() { return this.configuration };

//     setConfiguration(type: EConfigType, config: EConfiguration) {
//         this.configuration.set(type, config);

//         this.contentMaterial.forEach((material, contentType) => {
//             const placeholder = this.getPlaceholder(contentType);
//             const geometry = this.getGeometryByName(contentType);
//             if (geometry && placeholder) {
//                 console.log("placeholder.position", placeholder.position)
//                 console.log("gem.geometry", geometry.position)
//                 geometry.position.copy(placeholder.position);
//                 geometry.rotation.copy(placeholder.rotation);

//                 const oldMaterial = this.getContentMaterial(contentType);

//                 const updatedMaterial = {
//                     ...oldMaterial,
//                     contentName: placeholder.name,
//                     position: placeholder.position,
//                     rotation: placeholder.rotation
//                 }
//                 this.setContentMaterial(contentType, updatedMaterial);
//             }
//         });

//         this.contentImages.forEach(async (material, contentType) => {
//             // console.log(`Processing material type: ${contentType}`, material);

//             const geometry = this.getGeometryByName(contentType);
//             const placeholder = this.getPlaceholder(contentType);

//             if (geometry && placeholder) {
//                 placeholder.visible = true;
//                 placeholder.parent?.children.forEach(child => {
//                     if (child.name !== placeholder.name) {
//                         child.visible = false;
//                         return;
//                     }
//                 })
//                 const testMaterial: IContentMaterial = {
//                     customMaterial: {
//                         tint: {
//                             color: 'green',
//                         },
//                         // diffuse: {
//                         //     url: `https://storage.googleapis.com/library-materials-test-all/iron.jpg`
//                         // }
//                     }
//                 }
//                 const oldMaterial = this.getContentImage(contentType);
//                 if (oldMaterial?.customMaterial) {
//                 console.log("gem.oldMaterial", oldMaterial)

//                     await this.ChangeMaterial(placeholder, oldMaterial.customMaterial);
//                     const updatedMaterial = {
//                         ...oldMaterial,
//                         contentName: placeholder.name,
//                         position: placeholder.position,
//                         rotation: placeholder.rotation
//                     }
//                 this.contentImages.set(contentType, updatedMaterial);

//                 }
//             }
//         });
//     }

//     getPlaceholder(type: IContentMaterialType | EContentImagesType | IContentTextType) {
//         const configV = this.configuration.get(EConfigType.VERTICAL);
//         const configH = this.configuration.get(EConfigType.HORIZONTAL);
//         const placeholderName = `ph_${type}_${configV?.charAt(0)}_${configH?.charAt(0)}`;
//         const placeholder = this.getGeometryByName(placeholderName);
//         return placeholder;
//     }

//     async setContentImage(type: EContentImagesType, material: IContentMaterial): Promise<void> {
//         const configV = this.configuration.get(EConfigType.VERTICAL);
//         const configH = this.configuration.get(EConfigType.HORIZONTAL);
//         const configImageName = `${type}_${configV?.charAt(0)}_${configH?.charAt(0)}`;
//         const geometry = this.getGeometryByName(configImageName);
//         console.log("configImageName", configImageName)
//         const testMaterial: IContentMaterial = {
//             customMaterial: {
//                 // tint: {
//                 //     color: 'green',
//                 // },
//                 diffuse: {
//                     url: `https://storage.googleapis.com/library-materials-test-all/iron.jpg`
//                 }
//             }
//         }

//         if (geometry instanceof Mesh) {
//             console.log('material.customMaterial')

//             await this.ChangeMaterial(geometry, material.customMaterial!);

//         }

//         this.contentImages.set(type, material);

//     }

//     async setContentMaterial(type: IContentMaterialType, contentMaterial: IContentMaterial) {

//         if (type === IContentMaterialType.IMAGE) {
//             this.setContentImage(EContentImagesType.IMAGE, contentMaterial);
//             return;
//         }
//         const geometry = this.getGeometryByName(type);

//         const renderLibrary = `https://storage.cloud.google.com/library-materials-test-all`
//         let material;
//         if (geometry) {
//             if (contentMaterial.render) {
//                 const renderMaterial: ICustomMaterial = {
//                     tint: {
//                         color: 'blue'
//                     },
//                     diffuse: {
//                         url: `${renderLibrary}/${contentMaterial.render}`
//                         // map: `https://storage.cloud.google.com/library-materials-test-all/stone.jpg?authuser=0`
//                     }
//                 }
//                 material = renderMaterial;
//             }
//             if (contentMaterial.customMaterial) {
//                 material = contentMaterial.customMaterial
//             }
//             if (material) {
//                 // const v = new Vector3(-8.448, 26.274, 10.00)
//                 await this.ChangeMaterial(geometry, material);
//                 this.contentMaterial.set(type, contentMaterial);
//                 return true;
//             }
//         }
//     };

//     async loadModelAndDisplay(onLoad?: () => void) {
//         // const boardUrl = `https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/boards%2F${this.type}.fbx?alt=media`;
//         const boardUrl = `https://storage.googleapis.com/library-all-test/borads/${this.type}.fbx`;
//         // const boardUrl = `https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/prodects%2FProd.fbx?alt=media&token=08240ada-8a7a-4e07-baf0-3afbe05a429c`;

//         const model = await this.loadModel(boardUrl);

//         const custommodel = model.children[0] as CustomObject3D;

//         custommodel.onPointerDown = () => this.handleSelected(custommodel);
//         custommodel.interactive = true;
//         this.model = custommodel;


//         await this.setPlaceholders();

//         if (this.modelParent && this.position && this.rotation) {
//             this.modelParent?.attach(this.model);
//             this.model.position.copy(this.position);
//             this.model.rotation.copy(this.rotation);
//         }

//         this.model.traverse(content => {
//             // if (content instanceof Mesh && content.name.startsWith('ph_image')) {

//             //     const highlightMaterial = new MeshStandardMaterial({
//             //         color: new Color(0xff0000),
//             //     });

//             //     content.material = highlightMaterial;
//             // }

//             if (content instanceof Mesh && !content.name.startsWith('ph')) {
//                 const typeName = content.name.split('_')[0];

//                 // const contentMaterial: IContentMaterial = {
//                 //     customMaterial: {
//                 //         diffuse: {
//                 //             url: `https://storage.googleapis.com/library-materials-test-all/iron.jpg`
//                 //         }
//                 //     },
//                 //     contentName: content.name,
//                 //     position: content.position,
//                 //     rotation: content.rotation
//                 // }

//                 const imageContentMaterial: IContentMaterial = {
//                     customMaterial: {
//                         // tint: {
//                         //     color: 'red',
//                         // },
//                         diffuse: {
//                             url: `https://storage.googleapis.com/library-materials-test-all/stone.jpg`
//                         }
//                     },
//                     contentName: content.name,
//                     position: content.position,
//                     rotation: content.rotation
//                 }

//                 let type;
//                 switch (typeName) {
//                     case 'button':
//                         type = IContentMaterialType.BUTTON;
//                         this.setContentMaterial(type, imageContentMaterial)
//                         break;
//                     case 'image':
//                         console.log('case image');
//                         type = EContentImagesType.IMAGE;
//                         // this.setContentImage(type, {})
//                         this.setContentImage(type, imageContentMaterial)
//                         break;
//                     case 'self':
//                         type = IContentMaterialType.SELF;
//                         this.setContentMaterial(type, imageContentMaterial)
//                         break;
//                     default:
//                         break;
//                 }

//                 // const slotNumber = parseInt(content.name.replace('Slot_', ''));
//                 // content.slotNumber = slotNumber;
//                 // this.slotNumber = Math.max(this.slotNumber, slotNumber);
//             }
//         })

//         onLoad && onLoad();
//     }


//     // public async addContentData(data: IContentData): Promise<boolean> {
//     //     const geometry = this.getGeometryByName(data.type);
//     //     if (geometry) {
//     //         await this.ChangeMaterial(geometry, data.texture)
//     //         return true;
//     //     }
//     //     return false;
//     // }



//     displayEmptySlots() {

//     }



//     async setPlaceholders(): Promise<void> {
//         try {
//             if (!this.model) return;

//             const slots = this.model.children[0].children.filter(child => child.name.startsWith('Slot_'));

//             // const placeholderPath = `fbx-bucket/boards/${this.type}_slot_placeholder.glb`;
//             const placeholderPath = `https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/boards%2Fplaceholder.fbx?alt=media&token=fc38725e-1a24-49e4-9d78-2282cc112387`;
//             const placeholder = await this.loadModel(placeholderPath);


//             slots.forEach(slot => {
//                 const placeholderClone = placeholder.clone().children[0] as CustomObject3D;

//                 placeholderClone.onPointerDown = (event) => this.handleSelectSlot(placeholderClone);
//                 // placeholderClone.onPointerDown = () => this.handleSelectSlot(placeholderClone);
//                 placeholderClone.interactive = true;
//                 slot.parent?.attach(placeholderClone);
//                 placeholderClone.position.copy(slot.position);
//                 placeholderClone.rotation.copy(slot.rotation);
//                 placeholderClone.visible = false;
//                 slot.parent?.remove(slot);
//                 this.placeholders.push(placeholderClone);
//             });

//         } catch (error) {
//             console.error("Error loading or setting placeholders:", error);
//         }

//     }




//     removeChild(sceneObject: SceneObject): void {
//         const index = this.children.indexOf(sceneObject);
//         if (index > -1) {
//             this.children.splice(index, 1);
//             // sceneObject.selectedChild = null;
//         }
//     }

//     exportToJson(): string {
//         const exportObject: ExportedSceneObject = {
//             name: this.name ?? null,
//             type: this.type,
//             slotNumber: this.slotNumber,
//             position: this.position ? {
//                 x: this.position.x,
//                 y: this.position.y,
//                 z: this.position.z
//             } : null,
//             rotation: this.rotation ? {
//                 x: this.rotation.x,
//                 y: this.rotation.y,
//                 z: this.rotation.z
//             } : null,
//             // scale: this.scale ?? { x: 1, y: 1, z: 1 },
//             children: this.children.map(child => JSON.parse(child.exportToJson())) ?? [],
//             contentMaterial: {},
//             contentText: {}
//         };


//         Array.from(this.contentMaterial.keys()).forEach((type: IContentMaterialType) => {
//             const material = this.contentMaterial.get(type);
//             console.log("material content", type, material);
//             exportObject.contentMaterial[type as IContentMaterialType] = material;
//         })

//         Array.from(this.contentImages.keys()).forEach((type: EContentImagesType) => {
//             const material = this.contentImages.get(type);
//             console.log("contentImages", type, material);
//             exportObject.contentMaterial[type as EContentImagesType] = material;
//         })

//         Array.from(this.contentText.keys()).forEach((type: IContentTextType) => {
//             const text = this.contentText.get(type);
//             console.log("text content", type, text);
//             exportObject.contentText[type as IContentTextType] = text;
//         })
//         return JSON.stringify(exportObject, null, 2);
//     }
// }



export {}