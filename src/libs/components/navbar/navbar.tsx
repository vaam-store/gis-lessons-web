import { LoginButton } from '@comp/auth';
import { Container } from '@comp/container';
import ThemeToggle from '@comp/theme';
import { Navbar } from 'react-daisyui';
import { NavLink } from 'react-router-dom';
import icon from '/icon.svg';

export function AppNavBar() {
  return (
    <div className='sticky top-0 z-40 mb-4 bg-base-300'>
      <Container className='py-0'>
        <Navbar>
          <Navbar.Start className='flex gap-4'>
            <NavLink to='/' className='flex flex-row items-center gap-2'>
              <img src={icon} className='w-8' alt='logo' />
              <span className='text-xl font-extrabold uppercase' color='ghost'>
                GIS Lessons
              </span>
            </NavLink>
          </Navbar.Start>

          <Navbar.End className='flex gap-4'>
            <ThemeToggle />
            <LoginButton />
          </Navbar.End>
        </Navbar>
      </Container>
    </div>
  );
}
