import { useGetLessonSlide } from '@openapi/queries';
import { LessonSlide } from '@openapi/requests';
import { JSX } from 'react';

export interface LessonSlideWrapperProps {
  slide_id: string;
  slug_name_or_id: string;
  children: (slide: LessonSlide) => JSX.Element;
}

export default function LessonSlideWrapper({
  slide_id,
  children,
  slug_name_or_id,
}: LessonSlideWrapperProps) {
  const { data, isPending, isError } = useGetLessonSlide({
    path: {
      slide_id,
      slug_name_or_id,
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return children(data!);
}
