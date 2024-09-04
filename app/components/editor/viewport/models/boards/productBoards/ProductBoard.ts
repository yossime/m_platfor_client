import { Vector3, Mesh,MeshPhongMaterial } from 'three';
import { BoardType, ISceneObjectOptions, ISceneObject, CustomObject3D, IContentMaterial, 
    IContentText, EConfigType, EConfiguration, IContentMaterialType, IContentTextType, EContentImagesType } from '@/components/editor/interface/types';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/Addons.js';
// import { SceneObject } from '../SceneObject';
import { TextureManager } from '@/components/editor/interface/utils/TextureManager';
import { Board } from '../Board';

export abstract class ProductBoard extends Board {
    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
        this.loadModelAndDisplay(onBoardLoaded);
    }
}