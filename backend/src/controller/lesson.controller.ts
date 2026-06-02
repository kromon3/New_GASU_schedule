import type { Request, Response } from "express";
import {
    readLessons,
    readLessonsToToday,
    readLessonsToWeek,
    readLessonsGroup,
    updateLesson,
    createLesson,
    deleteLesson
} from "../models/lesson.model";

export const getAllLessons = async (req: Request, res: Response) => {
    try {
        const lessons = await readLessons();
        res.status(200).json(lessons);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export const getLessonsToToday = async (req: Request, res: Response) => {
    try {
        const { weektype, weekday, group_name } = req.params;
        const lessons = await readLessonsToToday(
            weektype as string,
            weekday as string,
            group_name as string
        );
        res.status(200).json(lessons);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getLessonsGroup = async (req: Request, res: Response) => {
    try {
        const lessons = await readLessonsGroup();
        res.status(200).json(lessons);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export const getLessonsToWeek = async (req: Request, res: Response) => {
    try {
        const { group_name } = req.params;
        const lessons = await readLessonsToWeek(group_name);
        res.status(200).json(lessons);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getLessonId = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const lessons = await readLessons();
        const findLesson = lessons.find(lesson => lesson.id === id);
        if (!findLesson) {
            return res.status(404).json({ message: `Урок с ID ${id} не найден` });
        }
        res.status(200).json(findLesson);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export const postLesson = async (req: Request, res: Response) => {
    try {
        const lesson = await createLesson(req);
        res.status(201).json(lesson);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const patchLessonId = async (req: Request, res: Response) => {
    try {
        const result = await updateLesson(req);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteLessonId = async (req: Request, res: Response) => {
    try {
        await deleteLesson(req, res);
        res.status(204).send();
    } catch (err: any) {
        if (err.message === 'Lesson not found') {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
}