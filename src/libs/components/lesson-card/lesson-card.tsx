import { Course } from '@openapi/requests';
import { Button } from 'react-daisyui';
import { ArrowRight, Star } from 'react-feather';
import { NavLink } from 'react-router-dom';

export interface LessonCardProps {
  course: Course;
}

export function LessonCard({ course }: LessonCardProps) {
  return (
    <div className='card outline outline-1'>
      <div className='card-body'>
        <div className='card-title'>{course.name}</div>
        <p>{course.description}</p>
        <div className='card-actions'>
          <Button shape='circle' color='ghost'>
            <Star />
          </Button>

          <NavLink to={`/courses/${course.id}`}>
            {({ isPending, isTransitioning }) => (
              <Button
                color='ghost'
                endIcon={<ArrowRight />}
                loading={isPending || isTransitioning}>
                {isPending || isTransitioning ? 'Loading...' : 'View course'}
              </Button>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
