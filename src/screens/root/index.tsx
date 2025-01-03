import { GlobalSpinner } from '@comp/global-spinner.tsx';
import AppNavBar from '@comp/root/navbar.tsx';
import { Outlet, useNavigation } from 'react-router-dom';

export default function RootScreen() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <main>
      <AppNavBar />
      {isNavigating && <GlobalSpinner />}
      <Outlet />
    </main>
  );
}
