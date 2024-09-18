import { Vector3, Mesh, Object3D } from "three";
import {
  ISceneObjectOptions,
  ISceneObject,
  CustomObject3D,
  IContentMaterial,
  IContentText,
  EConfigType,
  EConfiguration,
  ContentDataType,
  EContentImagesType,
  ExportedSceneObject,
  ProductType,
  FormatBoard,
} from "@/components/editor/types/index";
import { BoardType } from "@/components/editor/types";
import { SceneObject } from "../SceneObject";
import { DouProduct } from "../products/DouProduct";

export abstract class Board extends SceneObject {
  private format: FormatBoard | null = null;
  public slotNumber = -1;
  protected selectedSlot: CustomObject3D | null = null;
  protected configuration = new Map<EConfigType, EConfiguration>([
    [EConfigType.HORIZONTAL, EConfiguration.CENTER],
    [EConfigType.VERTICAL, EConfiguration.CENTER],
  ]);
  protected logoConfiguration = new Map<EConfigType, EConfiguration>([
    [EConfigType.HORIZONTAL, EConfiguration.CENTER],
    [EConfigType.VERTICAL, EConfiguration.CENTER],
  ]);

  constructor(
    type: BoardType,
    options?: ISceneObjectOptions,
    onBoardLoaded?: () => void
  ) {
    super(type, options);
  }


  public getConfiguration(): Map<EConfigType, EConfiguration> | null { return this.configuration };

  public getFormat(): FormatBoard | null { return this.format };

  public getLogoConfiguration(): Map<EConfigType, EConfiguration> | null { return null };

  public setLogoConfiguration(
    type: EConfigType,
    config: EConfiguration
  ): void { }



  public setFormat(format: FormatBoard): void {
    this.format = format;
    this.loadModelAndDisplay();
  }


  protected async loadModelAndDisplay(
    onLoad?: (model?: Object3D) => void
  ): Promise<void> {
    try {
      if (!this.format) return;
      // const boardUrl = `https://storage.googleapis.com/library-all-test/borads/${this.type}.fbx`;
      const boardUrl = `${this.libraryUrl}/borads/${this.type}/${this.format}.fbx`;
      const model = await this.loader.loadModel(boardUrl);

      const customModel = model.children[0] as CustomObject3D;

      customModel.onPointerDown = () => this.handleSelected(customModel);
      customModel.interactive = true;
      this.model = customModel;

      if (this.model && this.modelParent && this.position && this.rotation) {
        this.modelParent.attach(this.model);
        this.model.position.copy(this.position);
        this.model.rotation.copy(this.rotation);
      }

      // this.initializeContentAreas();
      onLoad && onLoad();
    } catch (error) {
      console.error("Error loading board model:", error);
      throw new Error("Failed to load board model");
    }
  }

  public setConfiguration(type: EConfigType, config: EConfiguration): void {
    this.configuration.set(type, config);
    this.updateContentPositions();
  }

  public async setContentMaterial(
    type: ContentDataType,
    material: IContentMaterial
  ): Promise<void> {
    let geometry;


    if (type === ContentDataType.FRAME) {
      const configV = this.configuration.get(EConfigType.VERTICAL);
      const configH = this.configuration.get(EConfigType.HORIZONTAL);
      const geometryName = `ph_${type}_${configV?.charAt(0)}_${configH?.charAt(0)}`;

      geometry = this.getGeometryByName(geometryName);
      const imageGeometry = geometry;
      if (imageGeometry instanceof Mesh) {
        imageGeometry.visible = true;
        imageGeometry.parent?.children.forEach((child) => {
          if (child.name !== imageGeometry.name) {
            child.visible = false;
            return;
          }
        });
      }
    }
    geometry = geometry || this.getGeometryByName(type);

    if (geometry instanceof Mesh) {
      if (material.customMaterial) {
        await this.changeMaterial(geometry, material.customMaterial);
      } else if (material.renderer) {
        await this.applyRenderMaterial(geometry, material.renderer);
      } else if (material.video) {
      await this.applyVideoMaterial(geometry, material.video);
      }

      this.contentData.set(type, {
        ...this.contentData.get(type),
        contentMaterial: material,
      });
    }
  }

