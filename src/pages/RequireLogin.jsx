import { Link } from 'react-router-dom';

function RequireLogin() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">You need to be logged in to view this page</h1>
      <Link to="/LogIn" className="text-xl font-bold text-green-500">Log in</Link>
    </div>
  );
}

export default RequireLogin;
