import { LessonCourseRender } from '@comp/lesson-course';
import { LessonSlide } from '@comp/lesson-slide';
import { Lesson } from '@openapi/requests';
import { Helmet } from 'react-helmet';

export interface SingleLessonContentProps {
  data: Lesson;
}

export default function SingleLessonContent({
  data: { title, slide_id, course_id, description, id },
}: SingleLessonContentProps) {
  return (
    <div className='container mx-auto px-4'>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Helmet>

      <LessonSlide slide_id={slide_id} slug_name_or_id={id} />
      <LessonCourseRender course_id={course_id} slug_name_or_id={id} />
    </div>
  );
}
