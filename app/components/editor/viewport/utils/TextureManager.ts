import { Texture, TextureLoader, LinearFilter, RGBAFormat, RepeatWrapping, ClampToEdgeWrapping, MirroredRepeatWrapping, Material, MeshStandardMaterial } from 'three';
import { ICustomMaterial } from '../../types';

export class TextureManager {
    private static instance: TextureManager;
    private textureCache: Map<string, Texture> = new Map();
    private loader: TextureLoader;

    private constructor() {
        this.loader = new TextureLoader();
    }

    public static getInstance(): TextureManager {
        if (!TextureManager.instance) {
            TextureManager.instance = new TextureManager();
        }
        return TextureManager.instance;
    }

    public async loadTexture(source: string | File, options: TextureOptions = {}): Promise<Texture> {
        let url: string;

        if (typeof source === 'string') {
            url = source;
        } else if (source instanceof File) {
            url = URL.createObjectURL(source);
        } else {
            throw new Error('Invalid texture source');
        }

        const cacheKey = this.getCacheKey(url, options);

        if (this.textureCache.has(cacheKey)) {
            return this.textureCache.get(cacheKey)!;
        }

        return new Promise((resolve, reject) => {
            this.loader.load(
                url,
                (texture) => {
                    this.configureTexture(texture, options);
                    this.textureCache.set(cacheKey, texture);
                    if (source instanceof File) {
                        URL.revokeObjectURL(url);
                    }
                    resolve(texture);
                },
                undefined,
                (error) => {
                    console.error('Error loading texture:', error);
                    if (source instanceof File) {
                        URL.revokeObjectURL(url);
                    }
                    reject(error);
                }
            );
        });
    }

    private configureTexture(texture: Texture, options: TextureOptions): void {
        // texture.minFilter = options.minFilter || LinearFilter;
        // texture.magFilter = options.magFilter || LinearFilter;
        // texture.wrapS = options.wrapS || ClampToEdgeWrapping;
        // texture.wrapT = options.wrapT || ClampToEdgeWrapping;
        // texture.format = options.format || RGBAFormat;

        if (options.repeat) {
            texture.repeat.set(options.repeat.x, options.repeat.y);
        }

        if (options.offset) {
            texture.offset.set(options.offset.x, options.offset.y);
        }

        texture.flipY = options.flipY !== undefined ? options.flipY : true;
        texture.needsUpdate = true;
    }

    private getCacheKey(url: string, options: TextureOptions): string {
        return `${url}-${JSON.stringify(options)}`;
    }

    public removeTexture(url: string, options: TextureOptions = {}): void {
        const cacheKey = this.getCacheKey(url, options);
        const texture = this.textureCache.get(cacheKey);
        if (texture) {
            texture.dispose();
            this.textureCache.delete(cacheKey);
        }
    }

    public clearCache(): void {
        this.textureCache.forEach(texture => texture.dispose());
        this.textureCache.clear();
    }

    public getTextureInfo(): { url: string; memoryUsage: number }[] {
        return Array.from(this.textureCache.entries()).map(([url, texture]) => ({
            url,
            memoryUsage: this.estimateTextureMemoryUsage(texture)
        }));
    }

    private estimateTextureMemoryUsage(texture: Texture): number {
        const bytesPerPixel = 4; // Assuming RGBA format
        return texture.image.width * texture.image.height * bytesPerPixel;
    }

    //   private async applyTextureMaps(material: Material, textureMaps: ICustomMaterial): Promise<void> {
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
    //                         this.loadTexture(source).then(texture => {
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
}

interface TextureOptions {
    minFilter?: number;
    magFilter?: number;
    wrapS?: number;
    wrapT?: number;
    format?: number;
    repeat?: { x: number; y: number };
    offset?: { x: number; y: number };
    flipY?: boolean;
}