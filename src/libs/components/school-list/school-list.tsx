import { LessonCard } from '@comp/lesson-card';
import { GetLessonMapResponse } from '@openapi/requests';

export interface SchoolListProps {
  data: GetLessonMapResponse;
}

export function SchoolList({ data }: SchoolListProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {Object.entries(data).map(([slug, { title }]) => (
        <LessonCard slug_name={slug} title={title} />
      ))}
    </div>
  );
}
