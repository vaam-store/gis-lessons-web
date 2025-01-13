import { MarkdownToHtmlWrapper } from '@mod/converters';
import { CoreLessonBlock } from '@openapi/requests';

interface LessonCourseProps {
  block: Extract<CoreLessonBlock, { type: 'content' }>;
}

export default function LessonCourse({ block }: LessonCourseProps) {
  return (
    <MarkdownToHtmlWrapper content={block.content}>
      {(html) => (
        <article
          className='prose prose-lg mx-auto mt-4 lg:prose-2xl md:mt-8'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </MarkdownToHtmlWrapper>
  );
}