import { MarkdownToHtmlWrapper } from '@mod/converters';
import { LessonBlock } from '@openapi/requests';

interface LessonCourseProps {
  block: LessonBlock;
}

export default function LessonCourse({ block: { data } }: LessonCourseProps) {
  return (
    <MarkdownToHtmlWrapper content={data.content as string}>
      {(html) => (
        <article
          className='prose prose-lg mx-auto mt-4 lg:prose-2xl md:mt-8'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </MarkdownToHtmlWrapper>
  );
}