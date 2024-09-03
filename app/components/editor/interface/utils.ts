
import { Object3D, Mesh, MeshStandardMaterial, TextureLoader, Texture, Color, Material } from 'three';
import { FBXLoader, Font, FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';
import { ContentText, CustomMaterial } from './typesA';
import { ICustomMaterial } from './types';


export async function loadModel(url: string): Promise<Object3D> {
    const loader = new FBXLoader();
    return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
    });
}

export async function loadTexture(source: string | File): Promise<Texture> {
    const loader = new TextureLoader();
    const url = source instanceof File ? URL.createObjectURL(source) : source;
    return new Promise((resolve, reject) => {
        loader.load(url,
            (texture) => {
                if (source instanceof File) URL.revokeObjectURL(url);
                resolve(texture);
            },
            undefined,
            reject
        );
    });
}

export async function applyMaterialToMesh(mesh: Mesh, material: CustomMaterial): Promise<void> {
    const newMaterial = new MeshStandardMaterial();

    if (material.diffuse) {
        if (material.diffuse.url) {
            newMaterial.map = await loadTexture(material.diffuse.url);
        } else if (material.diffuse.color) {
            newMaterial.color = new Color(material.diffuse.color);
        }
    }

    // Apply other properties (opacity, roughness, etc.) similarly

    mesh.material = newMaterial;
}

export async function createTextMesh(text: ContentText): Promise<Mesh> {
    const font = await loadFont('path/to/font.json');
    const geometry = new TextGeometry(text.text, {
        font: font,
        size: parseFloat(text.size || '1'),
        height: 0.1,
    });

    const material = new MeshStandardMaterial({ color: text.color || 0xffffff });
    return new Mesh(geometry, material);
}

async function loadFont(url: string): Promise<Font> {
    const loader = new FontLoader();
    return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
    });
}





// async function ChangeMaterial(mesh: Object3D, textureMap: ICustomMaterial): Promise<void> {
//     if (!(mesh instanceof Mesh)) return;
//     // console.log(`Changing material`, mesh, textureMap);
//     let material;
//     if (mesh.material instanceof MeshStandardMaterial) {
//         material = mesh.material
//     } else {
//         material = new MeshStandardMaterial();
//         mesh.material = material;
//     }

//     await applyTextureMaps(material, textureMap);
// }


// async function loadTextureFromSource(source: File | string): Promise<Texture> {
//     return new Promise<Texture>((resolve, reject) => {
//         const loader = new TextureLoader();
//         const url = source instanceof File ? URL.createObjectURL(source) : source;

//         loader.load(
//             url,
//             (texture) => {
//                 if (source instanceof File) URL.revokeObjectURL(url);
//                 resolve(texture);
//             },
//             undefined,
//             (error) => reject(error)
//         );
//     });
// }


// async function applyTextureMaps(material: Material, textureMaps: ICustomMaterial): Promise<void> {
//     if (!(material instanceof MeshStandardMaterial)) {
//         console.error('Material is not a MeshStandardMaterial.');
//         return;
//     }

//     const stdMaterial = material as MeshStandardMaterial;
//     const texturePromises: Promise<void>[] = [];

//     const textureProperties: { [key in keyof ICustomMaterial]: keyof MeshStandardMaterial } = {
//         diffuse: 'map',
//         opacity: 'alphaMap',
//         roughness: 'roughnessMap',
//         normal: 'normalMap',
//         metallic: 'metalnessMap',
//         emission: 'emissiveMap',
//         tint: 'color'
//     };

//     for (const [key, property] of Object.entries(textureProperties)) {
//         const textureSource = textureMaps[key as keyof ICustomMaterial];
//         if (textureSource) {
//             if (textureSource.file || textureSource.url) {
//                 const source = textureSource.file ?? textureSource.url;
//                 if (source) {
//                     texturePromises.push(
//                         loadTextureFromSource(source).then(texture => {
//                             (stdMaterial as any)[property] = texture;
//                             stdMaterial.needsUpdate = true;
//                         }).catch(error => {
//                             console.error(`Failed to load texture for ${key}:`, error);
//                         })
//                     );
//                 }
//             } else if (property === 'color' && textureSource.color) {
//                 stdMaterial.color.set(textureSource.color);
//             }
//         }
//     }

//     try {
//         await Promise.all(texturePromises);
//         console.log('All textures applied successfully.');
//     } catch (error) {
//         console.error('Error applying textures:', error);
//     }
// }