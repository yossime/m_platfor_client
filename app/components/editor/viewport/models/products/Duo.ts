import { Euler, Object3D, Vector3 } from 'three';
import { SceneObject } from '../SceneObject';
import { ISceneObjectOptions, ISceneObject, CustomObject3D, StandType, ContentDataType } from '../../../types';
import { Stand } from '.';
import { Product } from '@/components/dashboard/types/product.types';


export class Duo extends Stand {
    constructor(productData: Product, options?: ISceneObjectOptions, onModelLoaded?: (model?: Object3D) => void) {
        super(StandType.Duo, productData, options);
    }



    public setSlotNumber(slotname: number): void {

    };

    public setPosition(position: Vector3): void {
        this.position = position;
        // this.model?.position.copy(position);
        this.model?.position.set(0.038, -0.041, -0.022);
        // this.model?.position.set(position.x, position.y, position.z);
    }

    public setRotation(rotation: Euler): void {
        this.rotation = rotation;
        // this.model?.rotation.copy(rotation);
        // this.model?.rotation.set(rotation.x, rotation.y, rotation.z);
        // this.model?.rotation.set(0,0, 138.87);
    }

}