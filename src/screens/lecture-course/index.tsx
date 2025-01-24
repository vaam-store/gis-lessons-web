import { CourseLayout } from '@comp/lecture-course';
import { useGetCourse } from '@openapi/queries';
import { lazy } from 'react';
import { Loading } from 'react-daisyui';
import { useParams } from 'react-router-dom';

const ErrorPage = lazy(() => import('@scr/error'));

export function Component() {
  const queryParam = useParams();
  const { error, data, isPending } = useGetCourse({
    path: {
      courseId: queryParam.courseId!,
    },
  });

  if (isPending) {
    return <Loading />;
  }

  if (error || !data) {
    return <ErrorPage />;
  }

  return (
    <>
      <CourseLayout data={data} />
    </>
  );
}
