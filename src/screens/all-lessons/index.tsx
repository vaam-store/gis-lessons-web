import { SchoolList } from '@comp/school-list';
import { useGetLessons } from '@openapi/queries';
import { Helmet } from 'react-helmet';

export default function AllSchools() {
  const { data, error, isPending } = useGetLessons();
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

      <h1 className='app-title'>All Schools</h1>

      <SchoolList data={data!} />
    </div>
  );
}
