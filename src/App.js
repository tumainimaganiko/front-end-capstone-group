import {
  Route, Outlet, Routes,
} from 'react-router-dom';

import './App.css';
import NavigationPanel from './components/NavigationPanel';

function Layout() {
  return (
    <>
      <NavigationPanel />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div className="text-center">Welcome Car Rentals</div>} />
      </Route>
    </Routes>
  );
}

export default App;
