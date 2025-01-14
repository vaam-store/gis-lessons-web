import { CoreCourse } from '@openapi/requests';
import { Button, Card } from 'react-daisyui';
import { NavLink } from 'react-router-dom';

export interface LessonCardProps {
  course: CoreCourse;
}

export function LessonCard({ course }: LessonCardProps) {
  return (
    <NavLink to={`/lessons/${course.slug}`}>
      <Card className='bg-secondary'>
        <Card.Body>
          <Card.Title tag='h2'>{course.name}</Card.Title>
          <p>{course.description}</p>
          <Card.Actions className='justify-end'>
            <Button>View</Button>
          </Card.Actions>
        </Card.Body>
      </Card>
    </NavLink>
  );
}