
import { FormatBoard, ISceneObjectOptions } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { ProductBoardABC } from '.';
import { Product } from '@/components/dashboard/types/product.types';
import { Podium } from '../../products/Podium';
import { Object3D } from 'three';

export class ProductMaster extends ProductBoardABC {
    public maxStands: number;
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
        this.maxStands = 0;
        // this.format = FormatBoard.Duo;
        this.setFormat(FormatBoard.Podium);
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
                break;
        }
        console.log('prodct', this.slots)
    }

    onModelLoaded(model: any): void {
        console.log('Model loaded', model)
        console.log('this.type', this.type)
        const middleSlot = Math.floor((this.slots.length) / 2);
        // const middleSlot = 5;
        const slotNumber = middleSlot + this.children.length + 1;

        const slot = this.slotsMap.get(slotNumber);

        const modelParent = slot?.parent;


        modelParent?.attach(model);
    }


    private async createPodium(product: Product): Promise<void> {
        const middleSlot = Math.floor((this.slots.length) / 2);
        const slotNumber = middleSlot + this.children.length + 1;
        const slotName = `slot_${slotNumber}`;
        const podium = new Podium(slotNumber, product, {}, (model) => this.onModelLoaded(model));



        // console.log('slotNumber', slotNumber)
        console.log("creating product", this.children.length)
        this.addChild(podium, slotNumber)
        this.children.push(podium);
        const podiums = this.children as Podium[];
        podiums.forEach((child, index) => {
            const newPlace = this.slotsMap.get((child.slotNumber) - 1);
            if (!newPlace) {
                console.warn(`No slot found for podium ${index}`);
                return;
            }
            console.log("child", child.slotNumber, newPlace)
            // child.setPosition(newPlace.position);
            // child.setRotation(newPlace.rotation);
            child.exchangeSlot(newPlace);

        });
    }

    // public addChild(sceneObject: Product, slotNumber?: number): void {
    //     if (slotNumber) {
    //         const slot = this.slots.find(placeholder => parseInt(placeholder.name.replace(/\D/g, ''), 10) === slotNumber);
    //         this.selectedSlot = slot || null;
    //     }
    //     const slot = this.slots.pop();
    //     if (!slot) {
    //         console.warn('No slot available for adding child');
    //         return;
    //     }
    //         sceneObject.slotNumber = slotNumber || this.children.length;
    //         sceneObject.exchangeSlot(slot);
    //         this.children.push(sceneObject);
    // }






}