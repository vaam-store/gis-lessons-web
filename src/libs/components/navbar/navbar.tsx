import { LoginButton } from '@comp/auth';
import { Container } from '@comp/container';
import ThemeToggle from '@comp/theme';
import { Button, Loading, Navbar } from 'react-daisyui';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import icon from '/icon.svg';

export default function AppNavBar() {
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
            <NavLink to='/school'>
              {({ isPending, isActive }) =>
                !isPending ? (
                  <Button
                    responsive
                    type='button'
                    className={twMerge([isActive && 'btn-secondary'])}>
                    Lessons
                  </Button>
                ) : (
                  <Loading />
                )
              }
            </NavLink>
            <ThemeToggle />
            <LoginButton />
          </Navbar.End>
        </Navbar>
      </Container>
    </div>
  );
}
