interface MaterialLayer {
    type: 'diffuse' | 'emission' | 'normal' | 'roughness' | 'metallic';
    texture: string | null;
    color?: string;
    intensity?: number;
}

export interface Material2D {
    id: string;
    name: string;
    layers: MaterialLayer[];
}

export class MaterialRenderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
    }

    async render(material: Material2D) {
        this.clear();
        for (const layer of material.layers) {
            await this.renderLayer(layer);
        }
    }

    private async renderLayer(layer: MaterialLayer) {
        switch (layer.type) {
            case 'diffuse':
                await this.renderDiffuse(layer);
                break;
            case 'emission':
                await this.renderEmission(layer);
                break;
            case 'normal':
                await this.renderNormal(layer);
                break;
            // Add other layer types here
        }
    }

    private async renderDiffuse(layer: MaterialLayer) {
        if (layer.texture) {
            const image = await this.loadImage(layer.texture);
            this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        } else if (layer.color) {
            this.ctx.fillStyle = layer.color;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    private async renderEmission(layer: MaterialLayer) {
        if (layer.texture) {
            const image = await this.loadImage(layer.texture);
            this.ctx.globalCompositeOperation = 'screen';
            this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.globalCompositeOperation = 'source-over';
        } else if (layer.color) {
            this.ctx.fillStyle = layer.color;
            this.ctx.globalCompositeOperation = 'screen';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.globalCompositeOperation = 'source-over';
        }
    }

    private async renderNormal(layer: MaterialLayer) {
        if (layer.texture) {
            const image = await this.loadImage(layer.texture);
            const imageData = this.getImageData(image);
            const newImageData = this.applyNormalMap(imageData);
            this.ctx.putImageData(newImageData, 0, 0);
        }
    }

    private applyNormalMap(imageData: ImageData): ImageData {
        const { data, width, height } = imageData;
        const newData = new Uint8ClampedArray(data.length);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const i = (y * width + x) * 4;
                const nx = data[i] / 255 * 2 - 1;
                const ny = data[i + 1] / 255 * 2 - 1;
                const nz = data[i + 2] / 255;

                // Simple lighting calculation
                const lightDir = [0, 0, 1]; // Light coming from above
                const dot = nx * lightDir[0] + ny * lightDir[1] + nz * lightDir[2];
                const lightIntensity = Math.max(0, dot);

                newData[i] = newData[i + 1] = newData[i + 2] = lightIntensity * 255;
                newData[i + 3] = 255;
            }
        }

        return new ImageData(newData, width, height);
    }

    private async loadImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    private getImageData(image: HTMLImageElement): ImageData {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;
        const tempCtx = tempCanvas.getContext('2d')!;
        tempCtx.drawImage(image, 0, 0, tempCanvas.width, tempCanvas.height);
        return tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    }

    private clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}



