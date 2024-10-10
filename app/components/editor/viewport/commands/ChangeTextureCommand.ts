import { Command } from './Command';
import * as THREE from 'three';

export class ChangeTextureCommand extends Command {
    constructor(
        private mesh: THREE.Mesh,
        private newMaterial: THREE.MeshStandardMaterial,
        private oldMaterial: THREE.Material
    ) {
        super(
            () => {
                mesh.material = newMaterial;
            },
            () => {
                mesh.material = oldMaterial;
            }
        );
    }
}
