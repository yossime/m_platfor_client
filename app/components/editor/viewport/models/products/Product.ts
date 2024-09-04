import { Object3D, Vector3, Euler, Mesh, MeshStandardMaterial, RepeatWrapping, MeshPhongMaterial } from 'three';
import { SceneObject } from '../SceneObject';
import { BoardType, ISceneObjectOptions, ISceneObject, CustomObject3D, IContentMaterial, IContentText, EConfigType, EConfiguration, IContentMaterialType, IContentTextType, EContentImagesType, ProductType } from '../../../interface/types';
import { TextureManager } from '../../../interface/utils/TextureManager';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/Addons.js';

export class Product extends SceneObject {
    public slotNumber = -1;
    private selectedSlot: CustomObject3D | null = null;
    private configuration = new Map<EConfigType, EConfiguration>([
        [EConfigType.HORIZONTAL, EConfiguration.CENTER],
        [EConfigType.VERTICAL, EConfiguration.CENTER],
    ]);
    // private contentMaterial = new Map<string, IContentMaterial>();
    // private contentText = new Map<string, IContentText>();

    constructor(type: ProductType, options?: ISceneObjectOptions, onBoardLoaded?: () => void) {
        super(type, options);
        this.loadModelAndDisplay(onBoardLoaded);
    }

    public addChild(sceneObject: ISceneObject): void {
        // Implement child adding logic if needed
    }

    // protected handleSelectSlot = (object: CustomObject3D) => {
    //     this.highlightMesh(object);
    //     this.selectedSlot = object;
    //   };

    protected handleSelectSlot = (object: CustomObject3D) => {
        this.highlightMesh(object);
        this.selectedSlot = object;

        // if (this.childToAdd) {
        //     this.addChild(this.childToAdd)
        // }
        return this;
    };


    public displayEmptySlots(): void {
        // Implement empty slots display logic
    }

    public setConfiguration(type: EConfigType, config: EConfiguration): void {
        this.configuration.set(type, config);
        this.updateContentPositions();
    }

    public async setContentMaterial(type: IContentMaterialType, material: IContentMaterial): Promise<void> {

        if (type === IContentMaterialType.IMAGE) {
            this.setContentImage(EContentImagesType.IMAGE, material);
            return;
        }
        const geometry = this.getGeometryByName(type);
        if (geometry instanceof Mesh) {
            if (material.customMaterial) {
                await this.changeMaterial(geometry, material.customMaterial);
            } else if (material.render) {
                await this.applyRenderMaterial(geometry, material.render);
            }
            this.contentMaterial.set(type, material);

            const oldContent = this.contentData.get(type);
            this.contentData.set(type, { ...oldContent, contentMaterial: material });
        }
    }

    async setContentImage(type: EContentImagesType, material: IContentMaterial): Promise<void> {
        const configV = this.configuration.get(EConfigType.VERTICAL);
        const configH = this.configuration.get(EConfigType.HORIZONTAL);
        const configImageName = `ph_${type}_${configV?.charAt(0)}_${configH?.charAt(0)}`;
        const geometry = this.getGeometryByName(configImageName);

        this.contentImages.set(type, material);

        const oldContent = this.contentData.get(type);
        this.contentData.set(type, { ...oldContent, contentMaterial: material });

        if (geometry instanceof Mesh) {
            await this.changeMaterial(geometry, material.customMaterial!);
        }

    }


    public setContentText(type: IContentTextType, text: IContentText): void {
        // const geometry = this.getGeometryByName(IContentTextType.BUTTON);
        const geometry = this.getGeometryByName(type);
        // const placeholder = this.getPlaceholder(type);
        const configV = this.configuration.get(EConfigType.VERTICAL);
        const configH = this.configuration.get(EConfigType.HORIZONTAL);
        const configImageName = `ph_${type}_${configV?.charAt(0)}_${configH?.charAt(0)}`;

        const oldContent = this.contentData.get(type);
        this.contentData.set(type, { contentObjects: { meshName: configImageName }, contentText: text });
        console.log('Mesh type', type)

        if (geometry instanceof Mesh) {
            console.log('Mesh geometry')
            this.applyText(geometry, text);
            this.contentText.set(type, text);
        }
    }

