import ThemeToggle from '@comp/theme';
import { Loading, Navbar } from 'react-daisyui';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export default function AppNavBar() {
  return (
    <div className='sticky top-0 z-40 mb-4 bg-base-300'>
      <Navbar className='container mx-auto'>
        <Navbar.Start className='flex gap-4'>
          <NavLink to='/'>GIS Lessons</NavLink>
        </Navbar.Start>

        <Navbar.End className='flex gap-4'>
          <ThemeToggle />
          <NavLink to='/school'>
            {({ isPending, isActive }) =>
              !isPending ? (
                <span
                  className={twMerge('btn btn-outline', [
                    isActive && 'btn-secondary',
                  ])}>
                  Lessons
                </span>
              ) : (
                <Loading />
              )
            }
          </NavLink>
        </Navbar.End>
      </Navbar>
    </div>
  );
}
