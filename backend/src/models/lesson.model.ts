
import {Lesson, GroupName} from "../types/lesson.types";
import {pool} from "../../service/pool";
import type {Request, Response} from "express";
export const readLessons = async ():Promise<Lesson[]> => {
    try {
        const content = await pool.query('SELECT * FROM lesson')
        return content.rows;
    } catch (err: any) {
        console.error(' Ошибка чтения:', err.message);
        return [];
    }
};
export const readLessonsGroup = async ():Promise<GroupName[]> => {
    try{
        const content = await pool.query('SELECT DISTINCT group_name FROM lesson;')
        return content.rows;
    }
    catch (err:any){
        console.error(' Ошибка чтения:', err.message);
        return [];
    }
}
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

export const createLesson = async (req: Request, res: Response): Promise<Lesson> => {
    try {
        const newLesson = {
            id: Math.floor(Date.now() / 1000),
            subject: req.body.subject,
            time_start: req.body.time_start,
            time_end: req.body.time_end,
            weekday: req.body.weekday,
            teacher: req.body.teacher,
            type_name: req.body.type,
            group_name: req.body.group_name,
            weektype: req.body.weektype,
            auditorium: req.body.auditorium,
        };

        const query = `
            INSERT INTO lesson
            (id, subject, time_start, time_end, weekday, teacher,
             group_name, weektype, auditorium, type_name)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING *
        `;

        const values = [
            newLesson.id,
            newLesson.subject,
            newLesson.time_start,
            newLesson.time_end,
            newLesson.weekday,
            newLesson.teacher,
            newLesson.group_name,
            newLesson.weektype,
            newLesson.auditorium,
            newLesson.type_name
        ];

        const result = await pool.query(query, values);
        return result.rows[0] as Lesson; // Возвращаем первый ряд как Lesson
    }
    catch (err: any) {
        console.error('Error creating lesson:', err);
        throw new Error(`Failed to create lesson: ${err.message}`);
    }
}
export const updateLesson = async (req: Request, res: Response): Promise<Lesson> => {
        const id_of_lessons = req.params.id;
        const map = new Map();
        const newLesson = {
            id: Math.floor(Date.now() / 1000),
            subject: req.body.subject,
            time_start: req.body.time_start,
            time_end: req.body.time_end,
            weekday: req.body.weekday,
            teacher: req.body.teacher,
            type_name: req.body.type,
            group_name: req.body.group_name,
            weektype: req.body.weektype,
            auditorium: req.body.auditorium,
        };

        const allowedFields = [
            'subject', 'time_start', 'time_end', 'weekday',
            'teacher', 'type_name', 'group_name', 'weektype', 'auditorium'
        ];

        allowedFields.forEach(field => {
            const value = newLesson[field];
            if (value != null) {
                map.set(field, value);
            }
        });

        if (map.size > 0) {
            const setClause = Array.from(map.entries())
                .map(([key, val], idx) => `${key} = $${idx + 1}`)
                .join(', ');

            const values = Array.from(map.values());
            const query = `UPDATE lesson SET ${setClause} WHERE id = $${values.length + 1}`;
            values.push(id_of_lessons);

            const result = await pool.query(query, values);
            res.status(200).json(result.rows[0]);
        } else {
            res.status(400).json({ message: "No valid fields to update" });
        }
}

export const deleteLesson = async (req: Request, res: Response): Promise<any> => {
    const id_of_lessons = req.params.id;
    const result = await pool.query(
        'DELETE FROM lesson WHERE id = $1',
        [id_of_lessons]
    );
    if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Lesson not found' });
    }
    return res.status(204).send();
}