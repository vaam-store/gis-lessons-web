import { Button, Card } from 'react-daisyui';
import { NavLink } from 'react-router-dom';

export interface LessonCardProps {
  slug_name: string;
  title: string;
}

export function LessonCard({ slug_name, title }: LessonCardProps) {
  return (
    <NavLink to={`/lessons/${slug_name}`}>
      <Card className='bg-secondary'>
        <Card.Body>
          <Card.Title tag='h2'>{title}</Card.Title>
          <Card.Actions className='justify-end'>
            <Button>View</Button>
          </Card.Actions>
        </Card.Body>
      </Card>
    </NavLink>
  );
}
