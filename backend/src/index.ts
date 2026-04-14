import express, { Request, Response } from 'express';
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
    } catch (err) {
        console.error(' Ошибка чтения:', err.message);
        return [];
    }
};

app.get('/lessons', async (req: Request, res: Response) => {
    try {
        const lessons = await readLessons();
        res.json(lessons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/lessons/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const lesson = await readLessons();
        res.json(lesson.find(u => u.id === id));
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.post('/lessons', async (req: Request, res: Response) => {
    try{
        const lesson = await readLessons();
        const id = Date.now();
        const newLesson = {
            id: id.toString(),
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
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})
app.delete('/lessons/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const lesson = await readLessons();
        const lessonExists = lesson.some(u => u.id === id);

        if (!lessonExists) {
            res.status(404).json({ message: `Урок с ID ${id} не найден` });
            return;
        }
        const updateLesson = lesson.filter(u => u.id !== id)
        await writeFile(DB_PATH, JSON.stringify(updateLesson, null, 2), 'utf-8');
        res.status(201).send;
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

})

app.listen(PORT, () => {
    console.log(`🚀 Сервер: http://localhost:${PORT}`);
});