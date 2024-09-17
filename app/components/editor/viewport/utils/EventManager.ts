import { ISceneObject } from "../../types";



export class EventManager {
    private static instance: EventManager;
    private static selectedObject: ISceneObject | null = null;

    private constructor() { }

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
        if (EventManager.selectedObject) {
            EventManager.selectedObject.isSelected(false);
        }
        EventManager.selectedObject = obj;
        EventManager.selectedObject.isSelected(true);

    }
}