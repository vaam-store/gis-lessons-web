import { Container } from '@comp/container';
import { LessonBlockRender } from '@comp/lesson-block';
import { Lesson } from '@openapi/requests';
import { Helmet } from 'react-helmet';

export interface SingleLessonContentProps {
  data: Lesson;
}

export default function SingleLessonContent({
  data: { title, description, id },
}: SingleLessonContentProps) {
  return (
    <Container>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Helmet>

      <LessonBlockRender lessonId={id} />
    </Container>
  );
}
