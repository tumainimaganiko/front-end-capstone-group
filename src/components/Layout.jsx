import { Outlet } from 'react-router-dom';
import NavigationPanel from './NavigationPanel';

function Layout() {
  return (
    <>
      <NavigationPanel />
      <Outlet />
    </>
  );
}

export default Layout;
