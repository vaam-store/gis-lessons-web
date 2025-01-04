import { LessonCard } from '@comp/lesson-card';
import { GetLessonsResponse } from '@openapi/requests';

export interface SchoolListProps {
  data: GetLessonsResponse;
}

export function SchoolList({ data }: SchoolListProps) {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {data.map((lesson) => (
        <LessonCard
          key={lesson.id}
          slug_name={lesson.slug_name}
          title={lesson.title}
          description={lesson.description}
        />
      ))}
    </div>
  );
}
