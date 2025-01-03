import { SingleLessonContent } from '@comp/single-lesson';
import { MarkdownMatterWrapper } from '@mod/converters';
import { useGetLessonCourse, useGetLessonSlide } from '@openapi/queries';
import { lazy } from 'react';
import { Loading } from 'react-daisyui';
import { useParams } from 'react-router-dom';

const ErrorPage = lazy(() => import('@scr/error'));

export default function SingleSchoolScreen() {
  const queryParam = useParams();
  const { error, data, isPending } = useGetLessonSlide({
    path: {
      slug_name: queryParam.slug_name!,
    },
  });
  const {
    error: errorCourse,
    data: dataCourse,
    isPending: pendingCourse,
  } = useGetLessonCourse({
    path: {
      slug_name: queryParam.slug_name!,
    },
  });

  if (isPending || pendingCourse) {
    return <Loading />;
  }

  if (error || errorCourse) {
    return <ErrorPage />;
  }

  return (
    <MarkdownMatterWrapper content={data || ''}>
      {(data_content) => (
        <SingleLessonContent
          slide={data_content?.body || ''}
          title={data_content?.attributes?.title || ''}
          course={dataCourse || ''}
        />
      )}
    </MarkdownMatterWrapper>
  );
}
