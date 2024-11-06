
import * as THREE from "three";
import {
  ISceneObjectOptions,
  CustomObject3D,
  ContentMaterial,
  EConfigType,
  EConfiguration,
  ContentDataType,
  ExportedSceneObject,
  FormatBoard,
} from "@/components/editor/types/index";
import { BoardType } from "@/components/editor/types";
import { SceneObject } from "../SceneObject";

export abstract class Board extends SceneObject {
  public slotNumber = -1;
  protected format?: FormatBoard;
  protected selectedSlot: CustomObject3D | null = null;
  protected configuration = new Map<EConfigType, EConfiguration>([
    [EConfigType.HORIZONTAL, EConfiguration.CENTER],
    [EConfigType.VERTICAL, EConfiguration.CENTER],
  ]);
  protected logoConfiguration = new Map<EConfigType, EConfiguration>([
    [EConfigType.HORIZONTAL, EConfiguration.CENTER],
    [EConfigType.VERTICAL, EConfiguration.CENTER],
  ]);
  protected abstract getBoardUrl(): string;

  constructor(
    type: BoardType,
    boardType: string,
    options?: ISceneObjectOptions
  ) {
    
    const categoryPath = `boards/${boardType}`
    super(type, categoryPath, options);
    this.loadModelAndDisplay(options?.onLoad);
  }

  public getConfiguration(): Map<EConfigType, EConfiguration> | null { return this.configuration };

  public getFormat(): FormatBoard | null { return this.format! };

  public getLogoConfiguration(): Map<EConfigType, EConfiguration> | null { return null };

  public setFormat(format: FormatBoard): void {
    if(!this.model || this.format === format) return;
    this.format = format;
    this.modelPath = `${this.modelPath.substring(0, this.modelPath.lastIndexOf('/'))}/${this.format}`;
    this.model.removeFromParent();
    this.loadModelAndDisplay();
  }

  public setConfiguration(type: EConfigType, config: EConfiguration): void {
    this.configuration.set(type, config);
    this.updateContentPositions();
  }

  public setLogoConfiguration(type: EConfigType, config: EConfiguration): void {
    this.logoConfiguration.set(type, config);
    const logoContentType = ContentDataType.LOGO;
    const configV = this.logoConfiguration.get(EConfigType.VERTICAL);
    const configH = this.logoConfiguration.get(EConfigType.HORIZONTAL);

    const placeholderName = `ph_${logoContentType}_${configV?.charAt(0)}_${configH?.charAt(0)}`;
    const geometry = this.getGeometryByName(logoContentType);
    const placeholder = this.getGeometryByName(placeholderName);

    if (geometry && placeholder) {
      geometry.position.copy(placeholder.position);
      geometry.rotation.copy(placeholder.rotation);
    }

    const oldContent = this.contentsData.get(logoContentType);
    this.contentsData.set(logoContentType, {
      ...oldContent,
      // contentObjects: updatedObjects,
    });
  }

  public async setContentMaterial(
    type: ContentDataType,
    material: ContentMaterial
  ): Promise<void> {
    let geometry;
    const slotname = material.slotname;
    if (type === ContentDataType.FRAME) {
      const configV = this.configuration.get(EConfigType.VERTICAL);
      const configH = this.configuration.get(EConfigType.HORIZONTAL);
      const geometryName = `ph_${type}_${configV?.charAt(0)}_${configH?.charAt(0)}`;

      geometry = this.getGeometryByName(geometryName);
      const imageGeometry = geometry;
      if (imageGeometry instanceof THREE.Mesh) {
        imageGeometry.visible = true;
        imageGeometry.parent?.children.forEach((child) => {
          if (child.name !== imageGeometry.name) {
            child.visible = false;
            return;
          }
        });
      }
    } else if(slotname) {
      geometry = this.getGeometryByName(slotname)
    } else {

      geometry = this.getGeometryByName(type);
    }

    if (geometry instanceof THREE.Mesh) {
      if (material?.customMaterial) {
        await this.changeMaterial(geometry, material.customMaterial);
      } else if (material?.renderer) {
        // await this.applyRenderMaterial(geometry, material.renderer);
      } else if (material?.video) {
        await this.applyVideoMaterial(geometry, material.video);
      }

      this.contentsData.set(type, {
        ...this.contentsData.get(type),
        contentMaterial: material,
      });
    }
  }

  protected getPlaceholder(type: ContentDataType) {
    const configV = this.configuration.get(EConfigType.VERTICAL);
    const configH = this.configuration.get(EConfigType.HORIZONTAL);
    const placeholderName = `ph_${type}_${configV?.charAt(0)}_${configH?.charAt(0)}`;
    const placeholder = this.getGeometryByName(placeholderName);
    return placeholder;
  }

  protected async updateContentPositions(): Promise<void> {
    const entries = Array.from(this.contentsData.entries());

    for (const [contentType, data] of entries) {
      if (contentType === ContentDataType.LOGO) {
        continue;
      }

      const geometry = this.getGeometryByName(contentType);

      const placeholder = this.getPlaceholder(contentType);

      if (geometry && placeholder) {
        const oldMaterial = this.contentsData.get(contentType);

        if (contentType === ContentDataType.FRAME) {
          await this.setContentMaterial(
            ContentDataType.FRAME,
            oldMaterial?.contentMaterial!
          );
        } else {
          geometry.position.copy(placeholder.position);
          geometry.rotation.copy(placeholder.rotation);
        }

        const oldContent = this.contentsData.get(contentType);
        this.contentsData.set(contentType, {
          ...oldContent,
          // contentObjects: updatedObjects,
        });
      }
    }
  }

  protected calculatePosition(contentType: string): THREE.Vector3 {
    // Implement position calculation based on configuration
    return new THREE.Vector3();
  }

  public exportToJson(): string {
    const exportObject = {
      ...JSON.parse(super.exportToJson()),
      slotNumber: this.slotNumber,
      format: this.format,
      configuration: Object.fromEntries(this.configuration),
      contentsData: Object.fromEntries(this.contentsData),
    };
    return JSON.stringify(exportObject, null, 2);
  }

  public buildFromJson(exportedObj: ExportedSceneObject) {
    if (exportedObj.configuration) {
      for (const [key, value] of Object.entries(exportedObj.configuration)) {
        this.setConfiguration(key as EConfigType, value);
      }
    }
    super.buildFromJson(exportedObj);

    if (exportedObj.format)
      this.setFormat(exportedObj.format)
  }
}
