import {deleteLessonId, getAllLessons, getLessonId, patchLesson, postLesson} from "../controller/lesson.controller";
import express from 'express';
const router = express.Router();
router.get('/lessons', getAllLessons);
router.get('/lessons/:id', getLessonId )
router.post('/lessons', postLesson)
router.patch('/lessons/:id',patchLesson)
router.delete('/lessons/:id', deleteLessonId)

export default router;