    protected handleSelected = (object: CustomObject3D) => { return this };



    async loadModelAndDisplay(onLoad?: () => void): Promise<void> {
        try {
            const boardUrl = `https://storage.googleapis.com/library-all-test/borads/${this.type}.fbx`;
            const model = await this.loadModel(boardUrl);

            const customModel = model.children[0] as CustomObject3D;

            customModel.onPointerDown = () => this.handleSelected(customModel);
            customModel.interactive = true;
            this.model = customModel;

            await this.setPlaceholders();

            if (this.modelParent && this.position && this.rotation) {
                this.modelParent.attach(this.model);
                this.model.position.copy(this.position);
                this.model.rotation.copy(this.rotation);
            }

            this.initializeContentAreas();

            onLoad && onLoad();
        } catch (error) {
            console.error('Error loading board model:', error);
            throw new Error('Failed to load board model');
        }
    }

    private async setPlaceholders(): Promise<void> {
        try {
            if (!this.model) return;

            const slots = this.model.children[0].children.filter(child => child.name.startsWith('Slot_'));

            // const placeholderPath = `fbx-bucket/boards/${this.type}_slot_placeholder.glb`;
            const placeholderPath = `https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/boards%2Fplaceholder.fbx?alt=media&token=fc38725e-1a24-49e4-9d78-2282cc112387`;
            const placeholder = await this.loadModel(placeholderPath);


            slots.forEach(slot => {
                const placeholderClone = placeholder.clone().children[0] as CustomObject3D;

                placeholderClone.onPointerDown = () => this.handleSelectSlot(placeholderClone);
                // placeholderClone.onPointerDown = () => this.handleSelectSlot(placeholderClone);
                placeholderClone.interactive = true;
                slot.parent?.attach(placeholderClone);
                placeholderClone.position.copy(slot.position);
                placeholderClone.rotation.copy(slot.rotation);
                placeholderClone.visible = false;
                slot.parent?.remove(slot);
                this.placeholders.push(placeholderClone);
            });

        } catch (error) {
            console.error("Error loading or setting placeholders:", error);
        }

    }


    private getPlaceholder(type: IContentMaterialType | EContentImagesType | IContentTextType) {
        const configV = this.configuration.get(EConfigType.VERTICAL);
        const configH = this.configuration.get(EConfigType.HORIZONTAL);
        const placeholderName = `ph_${type}_${configV?.charAt(0)}_${configH?.charAt(0)}`;
        const placeholder = this.getGeometryByName(placeholderName);
        return placeholder;
    }

    private initializeContentAreas(): void {
        this.model?.traverse(content => {
            if (content instanceof Mesh && !content.name.startsWith('ph_')) {
                // const contentType = content.name.split('_')[0];
                // this.contentMaterial.set(contentType, {
                //     customMaterial: {
                //         diffuse: { color: 'white' }
                //     }
                // });
                // this.contentText.set(contentType, { text: '' });
            }
        });
    }

