export class WebSocketManager {
  private socket: WebSocket | null = null;

  constructor() {}

  connect(
    taskId: string,
    callbacks: {
      onProgress?: (progress: number) => void;
      onStatusChange?: (status: string) => void;
      onComplete?: (task: any) => void;
      onError?: (error: Error) => void;
    }
  ) {
    const wsUrl = "ws://server-cloud-run-service-kruirvrv6a-uc.a.run.app";
    this.socket = new WebSocket(`${wsUrl}/task/watch/${taskId}`);
    this.socket.onopen = () => {
      this.socket?.send(
        JSON.stringify({ type: "SUBSCRIBE_TASK", taskId: taskId })
      );
    };

    this.socket.onmessage = (event) => {
      const update = JSON.parse(event.data);


      if (update.status === "success") {
        callbacks.onComplete?.(update.result);
        this.disconnect();
      }

      // if (update.event === "update") {
      //   callbacks.onProgress?.(update.data.progress);
      //   callbacks.onStatusChange?.(update.data.status);
      // } else if (update.event === "finalized") {
      //   callbacks.onComplete?.(update.data);
      //   this.disconnect();
      // }
    };

    this.socket.onerror = (error) => {
      callbacks.onError?.(error as unknown as Error);
      this.disconnect();
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}
