import { Container } from '@comp/container';
import { Lesson } from '@openapi/requests';
import { Helmet } from 'react-helmet';
import { LessonSlide } from '@comp/lesson-block';

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

      <LessonSlide slug_name_or_id={id} />
    </Container>
  );
}