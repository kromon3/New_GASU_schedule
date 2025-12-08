// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Schedule from "./schedule/Schedule.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Schefule_to_day from "./schedule_to_day/Schefule_to_day.tsx";
import Subject from "./Subject/Subject.tsx";
import { GrupNameProvider } from './contexts/GrupNameContext'; // <-- исправленный путь

const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: "/schedule", element: <Schedule /> },
    { path: "/schedule_to_day", element: <Schefule_to_day /> },
    { path: "/subject", element: <Subject/> }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GrupNameProvider>
            <RouterProvider router={router} />
        </GrupNameProvider>
    </StrictMode>,
);