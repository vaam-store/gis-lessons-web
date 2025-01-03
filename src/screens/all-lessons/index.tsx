import { SchoolList } from '@comp/school-list';
import { useGetLessonMap } from '@openapi/queries';
import { Helmet } from 'react-helmet';

export default function AllSchools() {
  const { data, error, isPending } = useGetLessonMap();
  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className='container mx-auto px-4'>
      <Helmet>
        <title>All school!</title>
      </Helmet>

      <h1 className='mb-4 text-4xl font-extrabold md:mb-8'>All Schools</h1>

      <SchoolList data={data!} />
    </div>
  );
}
