import { lessonLoader } from '@/services/lesson';
import { queryClient } from '@mod/query';
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
const RootScreen = lazy(() => import('@scr/root'));
// eslint-disable-next-line react-refresh/only-export-components
const ErrorPage = lazy(() => import('@scr/error'));

// eslint-disable-next-line react-refresh/only-export-components
const LessonListScreen = lazy(() => import('src/screens/all-lessons'));
// eslint-disable-next-line react-refresh/only-export-components
const SingleLesson = lazy(() => import('src/screens/single-lesson'));

export const router = createBrowserRouter([
  {
    element: <RootScreen />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/lessons',
        children: [
          {
            path: '',
            element: <LessonListScreen />,
            errorElement: <ErrorPage />,
          },
          {
            path: ':slug_name',
            element: <SingleLesson />,
            loader: lessonLoader(queryClient),
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    Component: () => <Navigate to='/lessons' />,
  },
]);
