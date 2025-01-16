import { LessonList } from '@comp/lecture-course/lesson-list.tsx';
import { useListModules } from '@openapi/queries';
import { Module } from '@openapi/requests';
import ErrorPage from '@scr/error';
import { Loading } from 'react-daisyui';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export interface ModuleListProps {
  courseId: string;
}

export function ModuleList({ courseId }: ModuleListProps) {
  const { error, data, isPending } = useListModules({
    query: {
      courseId: courseId,
      limit: 5,
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
      {data!.items.map((module) => (
        <CourseModuleListItem
          key={module.id}
          module={module}
          courseId={courseId}
        />
      ))}
    </>
  );
}

export interface CourseModuleListItemProps {
  module: Module;
  courseId: string;
}

export function CourseModuleListItem({
  module,
  courseId,
}: CourseModuleListItemProps) {
  return (
    <>
      <NavLink to={`/lectures/${courseId}/modules/${module.id}`}>
        {({ isActive }) => (
          <div
            className={twMerge('text-ellipsis text-nowrap font-bold py-2 md:py-4', [
              isActive ? 'text-primary' : 'text-base-content',
            ])}>
            {module.title}
          </div>
        )}
      </NavLink>
      
      <LessonList key={module.id} moduleId={module.id} courseId={courseId} />
    </>
  );
}
