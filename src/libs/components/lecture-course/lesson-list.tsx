import { useListLesson } from '@openapi/queries';
import { Lesson } from '@openapi/requests';
import ErrorPage from '@scr/error';
import { Loading } from 'react-daisyui';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useId } from 'react';

export interface LessonListProps {
  moduleId: string;
  courseId: string;
}

export function LessonList({ moduleId, courseId }: LessonListProps) {
  const { error, data, isPending } = useListLesson({
    query: {
      courseId,
      moduleId,
      limit: 1000,
      offset: 0,
    },
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {data!.items.map((lesson) => (
        <LessonListItem
          key={lesson.id}
          lesson={lesson}
          courseId={courseId}
          moduleId={moduleId}
        />
      ))}
    </>
  );
}

export interface LessonListItemProps {
  lesson: Lesson;
  courseId: string;
  moduleId: string;
}

export function LessonListItem({
  lesson,
  moduleId,
  courseId,
}: LessonListItemProps) {
  const id = useId();
  return (
    <NavLink
      to={`/lectures/${courseId}/modules/${moduleId}/lessons/${lesson.id}`}>
      {({ isActive }) => (
        <div
          className={twMerge('text-ellipsis text-nowrap form-control py-2', [
            isActive ? 'text-primary' : 'text-base-content',
          ])}>
          <label className='label cursor-pointer'>
            <span className='label-text'>{lesson.title}</span>
            <input
              type='radio'
              name={id}
              className='radio checked:bg-success'
            />
          </label>
        </div>
      )}
    </NavLink>
  );
}
