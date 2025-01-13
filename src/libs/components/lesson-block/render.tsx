import { LessonBlockWrapper } from '@comp/lesson-block';
import { LessonCourse } from '@comp/lesson-course';
import { LessonPresentation } from '@comp/lesson-presentation';

export interface LessonSlideRenderWrapperProps {
  slug_name_or_id: string;
}

export default function LessonBlockRender({
  slug_name_or_id,
}: LessonSlideRenderWrapperProps) {
  return (
    <LessonBlockWrapper slug_name_or_id={slug_name_or_id}>
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