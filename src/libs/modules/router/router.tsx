import { courseLoader } from '@/services/lesson';
import { ProtectedRoute } from '@comp/auth';
import { PublicRoute } from '@comp/auth/public.tsx';
import { queryClient } from '@mod/query';
import { lazy } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
const ErrorPage = lazy(() => import('@scr/error'));

// eslint-disable-next-line react-refresh/only-export-components
const LoginPage = lazy(() =>
  import('@scr/login').then((mod) => ({ default: mod.Component })),
);

// eslint-disable-next-line react-refresh/only-export-components
const RootPage = lazy(() =>
  import('@scr/root').then((mod) => ({ default: mod.Component })),
);

export const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/courses',
        element: <RootPage />,
        children: [
          {
            path: '',
            lazy: () => import('@scr/all-lessons'),
          },
          {
            path: ':courseId',
            lazy: () => import('@scr/single-course'),
            element: (
              <div>
                <p>Single course</p>
              </div>
            ),
          },
        ],
      },
      {
        path: '/lectures/:courseId',
        lazy: () => import('@scr/lecture-course'),
        loader: courseLoader(queryClient),
        errorElement: <ErrorPage />,
        children: [
          {
            path: '',
            lazy: () => import('@scr/lecture-presentation'),
          },
          {
            path: 'modules/:moduleId',
            children: [
              {
                path: '',
                lazy: () => import('@scr/lecture-module'),
              },
              {
                path: 'lessons',
                children: [
                  {
                    path: '',
                    element: <Navigate to='..' />,
                  },
                  {
                    path: ':lessonId',
                    lazy: () => import('@scr/lecture-lesson'),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '/admin',
        lazy: () => import('@scr/admin-root'),
        children: [
          {
            path: '',
            lazy: () => import('@scr/admin-dashboard'),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '*',
    Component: () => <Navigate to='/courses' />,
  },
]);
