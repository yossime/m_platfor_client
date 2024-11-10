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
    // this.disconnect();

    const wsUrl = "ws://localhost:3500";
    this.socket = new WebSocket(`${wsUrl}/task/watch/${taskId}`);
    console.log(this.socket);
    this.socket.onopen = () => {
      console.log("Connected to WebSocket server");
      this.socket?.send(JSON.stringify({ type: "SUBSCRIBE_TASK", taskId }));
    };

    this.socket.onmessage = (event) => {
      const update = JSON.parse(event.data);

      if (update.event === "update") {
        console.log("event",update)
        callbacks.onProgress?.(update.data.progress);
        callbacks.onStatusChange?.(update.data.status);
      } else if (update.event === "finalized") {
        callbacks.onComplete?.(update.data);
        this.disconnect();
      }
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
