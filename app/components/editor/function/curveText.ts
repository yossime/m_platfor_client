

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

export class TextObject {
    private textMesh: TroikaText;
    private params: TextParams;

    constructor(mesh: THREE.Mesh, initialParams: TextParams) {
        this.params = initialParams;
        this.textMesh = this.createTextMesh(mesh);
    }

    private createTextMesh(mesh: THREE.Mesh): TroikaText {
        const params = this.params;
        const textMesh = new TroikaText();
        const parent = mesh?.parent;
        const meshName = mesh.name;
        const textMeshRadius = getRadiusFromMesh(mesh);

        parent?.remove(mesh);

        textMesh.position.copy(mesh.position);
        textMesh.rotation.copy(mesh.rotation);
        textMesh.scale.copy(mesh.scale);

        textMesh.name = meshName;
        textMesh.parent = parent!;
        textMesh.userData = { type: meshName };
        textMesh.text = params.text;
        textMesh.fontSize = params.fontSize;
        textMesh.color = params.color;
        // textMesh.position.set(params.position.x, params.position.y, params.position.z);
        textMesh.anchorX = params.anchorX;
        textMesh.anchorY = params.anchorY;
        textMesh.maxWidth = params.maxWidth;
        textMesh.textAlign = params.textAlign;
        // textMesh.curveRadius = textMeshRadius;
        textMesh.curveRadius = 8.282448370772528;

        parent?.add(textMesh);
        textMesh.sync();
        return textMesh;
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
        this.textMesh.text = params.text;
        this.textMesh.color = params.color;
        this.textMesh.anchorX = params.anchorX;
        this.textMesh.anchorY = params.anchorY;
        this.textMesh.textAlign = params.textAlign;
        this.textMesh.sync();
    }

    public getMesh(): TroikaText {
        return this.textMesh;
    }
}
