import { Object3D, Vector3, Euler } from 'three';
import { ArchitectureType, ISceneObject, BoardType, ProductType, ExportedSceneObject } from '../interface/types';
import { Architecture } from './models/architectures/Architecture';
import { Board } from './models/boards/Board';
import { SceneObject } from './models/SceneObject';
import { MasterBoard } from './models/boards/MasterBoard';
// import { Product } from '../interface/models/Product';

export class SceneService {
    public root: ISceneObject | null = null;
    private selectedObject: ISceneObject | null = null;
    private history: string[] = [];
    private historyIndex: number = -1;

    async buildScene(type: ArchitectureType, onLoad: (model?: Object3D) => void): Promise<void> {
        try {
            // this.root = new Architecture(type, onLoad);
            this.root = this.buildSceneObjectFromJson(JSON.stringify(extractedObj, null, 2), onLoad);
            // this.saveState();
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


    buildSceneObjectFromJson(json: string, onLoad?: (model?: Object3D) => void): SceneObject | null {
        function isArchitectureType(type: any): type is ArchitectureType {
            return Object.values(ArchitectureType).includes(type);
        }

        function isBoardType(type: any): type is BoardType {
            return Object.values(BoardType).includes(type);
        }

        function isProjectType(type: any): type is ProductType {
            return Object.values(ProductType).includes(type);
        }
        try {
            const data: ExportedSceneObject = JSON.parse(json);

            let sceneObject: SceneObject;


            const options = {
                name: data.name,
                position: data.position,
                rotation: data.rotation,
                children: data.children
            };

            if (isArchitectureType(data.type)) {
                sceneObject = new Architecture(data.type, onLoad, {onLoad, exportedScenObj: data});

                // if (data.children !== undefined) {
                //     data.children.forEach(childData => {
                //         // const childObject = this.buildSceneObjectFromJson(JSON.stringify(childData), onLoad);
                //         // sceneObject.buildFromJson(childData)

                //         console.log('childObject, childObject', childData);
                //         // if (childObject) {
                //         //     const slotName = `slot_${childData.slotNumber?.toString()}`
                //         //     console.log('data', childData);
                //         //     console.log('slotName', slotName);
                //         //     sceneObject.addChild(childObject, slotName);
                //         // }
                //     });
                // }
            // } else if (isBoardType(data.type)) {
                // sceneObject = new MasterBoard(data.type, options);
            } else if (isProjectType(data.type)) {
                // sceneObject = new Product(data.type, options);
                throw new Error(`Product type handling is not implemented: ${data.type}`);
            } else {
                throw new Error(`Unknown type: ${data.type}`);
            }

            // data.children.forEach(childData => {
            //     const childObject = this.buildSceneObjectFromJson(JSON.stringify(childData), onLoad);
            //     console.log('childObject, childObject', childObject);
            //     if (childObject) {
            //         const slotName = `slot_${childData.slotNumber?.toString()}`
            //         console.log('data', childData);
            //         console.log('slotName', slotName);
            //         sceneObject.addChild(childObject, slotName);
            //     }
            // });

            return sceneObject;
        } catch (error) {
            console.error('Error building scene object from JSON:', error);
            return null;
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
        try {
            const rootObject = this.buildSceneObjectFromJson(state);
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


const extractedObj = {
    "name": null,
    "type": "two_circles",
    "children": [
      {
        "name": null,
        "type": "MasterTextOn2",
        "children": [],
        "slotNumber": 9,
        "contentData": {
          "title": {
            "contentObjects": {
              "meshName": "ph_title_C_C"
            },
            "contentText": {
              "text": "sssssssssss"
            }
          },
          "sub_title": {
            "contentObjects": {
              "meshName": "ph_sub_title_C_C"
            },
            "contentText": {
              "text": "sssssssssssss"
            }
          },
          "button": {
            "contentMaterial": {
              "customMaterial": {
                "diffuse": {
                  "map": "https://storage.googleapis.com/users-assets-a/ftPorQH3UBcQwJMd0hRmQvdX7Ed2/bar1_R.jpeg"
                }
              }
            },
            "contentObjects": {
              "contentName": "ph_button_T_C",
              "position": {
                "x": 0.017621422186493874,
                "y": 0.9501876831054688,
                "z": -0.5074840188026428
              },
              "rotation": {
                "isEuler": true,
                "_x": 3.576279329505257e-7,
                "_y": 1.537323566761474e-13,
                "_z": 1.570197105407715,
                "_order": "XYZ"
              }
            }
          },
          "button_text": {
            "contentObjects": {
              "meshName": "ph_button_text_C_C"
            },
            "contentText": {
              "text": "ssssssssssssssssss"
            }
          }
        }
      },
      {
        "name": null,
        "type": "MasterTextOn",
        "children": [],
        "slotNumber": 8,
        "contentData": {}
      },
      {
        "name": "Header",
        "type": "MasterTextOn2",
        "children": [],
        "slotNumber": 3,
        "contentData": {
          "title": {
            "contentObjects": {
              "meshName": "ph_title_C_C"
            },
            "contentText": {
              "text": "sssssssssssssss"
            }
          },
          "sub_title": {
            "contentObjects": {
              "meshName": "ph_sub_title_C_C"
            },
            "contentText": {
              "text": "ssssssssssssssss"
            }
          },
          "button_text": {
            "contentObjects": {
              "meshName": "ph_button_text_C_C"
            },
            "contentText": {
              "text": "ssssssssssssssssssssssssss"
            }
          },
          "button": {
            "contentMaterial": {
              "customMaterial": {
                "diffuse": {
                  "map": "https://storage.googleapis.com/users-assets-a/ftPorQH3UBcQwJMd0hRmQvdX7Ed2/Bar10_L.jpeg"
                }
              }
            }
          }
        }
      },
      {
        "name": "Header",
        "type": "MasterTextOn2",
        "children": [],
        "slotNumber": 1,
        "contentData": {}
      }
    ]
  }