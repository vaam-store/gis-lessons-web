import { Container } from '@comp/container';
import { SchoolList } from '@comp/school-list';
import { useListCourses } from '@openapi/queries';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

export function Component() {
  const [offset] = useState(0);
  const { data, error, isPending } = useListCourses({
    query: {
      limit: 10,
      offset,
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error</div>;
  }

  return (
    <Container>
      <Helmet>
        <title>All school!</title>
      </Helmet>

      <h1 className='app-title'>All Schools</h1>

      <SchoolList data={data} />
    </Container>
  );
}
