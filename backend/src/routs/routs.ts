import {
    deleteLessonId,
    getAllLessons,
    getLessonId,
    getLessonsToToday, getLessonsToWeek,
    patchLessonId,
    postLesson
} from "../controller/lesson.controller";
import express from 'express';
const router = express.Router();
router.get('/lessons', getAllLessons);
router.get('/lessons/:id', getLessonId )
router.get('/lessons/:weektype/:weekday/:group_name', getLessonsToToday)
router.get('/lessons/schedule/:group_name', getLessonsToWeek)
router.post('/lessons', postLesson)
router.patch('/lessons/:id',patchLessonId)
router.delete('/lessons/:id', deleteLessonId)

export default router;
