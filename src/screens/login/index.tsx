import { LoginButton } from '@comp/auth';
import { Container } from '@comp/container';
import ThemeToggle from '@comp/theme';
import { Divider } from 'react-daisyui';
import { Helmet } from 'react-helmet';

export function Component() {
  return (
    <Container>
      <Helmet>
        <title>Welcome to SSchool</title>
      </Helmet>

      <div className='flex flex-row gap-4'>
        <ThemeToggle responsive={false} />
      </div>

      <Divider className='my-4' />
      <h1 className='app-title'>Login first to see the list of schools</h1>
      <LoginButton responsive={false} />
    </Container>
  );
}
