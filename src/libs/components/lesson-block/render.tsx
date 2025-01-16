import { LessonBlockWrapper } from '@comp/lesson-block';
import { LessonCourse } from '@comp/lesson-course';
import { LessonPresentation } from '@comp/lesson-presentation';

export interface LessonSlideRenderWrapperProps {
  lessonId: string;
}

export function LessonBlockRender({
  lessonId,
}: LessonSlideRenderWrapperProps) {
  return (
    <LessonBlockWrapper lessonId={lessonId}>
      {({ blocks }) => (
        <>
          {blocks.map((block) => {
            switch (block.type) {
              case 'slide':
                return <LessonPresentation key={block.id} block={block} />;
              case 'content':
                return <LessonCourse key={block.id} block={block} />;
            }
          })}
        </>
      )}
    </LessonBlockWrapper>
  );
}
