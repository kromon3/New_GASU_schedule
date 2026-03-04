// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ScheduleWeek from './pages/Schedule/ScheduleWeek';
import TodoList from './pages/ToDoList/TodoList';
import TodaySchedule from './pages/TodaySchedule/TodaySchedule';
import Subject from './pages/Subject/Subject';
import { ThemeProvider } from './contexts/Background.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import CreateLesson from './pages/CreateLesson/CreateLesson';
import { CookiesProvider } from 'react-cookie';
const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/schedule', element: <ScheduleWeek /> },
  { path: '/today', element: <TodaySchedule /> },
  { path: '/subject', element: <Subject /> },
  { path: '/todolist', element: <TodoList /> },
  { path: '/create', element: <CreateLesson /> },
  { path: '*', element: <NotFound /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </CookiesProvider>
  </StrictMode>
);
