import LessonCourseWrapper from '@comp/lesson-course/wrapper.tsx';
import { MarkdownToHtmlWrapper } from '@mod/converters';

export interface LessonCourseRenderWrapperProps {
  course_id: string;
  slug_name_or_id: string;
}

export default function LessonCourseRender({
  course_id,
  slug_name_or_id,
}: LessonCourseRenderWrapperProps) {
  return (
    <LessonCourseWrapper
      course_id={course_id}
      slug_name_or_id={slug_name_or_id}>
      {({ content }) => (
        <MarkdownToHtmlWrapper content={content}>
          {(html) => (
            <article
              className='prose prose-lg mx-auto mt-4 lg:prose-2xl md:mt-8'
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </MarkdownToHtmlWrapper>
      )}
    </LessonCourseWrapper>
  );
}
