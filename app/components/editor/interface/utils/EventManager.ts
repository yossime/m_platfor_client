import { ISceneObject } from "../types";



export class EventManager {
    private static instance: EventManager;
    private static selectedObject: ISceneObject | null = null;

    private constructor() {}

    public static getInstance(): EventManager {
        if (!EventManager.instance) {
            EventManager.instance = new EventManager();
        }
        return EventManager.instance;
    }

    public getSelectedObject(): ISceneObject | null {
        return EventManager.selectedObject;
    }

    public setSelectedObject(obj: ISceneObject): void {
        console.log('Selected object changed:', obj);
        EventManager.selectedObject = obj;
    }
}