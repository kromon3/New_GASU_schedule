// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Schedule from "./page/shedule/Schedule.tsx";
import TodoList from "./page/ToDoList/TodoList.tsx";
import ScheduleToDay from "./page/sheduleToDay/ScheduleToDay.tsx";
import Subject from "./page/Subject/Subject.tsx";
import  GrupName  from './contexts/GrupName';
import { ThemeProvider } from './contexts/Background.tsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./page/NotFound/NotFound.tsx";
import CreateLesson from "./page/CreateLesson/createLesson.tsx";
const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: "/schedule", element: <Schedule /> },
    { path: "/schedule_to_day", element: <ScheduleToDay /> },
    { path: "/subject", element: <Subject/> },
    {path: "/todolist", element: <TodoList/>},
    {path: "/create",element:<CreateLesson/>},
    {path: "*", element: <NotFound/>}
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GrupName>
            <ThemeProvider>
            <RouterProvider router={router} />
            </ThemeProvider>
        </GrupName>
    </StrictMode>,
);