    private updateContentPositions(): void {
        this.contentMaterial.forEach((material, contentType) => {
            console.log("contentType  contentMaterial", contentType)
            const geometry = this.getGeometryByName(contentType);
            const placeholder = this.getPlaceholder(contentType);
            if (geometry && placeholder) {
                // const newPosition = this.calculatePosition(contentType);
                geometry.position.copy(placeholder.position);
                geometry.rotation.copy(placeholder.rotation);
                console.log("contentType  contentMaterial", contentType)

                const oldMaterial = this.getContentMaterial(contentType);

                const updatedObjects = {
                    contentName: placeholder.name,
                    position: placeholder.position,
                    rotation: placeholder.rotation
                }
                // this.setContentMaterial(contentType, updatedMaterial);

                const oldContent = this.contentData.get(contentType);
                this.contentData.set(contentType, { ...oldContent, contentObjects: updatedObjects });
            }
        });

        this.contentText.forEach((material, contentType) => {
            console.log("contentType", contentType)
            // const geometry = this.getGeometryByName(IContentMaterialType.BUTTON);
            // const placeholder = this.getPlaceholder(IContentMaterialType.BUTTON);
            const geometry = this.getGeometryByName(contentType);
            const placeholder = this.getPlaceholder(contentType);
            if (geometry && placeholder) {
                // const newPosition = this.calculatePosition(contentType);
                geometry.position.copy(placeholder.position);
                geometry.rotation.copy(placeholder.rotation);

                const updatedContent = {
                    contentName: placeholder.name,
                    position: placeholder.position,
                    rotation: placeholder.rotation
                }
                this.contentObjects.set(contentType, updatedContent);

                const oldContent = this.contentData.get(contentType);
                // console.log("...oldContent", { ...oldContent, contentObjects: updatedContent })
                this.contentData.set(contentType, { ...oldContent, contentObjects: updatedContent });
            }
        });

        this.contentImages.forEach(async (material, contentType) => {
            const geometry = this.getGeometryByName(contentType);
            const placeholder = this.getPlaceholder(contentType);

            if (geometry && placeholder) {
                placeholder.visible = true;
                placeholder.parent?.children.forEach(child => {
                    if (child.name !== placeholder.name) {
                        child.visible = false;
                        return;
                    }
                })
                const testMaterial: IContentMaterial = {
                    customMaterial: {
                        tint: {
                            color: 'green',
                        },
                        // diffuse: {
                        //     url: `https://storage.googleapis.com/library-materials-test-all/iron.jpg`
                        // }
                    }
                }
                const oldMaterial = this.getContentImage(contentType);
                if (oldMaterial?.customMaterial) {
                    // console.log("gem.oldMaterial", oldMaterial)

                    await this.setContentMaterial(IContentMaterialType.IMAGE, oldMaterial);

                    const updatedContent = {
                        contentName: placeholder.name,
                        position: placeholder.position,
                        rotation: placeholder.rotation
                    }
                    this.contentObjects.set(contentType, updatedContent);
                    this.contentData.set(contentType, { ...this.contentData.get(contentType), contentObjects: updatedContent });
                }
            }
        });
    }

    private calculatePosition(contentType: string): Vector3 {
        // Implement position calculation based on configuration
        return new Vector3();
    }

    private applyText(mesh: Mesh, text: IContentText): void {
        this.straightText(mesh, text)
    }

    async loadFont(url: string): Promise<Font> {
        const loader = new FontLoader();

        return new Promise((resolve, reject) => {
            loader.load(url, resolve, undefined, reject);
        });
    }

    async straightText(mesh: Mesh, text: IContentText) {
        try {
            const font = await this.loadFont('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json');
            const geometry = new TextGeometry(text.text, {
                font: font,
                size: 0.5,
                depth: 0.1,
            });

            const material = new MeshPhongMaterial({ color: 0xffffff });
            const newMesh = new Mesh(geometry, material);
            newMesh.position.copy(mesh.position);

            mesh.geometry.dispose();
            mesh.geometry = geometry;
            mesh = newMesh;

        } catch (error) {
            console.error('Error replacing text:', error);
        }
    }


    public exportToJson(): string {
        const exportObject = {
            ...JSON.parse(super.exportToJson()),
            slotNumber: this.slotNumber,
            // configuration: Object.fromEntries(this.configuration),
            // contentMaterial: Object.fromEntries(this.contentMaterial),
            // contentText: Object.fromEntries(this.contentText),
            // contentObjects: Object.fromEntries(this.contentObjects),
            // contentImages: Object.fromEntries(this.contentImages),
            contentData: Object.fromEntries(this.contentData),
        };
        return JSON.stringify(exportObject, null, 2);
    }



    private async applyRenderMaterial(mesh: Mesh, renderType: string): Promise<void> {
        const textureManager = TextureManager.getInstance();
        const textureUrl = `https://storage.googleapis.com/library-materials-test-all/${renderType}.jpg`;

        await this.changeMaterial(mesh, { diffuse: { map: textureUrl } });


        // try {

        //     const texture = await textureManager.loadTexture(textureUrl, {
        //         wrapS: RepeatWrapping,
        //         wrapT: RepeatWrapping,
        //         repeat: { x: 2, y: 2 }
        //     });

        //     const material = new MeshStandardMaterial({
        //         map: texture,
        //         metalness: 0.5,
        //         roughness: 0.5
        //     });

        //     mesh.material = material;
        // } catch (error) {
        //     console.error(`Failed to load render material: ${renderType}`, error);
        // }
    }
}