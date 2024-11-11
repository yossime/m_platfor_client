import axios from "@/utils/axios";
import { WebSocketManager } from "@/utils/WebSocketManager";

class TripoClient {
    private webSocketManager: WebSocketManager;

    constructor() {
        this.webSocketManager = new WebSocketManager();
    }

    async generateFromText(prompt: string): Promise<string> {
        const response = await axios.post(`/modelGenerator/generate/text`,{prompt:  prompt }, {
            headers: {
                'Content-Type': 'application/json'
            },
            
        });
        if (response.request.status !== 200) {
          console.log(response.request.status)
          throw new Error(`Generation failed: ${response.statusText}`);
      }

        return response.data.taskId;
    }

    async generateFromImage(imageToken: string, imageFormat: string): Promise<string> {

      const response = await axios.post(
        `/modelGenerator/generate/image`,
        { imageToken, imageFormat },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.request.status !== 200) {
        console.log(response)
        
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



