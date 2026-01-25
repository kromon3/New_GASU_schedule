// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Schedule from "./components/shedule/Schedule.tsx";
import TodoList from "./components/ToDoList/TodoList.tsx";
import ScheduleToDay from "./components/sheduleToDay/ScheduleToDay.tsx";
import Subject from "./components/Subject/Subject.tsx";
import  GrupName  from './contexts/GrupName';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: "/schedule", element: <Schedule /> },
    { path: "/schedule_to_day", element: <ScheduleToDay /> },
    { path: "/subject", element: <Subject/> },
    {path: "/todolist", element: <TodoList/>}
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GrupName>
            <RouterProvider router={router} />
        </GrupName>
    </StrictMode>,
);