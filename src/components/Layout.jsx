import { Outlet } from 'react-router-dom';
import NavigationPanel from './NavigationPanel';
import Log from './log/log';

function Layout() {
  return (
    <>
      <NavigationPanel />
      <Log />
      <Outlet />
    </>
  );
}

export default Layout;
