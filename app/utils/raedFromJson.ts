import * as fs from 'fs';

export interface UserData {
    name: string;
    age: number;
    email: string;
}

export const readJsonFile = (filePath: string): UserData | null => {
    try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const data: UserData = JSON.parse(jsonData);
        return data;
    } catch (error) {
        console.error("Error reading or parsing the file:", error);
        return null;
    }
};
