import { Container } from '@comp/container';
import { Course } from '@openapi/requests';
import { Button } from 'react-daisyui';
import { ArrowRight } from 'react-feather';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { SingleCourseModuleList } from './single-course-module';

interface SingleCourseContentProps {
  data: Course;
}

export function SingleCourseContent({
  data: { name, description, id, longDescription },
}: SingleCourseContentProps) {
  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={name} />
        <meta property='og:description' content={description} />
        <meta property='og:type' content='website' />
      </Helmet>

      <Container className='flex flex-col gap-4 md:max-w-3xl'>
        <h1 className='big-title'>
          <span>{name}</span>
        </h1>

        <p>{longDescription}</p>

        <div className='py-4'>
          <NavLink to={`/lectures/${id}`}>
            {({ isPending, isTransitioning }) => (
              <Button
                color='primary'
                endIcon={<ArrowRight />}
                loading={isPending || isTransitioning}>
                {isPending || isTransitioning ? 'Loading...' : 'Start learning'}
              </Button>
            )}
          </NavLink>
        </div>

        <div>
          <SingleCourseModuleList courseId={id} />
        </div>
      </Container>
    </>
  );
}
