import axios from "@/utils/axios";
import { WebSocketManager } from "@/utils/WebSocketManager";

class TripoClient {
    private webSocketManager: WebSocketManager;

    constructor() {
        this.webSocketManager = new WebSocketManager();
    }

    async generateFromText(prompt: string): Promise<string> {
        const response = await axios.post(`/modelGenerator/generate/text`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        if (response.status !== 201) {
            throw new Error(`Generation failed: ${response.statusText}`);
        }

        return response.data.taskId;
    }

    async generateFromImage(imageToken: string, imageFormat: string): Promise<string> {
          console.log("imageee",imageFormat,imageToken)
        const response = await axios.post(
          `/modelGenerator/generate/image`, 
          JSON.stringify({ imageToken, imageFormat }), 
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      
        if (response.status !== 201) {
          throw new Error(`Generation failed: ${response.statusText}`);
        }
      
        return response.data.taskId;
      }

    async uploadImage(imageFile: File): Promise<any> {
        const formData = new FormData();
        formData.append('file', imageFile);
        const response = await axios.post('/modelGenerator/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

        if (!response.status) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        return await response.data;
    }

    watchTask(taskId: string, callbacks: {
        onProgress?: (progress: number) => void,
        onStatusChange?: (status: string) => void,
        onComplete?: (task: any) => void,
        onError?: (error: Error) => void,
    }) {
        this.webSocketManager.connect(taskId, callbacks);
    }
}

export default TripoClient;
