import {DB_PATH} from "../config";
import {Lesson} from "../types/lesson.types";
import {readFile, writeFile} from "fs/promises";
export const readLessons = async ():Promise<Lesson[]> => {
    try {
        const content = await readFile(DB_PATH, 'utf-8');
        return JSON.parse(content);
    } catch (err: any) {
        console.error(' Ошибка чтения:', err.message);
        return [];
    }
};
export const writeLessons = async (lessons:Lesson[]):Promise<void> => {
    await writeFile(DB_PATH, JSON.stringify(lessons, null, 2), 'utf-8');
}