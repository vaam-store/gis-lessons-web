import { LessonCard } from '@comp/lesson-card';
import { PageCourse } from '@openapi/requests';

export interface SchoolListProps {
  data: PageCourse;
}

export function SchoolList({ data: { items } }: SchoolListProps) {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {items.map((course) => (
        <LessonCard key={course.id} course={course} />
      ))}
    </div>
  );
}
