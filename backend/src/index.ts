import express from 'express';
import type { Request, Response } from 'express';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
const PORT = 8000;
app.use(cors());
const DB_PATH = path.resolve(__dirname, '../service/db.json');
interface Lesson {
    id: string;
    subject: string;
    time:{
        start: string;
        end: string;
        weekday: string;
    }
    teacher: string;
    type: string;
    group: string;
    weekType: string;
    auditorium: string;
}

const readLessons = async ():Promise<Lesson[]> => {
    try {
        const content = await readFile(DB_PATH, 'utf-8');
        return JSON.parse(content);
    } catch (err: any) {
        console.error(' Ошибка чтения:', err.message);
        return [];
    }
};

app.get('/lessons', async (req: Request, res: Response) => {
    try {
        const lessons = await readLessons();
        res.status(200).json(lessons);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/lessons/:id', async (req: Request, res: Response) => {
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
})

app.post('/lessons', async (req: Request, res: Response) => {
    try{
        const lesson = await readLessons();
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
        lesson.push(newLesson);
        await writeFile(DB_PATH, JSON.stringify(lesson, null, 2), 'utf-8');
        res.status(201).json(newLesson);
    }
    catch (err: any) {
        res.status(500).json({ message: err.message });
    }
})
app.patch('/lessons/:id', async (req: Request, res: Response) => {
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
            await writeFile(DB_PATH, JSON.stringify(lessons, null, 2), 'utf-8');
            return res.status(200).json(updatedLesson);
        }
    }
    catch (err: any) {
        res.status(500).json({ message: err.message });
    }
})

app.delete('/lessons/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const lessons = await readLessons();
        const lessonExists = lessons.some(u => u.id === id);
        if (!lessonExists) {
            res.status(404).json({ message: `Урок с ID ${id} не найден` });
            return;
        }
        const updateLessons = lessons.filter(u => u.id !== id)
        await writeFile(DB_PATH, JSON.stringify(updateLessons, null, 2), 'utf-8');
        return res.status(204).send();
    }
    catch (err: any) {
        res.status(500).json({ message: err.message });
    }

})

app.listen(PORT, () => {
    console.log(`🚀 Сервер: http://localhost:${PORT}`);
});