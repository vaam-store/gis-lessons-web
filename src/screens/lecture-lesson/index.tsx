import { SingleLessonContent } from '@comp/single-lesson';
import { useGetLesson } from '@openapi/queries';
import { lazy } from 'react';
import { Loading } from 'react-daisyui';
import { useParams } from 'react-router-dom';

const ErrorPage = lazy(() => import('@scr/error'));

export function Component() {
  const queryParam = useParams();
  const { error, data, isPending } = useGetLesson({
    path: {
      lessonId: queryParam.lessonId!,
    },
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return <SingleLessonContent data={data!} />;
}
