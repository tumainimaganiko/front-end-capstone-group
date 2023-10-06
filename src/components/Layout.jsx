import { Outlet } from 'react-router-dom';
import NavigationPanel from './NavigationPanel';
import Log from './log/log';

const Layout = () => (
  <>
    <NavigationPanel />
    <Log />
    <Outlet />
  </>
);

export default Layout;
