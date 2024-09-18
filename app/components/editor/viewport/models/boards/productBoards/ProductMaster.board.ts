
import { ISceneObjectOptions } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { ProductBoardABC } from '.';
import { Product } from '../../products/Product';

export class ProductMaster extends ProductBoardABC {
    protected getBoardUrl(): string {
        throw new Error('Method not implemented.');
    }
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
    }

    public addChild(sceneObject: Product, slotNumber?: number): void {
        if (slotNumber) {
            const slot = this.slots.find(placeholder => parseInt(placeholder.name.replace(/\D/g, ''), 10) === slotNumber);
            this.selectedSlot = slot || null;
        }
        const slot = this.slots.pop();
        if (!slot) {
            console.warn('No slot available for adding child');
            return;
        }
            sceneObject.slotNumber = slotNumber || this.children.length;
            sceneObject.exchangeSlot(slot);
            this.children.push(sceneObject);
    }




  
  
}