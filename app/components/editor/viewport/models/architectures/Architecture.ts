import { Object3D, Vector3, Euler } from "three";
import { SceneObject } from "../SceneObject";
import {
  ISceneObjectOptions,
  ISceneObject,
  CustomObject3D,
  ExportedSceneObject,
  IArchitecture,
} from "../../../types";
import { BoardType } from "@/components/editor/types";
import { Board } from "../boards/Board";
import { createBoardByType } from "@/components/editor/utils/CraeteBoard";
import * as THREE from "three";
import { AddChildCommand } from "../../commands/AddChildCommand";
import { GLTFModelLoader } from "../../loaderes/AssetLoader";

export class Architecture extends SceneObject implements IArchitecture {
  private placeholderPath: string;
  private selectedSlot: CustomObject3D | null = null;
  private childToAdd: Board | null = null;
  private boardAddSuccess: boolean = false;

  constructor(type: string, options?: ISceneObjectOptions) {
    const architecturePath = `architectures/${type}`;
    const loader = new GLTFModelLoader();
    super(type, architecturePath, options, loader);
    this.name = "World";
    this.placeholderPath = `https://storage.googleapis.com/library-all-test/placeholders/${this.type}`;
    this.loadModelAndDisplay(options?.onLoad);

  }

  async loadModelAndDisplay(onLoad?: (model: Object3D) => void): Promise<void> {
    await super.loadModelAndDisplay(onLoad);
    try {
      await this.loadPlaceholders(
        this.placeholderPath,
        this.handleSelectSlot,
        this.handleHoverSlot,
        this.handleEndHover,
        this.handleEndPointerDown
      );
    } catch (error) {
      console.error("Error loading model:", error);
      throw new Error("Failed to load architecture model");
    }
  }

  public addBoard(board: Board): void {
    this.boardAddSuccess = false;
    this.childToAdd = board;
  }

  public finishDraging(): boolean {
    this.childToAdd = null;
    this.selectedSlot = null;
    return this.boardAddSuccess;
  }

  public addChild(sceneObject: Board, slotNumber?: number): void {
    if (slotNumber !== -1) {
      const slot = this.slots.find(
        (placeholder) =>
          parseInt(placeholder.name.replace(/\D/g, ""), 10) === slotNumber
      );
      this.selectedSlot = slot || null;
    }
    if (this.selectedSlot) {
      const slotNumber = parseInt(
        this.selectedSlot.name.replace(/\D/g, ""),
        10
      );
      sceneObject.slotNumber = slotNumber;
      this.selectedSlot.isEmpty = false;
      sceneObject.exchangeSlot(this.selectedSlot);
      this.children.push(sceneObject as SceneObject);
      this.boardAddSuccess = true;
      this.setSlotsVisible(false);
    } else {
      this.displayEmptySlots();
      this.childToAdd = sceneObject;
    }
  }

  removeChild(sceneObject: SceneObject): void {
    this.children = this.children.filter(
      (child) => child.id !== sceneObject.id
    );
    const slotName = sceneObject.getModel()!.name;
    const slot = this.getGeometryByName(slotName) as CustomObject3D;
    slot.isEmpty = true;
  }

  protected handleSelectSlot = (slet: CustomObject3D): ISceneObject => {
    return this;
  };

  handleEndPointerDown = (slet: CustomObject3D): void => {
    if (this.childToAdd) {
      const command = new AddChildCommand(this, this.childToAdd);
      this.commandManager.execute(command);
    }
  };

  handleHoverSlot = (slet: CustomObject3D): void => {
    if (this.childToAdd) {
      this.selectedSlot = slet;
      slet.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.scale.multiplyScalar(1.1);
        }
      });
    }
  };

  handleEndHover = (slet: CustomObject3D): void => {
    if (this.childToAdd) {
      slet.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.scale.multiplyScalar(1 / 1.1);
        }
      });
      this.selectedSlot = null;
    }
  };

  public buildFromJson(exportedObj: ExportedSceneObject) {
    super.buildFromJson(exportedObj);

    exportedObj.children?.forEach((childData) => {
      const board = createBoardByType(childData.type as BoardType, {
        exportedScenObj: childData,
      });
      this.addChild(board, childData.slotNumber);
    });
  }


}
