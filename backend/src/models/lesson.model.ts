import {DB_PATH} from "../config";
import {Lesson} from "../types/lesson.types";
import {readFile, writeFile} from "fs/promises";
import {pool} from "../../service/pool";
export const readLessons = async ():Promise<Lesson[]> => {
    try {
        const content = await pool.query('SELECT * FROM lesson')
        return content.rows;
    } catch (err: any) {
        console.error(' Ошибка чтения:', err.message);
        return [];
    }
};
export const readLessonsToToday = async (
    weektype: string,
    weekday: string,
    group_name: string
): Promise<Lesson[]> => {
    try {
        const content = await pool.query(
            `SELECT * FROM lesson 
             WHERE TRIM(weektype) = $1 
               AND TRIM(weekday) = $2 
               AND TRIM(group_name) = $3`,
            [weektype, weekday, group_name]
        );
        return content.rows;
    } catch (err: any) {
        console.error('Ошибка чтения:', err.message);
        return [];
    }
};
export const readLessonsToWeek = async (
    group_name: string
): Promise<Lesson[]> => {
    try {
        const content = await pool.query(
            `SELECT * FROM lesson 
             WHERE 
               TRIM(group_name) = $1`,
            [group_name]
        );
        return content.rows;
    } catch (err: any) {
        console.error('Ошибка чтения:', err.message);
        return [];
    }
};
export const writeLessons = async (lessons:Lesson[]):Promise<void> => {
    await writeFile(DB_PATH, JSON.stringify(lessons, null, 2), 'utf-8');
}