  public setContentText(type: ContentDataType, text: IContentText): void {
    const geometry = this.getGeometryByName(type);
    const configV = this.configuration.get(EConfigType.VERTICAL);
    const configH = this.configuration.get(EConfigType.HORIZONTAL);
    const configImageName = `ph_${type}_${configV?.charAt(0)}_${configH?.charAt(0)}`;

    this.contentData.set(type, {
      contentObjects: { meshName: configImageName },
      contentText: text,
    });

    if (geometry instanceof Mesh) {
      this.applyText(geometry, text);
    }
  }

  protected getPlaceholder(
    type: ContentDataType | EContentImagesType | ContentDataType
  ) {
    const configV = this.configuration.get(EConfigType.VERTICAL);
    const configH = this.configuration.get(EConfigType.HORIZONTAL);
    const placeholderName = `ph_${type}_${configV?.charAt(0)}_${configH?.charAt(0)}`;
    const placeholder = this.getGeometryByName(placeholderName);
    return placeholder;
  }

  protected initializeContentAreas(): void {
    this.model?.traverse((content) => {
      if (content instanceof Mesh && !content.name.startsWith("ph_")) {
        // const contentType = content.name.split('_')[0];
        // this.contentMaterial.set(contentType, {
        //     customMaterial: {
        //         diffuse: { color: 'white' }
        //     }
        // });
        // this.contentText.set(contentType, { text: '' });
      }
    });
  }

  protected updateContentPositions(): void {
    this.contentData.forEach(async (data, contentType) => {
      const geometry = this.getGeometryByName(contentType);
      const placeholder = this.getPlaceholder(contentType);
      if (geometry && placeholder) {
        const oldMaterial = this.contentData.get(contentType);
        if (contentType === ContentDataType.FRAME) {
          await this.setContentMaterial(
            ContentDataType.FRAME,
            oldMaterial?.contentMaterial!
          );
        } else {
          geometry.position.copy(placeholder.position);
          geometry.rotation.copy(placeholder.rotation);
        }

        const updatedObjects = {
          contentName: placeholder.name,
          position: placeholder.position,
          rotation: placeholder.rotation,
        };

        const oldContent = this.contentData.get(contentType);
        this.contentData.set(contentType, {
          ...oldContent,
          contentObjects: updatedObjects,
        });
      }
    });
  }

  protected calculatePosition(contentType: string): Vector3 {
    // Implement position calculation based on configuration
    return new Vector3();
  }

  public exportToJson(): string {
    const exportObject = {
      ...JSON.parse(super.exportToJson()),
      slotNumber: this.slotNumber,
      configuration: Object.fromEntries(this.configuration),
      // contentMaterial: Object.fromEntries(this.contentMaterial),
      // contentText: Object.fromEntries(this.contentText),
      // contentObjects: Object.fromEntries(this.contentObjects),
      // contentImages: Object.fromEntries(this.contentImages),
      contentData: Object.fromEntries(this.contentData),
    };
    return JSON.stringify(exportObject, null, 2);
  }

  public buildFromJson(exportedObj: ExportedSceneObject) {
    if (exportedObj.format) {
      this.format = exportedObj.format;
    }

    for (const [key, value] of Object.entries(exportedObj.configuration)) {
      this.setConfiguration(key as EConfigType, value);
    }
    super.buildFromJson(exportedObj);

    // exportedObj.children.forEach((childData) => {
    //   let product;

    //   switch (childData.type as ProductType) {
    //     case ProductType.ProductDuo:
    //       product = new DouProduct(childData.type as ProductType, {
    //         exportedScenObj: childData,
    //       });
    //       break;
    //     case ProductType.Poudiom:
    //       // board = new MasterBoard(childData.type as BoardType, { exportedScenObj: childData });
    //       break;
    //     default:
    //       break;
    //   }
    //   if (product) {
    //     this.addChild(product);
    //     // this.addChild(board, childData.slotNumber);
    //   }
    // });
  }
}
