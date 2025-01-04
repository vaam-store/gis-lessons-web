import Display from '@comp/display';
import LessonSlideWrapper from '@comp/lesson-slide/wrapper.tsx';

export interface LessonSlideRenderWrapperProps {
  slide_id: string;
  slug_name_or_id: string;
}

export default function LessonSlideRender({
  slide_id,
  slug_name_or_id,
}: LessonSlideRenderWrapperProps) {
  return (
    <LessonSlideWrapper slide_id={slide_id} slug_name_or_id={slug_name_or_id}>
      {({ content }) => <Display data={content} />}
    </LessonSlideWrapper>
  );
}
