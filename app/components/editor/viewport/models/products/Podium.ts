import { Euler, Object3D, Vector3 } from 'three';
import { SceneObject } from '../SceneObject';
import { ISceneObjectOptions, ISceneObject, CustomObject3D, StandType, ContentDataType } from '../../../types';
import { Stand } from '.';
import { Product } from '@/components/dashboard/types/product.types';


export class Podium extends Stand {
    public slotNumber: number;
    // public slotName: string;

    constructor(slotNumber: number, productData: Product, options?: ISceneObjectOptions, onModelLoaded?: (model?: Object3D) => void) {
        super(StandType.Poudiom, options);
        this.slotNumber = slotNumber;
        // this.slotName = slotName;

        // this.loadModelAndDisplay(onModelLoaded);

        (async () => {
            await this.loadModelAndDisplay(onModelLoaded);
            console.log("productData", productData)
            this.setContentText(ContentDataType.PRICE, {text: productData.price.toString()})
            this.setContentText(ContentDataType.TITLE, {text: productData.title})
            // this.setContentText(ContentDataType.PRICE_CURRENCY, {text: productData.currencyType || '$'})
            this.contentsData.set(ContentDataType.PRODUCT, {contentObjects:{SKU: productData.SKU, model: '2'}})
        })();

    }

    public setSlotNumber(slotname: number): void {

    };

    public setPosition(position: Vector3): void {
        // this.modelParent.attach(this.model);
        this.position = position;
        console.log("this.model", this.model);
        console.log('this.model?.position A ', this.model?.position);
        this.model?.position.copy(position);
        console.log('this.model?.position B', this.model?.position);

    }

    public setRotation(rotation: Euler): void {
        this.rotation = rotation;
        this.model?.rotation.copy(rotation);

    }

}