import { ISceneObjectOptions, ISceneObject, ContentDataType } from '@/components/editor/types/index';
import { BoardType } from "@/components/editor/types";
import { Board } from '../Board';
import { Object3D } from 'three';
import { CurveText } from '@/components/editor/utils/curveText';
import * as THREE from 'three';
import { Text as TroikaText } from 'troika-three-text';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
export abstract class MasterBoardABC extends Board {
    titelCurveText: CurveText;

    constructor(type: BoardType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
        // if(options?.exportedScenObj?.format) {
        //     this.setFormat(options?.exportedScenObj?.format);
        //   }

        const textOptions = {
            // text: `November 19, 1863`,
            fontSize: 0.5,
            color: '#ffffff',
            // anchorX: 'center',
            // anchorY: 'middle',
            // textAlign: 'center',
            // strokeColor: '#000000',
            // strokeWidth: 0,
            // maxWidth: 3,
            // outline: false,
            // curve: true,
            // curveRadius: 0,
            // curveSegments: 32,
            // fbxPath: 'borads_image_frame.fbx',
            // meshName: 'self',
        };
        this.titelCurveText = new CurveText()
        //   this.titelCurveText = new CurveText(textOptions)
    }
    protected boardUrl = `${this.libraryUrl}/borads/${this.type}`;
    protected getBoardUrl(): string { return `${this.boardUrl}/${this.format}.fbx`; };

    protected async loadModelAndDisplay(onLoad?: (model?: Object3D) => void): Promise<void> {
        if (!this.format) return;
        await super.loadModelAndDisplay(onLoad);
        this.initializeContentAreas();
    }

    initializeContentAreas(): void {
        this.contentsData.set(ContentDataType.TITLE, {});
        this.contentsData.set(ContentDataType.SUB_TITLE, {});
        this.contentsData.set(ContentDataType.FRAME, {});
        this.contentsData.set(ContentDataType.BUTTON, {});

        this.initializeContentText(ContentDataType.TITLE)
    }

    initializeContentText(meshName: ContentDataType) {
        const mesh = this.getGeometryByName(meshName);

        const newMesh = new TroikaText();

        const parent = mesh?.parent;
        if (mesh instanceof THREE.Mesh) {
            console.log(`Geometry`, mesh)
            parent?.remove(mesh);

            newMesh.name = mesh.name;
            newMesh.position.copy(mesh.position);
            newMesh.rotation.copy(mesh.rotation);
            newMesh.scale.copy(mesh.scale);
            console.log("mesh.scale", mesh.scale)
            // newTextMesh.scale.copy(mesh.scale);
            newMesh.parent = parent!;

            parent?.add(newMesh);

            newMesh.text = 'uuuuu fdfddgg gtrgrtghr grghtrh gerg';
            newMesh.fontSize = 1;
            newMesh.curveRadius = 9;
            newMesh.glyphGeometryDetail = 1;
            newMesh.rotation.y = 0;

            newMesh.sync();
        }

        // this.titelCurveText.getRadiusFromMesh(selfMesh);
        console.log(`parent`, parent)



    const exporter = new GLTFExporter();
    
    function exportGLTF(model: THREE.Object3D) {
        exporter.parse(model, (result) => {
            const output = JSON.stringify(result, null, 2);
            console.log(output);
    
            const blob = new Blob([output], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'scene.gltf';
            link.click();
        }, (error: ErrorEvent) => {
            console.error('Error exporting GLTF:', error);
        });

    }
    exportGLTF(this.model?.parent!);

    // initializeContentText(meshName: ContentDataType) {
    //     const mesh = this.getGeometryByName(meshName);

    //     const newMesh = new TroikaText();

    //     const selfMesh = this.getGeometryByName(ContentDataType.SELF) as THREE.Mesh;
    //     const parent = mesh?.parent;
    //     if (mesh instanceof THREE.Mesh) {
    //         console.log(`Geometry`, mesh)
    //         // this.applyText(geometry, text);
    //         this.titelCurveText.update({ text: 'test text test text' });
    //         parent?.remove(mesh);

    //         // Add the new curved text mesh
    //         const newTextMesh = this.titelCurveText.getMesh() as THREE.Mesh;
    //         newTextMesh.name = mesh.name;
    //         newTextMesh.position.copy(mesh.position);
    //         newTextMesh.rotation.copy(mesh.rotation);
    //         console.log("mesh.scale", mesh.scale)
    //         // newTextMesh.scale.copy(mesh.scale);
    //         newTextMesh.parent = parent!;

    //         parent?.add(newTextMesh);

    //         const textMesh = this.titelCurveText.getMesh()
    //         textMesh.text = 'uuuuu';
    //         textMesh.sync();
    //     }

    //     // this.titelCurveText.getRadiusFromMesh(selfMesh);
    //     console.log(`parent`, parent)
    // }
}

}