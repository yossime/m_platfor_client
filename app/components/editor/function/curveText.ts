

import * as THREE from 'three';
import { Text as TroikaText } from 'troika-three-text';
import { TextParams } from '../types';




const getRadiusFromMesh = (mesh: THREE.Mesh) => {
    if (!mesh) return;

    const boundingBox = new THREE.Box3().setFromObject(mesh);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());

    const radius = Math.max(size.x, size.y, size.z) / 2;


    return radius;
};


export class TextObject extends TroikaText{
    private params: TextParams;

    constructor(mesh: THREE.Mesh, initialParams: TextParams) {
        super();
        this.params = initialParams;
        this.init(mesh);
    }

    private init(mesh: THREE.Mesh) {
        const params = this.params;
        // const this = new TroikaText();
        const parent = mesh?.parent;
        const meshName = mesh.name;
        const textMeshRadius = getRadiusFromMesh(mesh);
        // console.log(textMeshRadius);
        parent?.remove(mesh);

        this.position.copy(mesh.position);
        this.rotation.copy(mesh.rotation);
        this.scale.copy(mesh.scale);

        this.name = meshName;
        this.parent = parent!;
        this.userData = { type: meshName };
        this.text = params.text;
        this.fontSize = params.fontSize;
        this.color = params.color;
        // textMesh.position.set(params.position.x, params.position.y, params.position.z);
        this.anchorX = params.anchorX;
        this.anchorY = params.anchorY;
        this.maxWidth = params.maxWidth;
        this.textAlign = params.textAlign;
        // textMesh.curveRadius = 30;
        // this.curveRadius = textMeshRadius || 0;
        this.curveRadius = 8.282448370772528;

        parent?.add(this);
        this.sync();
        // return this;
    }

    setParams(newParams: Partial<TextParams>): void {
        this.params = { ...this.params, ...newParams };
    }

    public getParams() {
        return this.params;
    }
    public update(newParams: Partial<TextParams>): void {
        this.setParams(newParams);
        const params = this.params;
        this.text = params.text;
        this.color = params.color;
        this.anchorX = params.anchorX;
        this.anchorY = params.anchorY;
        this.textAlign = params.textAlign;
        this.sync();
    }

    public getMesh(): TroikaText {
        return this;
    }
}
