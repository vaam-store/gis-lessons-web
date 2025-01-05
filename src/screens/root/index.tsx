import AppFooter from '@comp/footer';
import GlobalSpinner from '@comp/global-spinner';
import AppNavBar from '@comp/navbar';
import { Outlet, useNavigation } from 'react-router-dom';

export default function RootScreen() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <main>
      <AppNavBar />
      {isNavigating && <GlobalSpinner />}
      <Outlet />
      <AppFooter />
    </main>
  );
}
