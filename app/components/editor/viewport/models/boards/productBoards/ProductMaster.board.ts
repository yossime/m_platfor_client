
import { ExportedSceneObject, FormatBoard, ISceneObjectOptions, ProductStand } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { ProductBoardABC } from '.';
import { Product } from '@/components/dashboard/types/product.types';
import { Podium } from '../../products/Podium';
import { Object3D } from 'three';
import { Duo } from '../../products/Duo';

export class ProductMaster extends ProductBoardABC {
    protected format: FormatBoard;
    public maxStands: number;
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, FormatBoard.Duo, options);
        this.maxStands = 6;
        this.format = FormatBoard.Duo;
        // this.setFormat(FormatBoard.Duo);
        // this.loadModelAndDisplay(onBoardLoaded);

    }

    public setFormat(format: FormatBoard): void {
        this.format = format;
        switch (format) {
            case FormatBoard.Podium:
                this.maxStands = 6;
                break;
            case FormatBoard.Duo:
                this.maxStands = 2;
                break;
        }
    }
    public addStand(product: Product): void {
        // this.slots = this.getSlotsPosition();
        switch (this.format) {
            case FormatBoard.Podium:
                this.createPodium(product)
                break;
            case FormatBoard.Duo:
                this.createDuo(product);
                break;
        }
    }

    removeStand(productStand: ProductStand): void {
        
    }

    // onModelLoaded(model: any): void {
    //     const middleSlot = Math.floor((this.slots.length) / 2);
    //     // const middleSlot = 5;
    //     const slotNumber = middleSlot + this.children.length + 1;

    //     const slot = this.slotsMap.get(slotNumber);

    //     const modelParent = slot?.parent;


    //     // modelParent?.attach(model);
    //     // modelParent?.remove(slot!);
    // }


    private async createPodium(product: Product): Promise<void> {
        const middleSlot = Math.floor((this.slots.length) / 2);

        const slotNumber = middleSlot + this.children.length;
        const podium = new Podium(slotNumber, product, {});



        this.addChild(podium, slotNumber)
        const podiums = this.children as Podium[];
        podiums.forEach((child, index) => {
            const newPlace = this.slotsMap.get((child.slotNumber) - 1);
            // const newPlace = this.slotsMap.get((child.slotNumber) - 2);
            if (!newPlace) {
                console.warn(`No slot found for podium ${index} child.slotNumber: ${child.slotNumber}`);
                return;
            }
            child.setPosition(newPlace.position);
            // child.setRotation(newPlace.rotation);
            
        });
        // this.children.push(podium);
    }


    private async createDuo(product: Product): Promise<void> {
        const slotNumber = this.children.length;
        const newPlace = this.slotsMap.get(this.children.length);
        if (!newPlace) {
            console.warn(`No slot found for podium ${this.children.length}`);
            return;
        }

        
        const exportedScenObj: ExportedSceneObject = {
            position: newPlace?.position,
            rotation: newPlace?.rotation,
            type: 'Duo',
        }
        const dou = new Duo(product, {exportedScenObj});
        this.addChild(dou, slotNumber)
    }

}