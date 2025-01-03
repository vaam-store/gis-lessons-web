import { Helmet } from 'react-helmet';

export default function ErrorPage() {
  return (
    <div>
      <Helmet>
        <title>Error!</title>
      </Helmet>

      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
}
