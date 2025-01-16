import { ModuleList } from '@comp/lecture-course/module-list.tsx';
import ThemeToggle from '@comp/theme';
import { Course } from '@openapi/requests';
import { useId } from 'react';
import { Button, Navbar } from 'react-daisyui';
import { ArrowLeft, Home, Menu } from 'react-feather';
import { NavLink, Outlet } from 'react-router-dom';
import icon from '/icon.svg';

interface CourseLayoutProps {
  data: Course;
}

export function CourseLayout({ data }: CourseLayoutProps) {
  const id = useId();
  return (
    <div className='drawer lg:drawer-open'>
      <input id={id} type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        <Navbar className='w-full bg-base-300 lg:hidden'>
          <Navbar.Start>
            <Button
              color='ghost'
              tag='label'
              htmlFor={id}
              className='drawer-button'>
              <Menu />
            </Button>

            <NavLink to='/'>
              {({ isPending, isTransitioning }) => (
                <Button
                  color='ghost'
                  shape='circle'
                  loading={isPending || isTransitioning}>
                  <img src={icon} className='w-8' alt='logo' />
                </Button>
              )}
            </NavLink>
          </Navbar.Start>
          <Navbar.End>
            <ThemeToggle responsive={false} />
          </Navbar.End>
        </Navbar>

        <Outlet />
      </div>

      <div className='drawer-side'>
        <label
          htmlFor={id}
          aria-label='close sidebar'
          className='drawer-overlay'
        />
        <div className='flex min-h-full w-80 flex-col bg-base-200 text-base-content'>
          <div className='flex justify-between px-2'>
            <NavLink to='/courses'>
              {({ isPending, isTransitioning }) => (
                <Button
                  color='ghost'
                  shape='circle'
                  loading={isPending || isTransitioning}>
                  <ArrowLeft />
                </Button>
              )}
            </NavLink>

            <div>
              <ThemeToggle responsive={false} />

              <NavLink to='/'>
                {({ isPending, isTransitioning }) => (
                  <Button
                    color='ghost'
                    shape='circle'
                    loading={isPending || isTransitioning}>
                    <img src={icon} className='w-8' alt='logo' />
                  </Button>
                )}
              </NavLink>
            </div>
          </div>

          <div className='divider my-0' />

          <NavLink
            to={`/lectures/${data.id}`}
            className='flex flex-row gap-4 px-4 py-2 hover:bg-base-300'>
            <Home />
            <h3>{data.name}</h3>
          </NavLink>

          <div className='divider my-0' />

          <div className='h-[calc(100vh-200px)] overflow-y-scroll px-4 py-2'>
            <div className='flex flex-col divide-y divide-solid'>
              <ModuleList courseId={data.id} />
            </div>
          </div>

          <div className='divider my-0' />
          <div>
            <NavLink to='/courses'>
              {({ isPending, isTransitioning }) => (
                <Button
                  color='ghost'
                  shape='circle'
                  loading={isPending || isTransitioning}>
                  <ArrowLeft />
                </Button>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
