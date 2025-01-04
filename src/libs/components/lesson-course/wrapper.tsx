import { useGetLessonCourse } from '@openapi/queries';
import { LessonCourse } from '@openapi/requests';
import { JSX } from 'react';

export interface LessonCourseWrapperProps {
  course_id: string;
  slug_name_or_id: string;
  children: (course: LessonCourse) => JSX.Element;
}

export default function LessonCourseWrapper({
  course_id,
  children,
  slug_name_or_id,
}: LessonCourseWrapperProps) {
  const { data, isPending, isError } = useGetLessonCourse({
    path: {
      course_id,
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
