import { useGetModule } from '@openapi/queries';
import { lazy } from 'react';
import { Loading } from 'react-daisyui';
import { useParams } from 'react-router-dom';

const ErrorPage = lazy(() => import('@scr/error'));

export function Component() {
  const queryParam = useParams();
  const { error, isPending } = useGetModule({
    path: {
      moduleId: queryParam.moduleId!,
    },
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  // TODO: Implement
  return <>Module</>;
}
