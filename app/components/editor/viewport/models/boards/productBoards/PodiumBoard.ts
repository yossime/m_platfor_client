
import { ISceneObjectOptions } from '@/components/editor/viewport/types';
import { BoardType } from '../types';
import { ProductBoard } from './ProductBoard';
import { Product } from '../../products/Product';

export class PodiumBoard extends ProductBoard {
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
    }
    public addChild(product: Product): void {
    }
}