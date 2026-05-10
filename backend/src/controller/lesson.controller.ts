import type {Request, Response} from "express";
import {readLessons, writeLessons} from "../models/lesson.model";

export const getAllLessons = async (req: Request, res: Response) => {
    try {
        const lessons = await readLessons();
        res.status(200).json(lessons);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}
export const getLessonId = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const lessons = await readLessons();
        const findLesson = lessons.find(lesson => lesson.id === id);
        if (!findLesson) {
            return res.status(404).json({ message: `Урок с ID ${id} не найден` });
        }
        res.status(200).json(findLesson);
    }catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}
export const postLesson = async (req: Request, res: Response) => {
    try{
        const lessons = await readLessons();
        const newLesson = {
            id: Date.now().toString(),
            subject: req.body.subject,
            time:{
                start: req.body.time.start,
                end: req.body.time.end,
                weekday: req.body.time.weekday,
            },
            teacher:req.body.teacher,
            type:req.body.type,
            group:req.body.group,
            weekType:req.body.weekType,
            auditorium:req.body.auditorium,
        };
        lessons.push(newLesson);
        await writeLessons(lessons);
        res.status(201).json(newLesson);
    }
    catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}
export const patchLessonId  = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const lessons = await readLessons();
        const lessonIndex = lessons.findIndex(u => u.id === id);
        if ((lessonIndex === -1)){
            return res.status(404).json({ message: `Урок с ID ${id} не найден` });
        }
        else {

            const foundLesson = lessons[lessonIndex];
            const updatedLesson = {
                ...foundLesson,
                ...req.body,
                time: {
                    ...foundLesson.time,
                    ...(req.body.time || {})
                }
            };

            lessons[lessonIndex] = updatedLesson;
            await writeLessons(lessons);
            return res.status(200).json(updatedLesson);
        }
    }
    catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}
export const deleteLessonId  = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const lessons = await readLessons();
        const lessonExists = lessons.some(u => u.id === id);
        if (!lessonExists) {
            res.status(404).json({ message: `Урок с ID ${id} не найден` });
            return;
        }
        const updateLessons = lessons.filter(u => u.id !== id)
        await writeLessons(updateLessons);
        return res.status(204).send();
    }
    catch (err: any) {
        res.status(500).json({ message: err.message });
    }

}