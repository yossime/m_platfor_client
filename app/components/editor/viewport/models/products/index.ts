import * as THREE from 'three';
import { ISceneObjectOptions, ISceneObject, ProductBoard, ProductStand, FormatBoard, CustomObject3D, ContentDataType, ContentText, FontWeight, TextAlign, TextParams, ContentObjects } from '@/components/editor/types/index';
import { StandType } from "@/components/editor/types";
import { SceneObject } from '../SceneObject';
import { Product } from '@/components/dashboard/types/product.types';
import { TITLE } from '@/constants/editor/boards/text.constants';
import { ModelLoader } from '../../loaderes/ModelLoader';



export abstract class Stand extends SceneObject {
  // abstract maxStands: number;
  protected productData: Product;
  private modelLoader: ModelLoader = new ModelLoader();


  constructor(type: StandType, productData: Product, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
    const categoryPath = `products/${type}`
    super(type, categoryPath, options);
    this.productData = productData;

  }
  // protected getModelUrl(): string { return `https://storage.googleapis.com/library-all-test/stands/podium.fbx`; };
  protected getModelUrl(): string { return `${this.libraryUrl}/stands/${this.type}.fbx` };

  protected async loadModelAndDisplay(onLoad?: (model: THREE.Object3D) => void): Promise<void> {
    try {
      // const model = await this.loader.loadModel(this.getModelUrl());

      // const customModel = model.children[0] as CustomObject3D;

      // // customModel.onPointerDown = () => this.handleSelected(customModel);
      // customModel.interactive = true;
      // this.model = customModel;

      // if (this.model && this.modelParent && this.position && this.rotation) {
      //   this.modelParent.attach(this.model);
      //   this.model.position.copy(this.position);
      //   this.model.rotation.copy(this.rotation);
      // }

      // this.position = model.position;
      // this.rotation = model.rotation;
      await super.loadModelAndDisplay();
      this.initializeContentAreas();
      // onLoad && onLoad(model);
    } catch (error) {
      console.error("Error loading board model:", error);
    }
  }

  // protected abstract initializeContentAreas(): void ;

  protected async initializeContentAreas(): Promise<void> {
    const { price, title, currencyType, SKU, model } = this.productData;
    this.setContentText(ContentDataType.PRICE, { text: price.toString() })
    this.setContentText(ContentDataType.TITLE, { text: title })
    this.setContentText(ContentDataType.PRICE_CURRENCY, { text: currencyType || '$' })
    this.contentsData.set(ContentDataType.PRODUCT, { contentObjects: { SKU: SKU, model: model || '' } })

    const textParams: TextParams = {
      text: "Title",
      font: "Poppins",
      fontSize: 0.5,
      fontWeight: FontWeight.Normal,
      anchorX: 'center',
      anchorY: 'middle',
      textAlign: TextAlign.Center,
      lineHeight: 1.4,
      letterSpacing: 0,
      maxWidth: 300,
      color: '#212121',
      // glyphGeometryDetail: 1
    }
    this.initializeContentText(ContentDataType.TITLE, { ...textParams, text: title })
    this.initializeContentText(ContentDataType.PRICE, { ...textParams, text: price.toString() })
    this.initializeContentText(ContentDataType.PRICE_CURRENCY, { ...textParams, text: currencyType || '$' })

    await this.initializeContentObjects()
  }

  private async initializeContentObjects() {
    const { model: modelUrl } = this.productData;
    if (!modelUrl) return;

    const geometry = this.getGeometryByName(ContentDataType.PRODUCT_MODEL);
    const model = (await this.modelLoader.loadModel(modelUrl));
    if (geometry && model) {
      setScaleToMatch(model, geometry)
      geometry.visible = false;
    }
    model.parent = geometry?.parent!;
    geometry?.parent?.attach(model);
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


function setScaleToMatch(source: THREE.Object3D, target: THREE.Object3D) {
  const sourceBox = new THREE.Box3().setFromObject(source);
  const sourceSize = new THREE.Vector3();
  sourceBox.getSize(sourceSize);

  const targetBox = new THREE.Box3().setFromObject(target);
  const targetSize = new THREE.Vector3();
  targetBox.getSize(targetSize);

  const scaleFactor = Math.min(
    targetSize.x / sourceSize.x,
    targetSize.y / sourceSize.y,
    targetSize.z / sourceSize.z
  );

  source.scale.set(scaleFactor, scaleFactor, scaleFactor);
}