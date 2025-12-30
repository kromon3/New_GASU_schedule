// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Schedule from "./schedule/Schedule.tsx";
import TodoList from "./todolist/TodoList.tsx";
import Schefule_to_day from "./schedule_to_day/Schefule_to_day.tsx";
import Subject from "./Subject/Subject.tsx";
import { GrupNameProvider } from './contexts/GrupNameContext';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: "/schedule", element: <Schedule /> },
    { path: "/schedule_to_day", element: <Schefule_to_day /> },
    { path: "/subject", element: <Subject/> },
    {path: "/todolist", element: <TodoList/>}
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GrupNameProvider>
            <RouterProvider router={router} />
        </GrupNameProvider>
    </StrictMode>,
);