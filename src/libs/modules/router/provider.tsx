import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export default function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
