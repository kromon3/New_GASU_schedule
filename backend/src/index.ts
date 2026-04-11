import express from 'express';
import { readFile } from 'fs/promises';
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

const readLessons = async () => {
    try {
        const content = await readFile(DB_PATH, 'utf-8');
        return JSON.parse(content);
    } catch (err) {
        console.error('❌ Ошибка чтения:', err.message);
        return [];
    }
};

app.get('/lessons', async (req, res) => {
    try {
        const lessons = await readLessons();
        res.json(lessons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер: http://localhost:${PORT}`);
});