import { useEffect, useState, useCallback } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { destroySession, TOKENKEY } from '../../util/auth';

function Log() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    destroySession();
    window.location.reload();
  }, []);

  useEffect(() => {
    if (localStorage.getItem(TOKENKEY)) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, handleLogout]);

  if (isLoggedIn) {
    return (
      <div className="flex justify-end ">
        <button
          className="absolute m-1 p-1 inline-flex items-center whitespace-nowrap justify-center mb-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-lime-500 to-lime-500 group-hover:from-cyan-500 group-hover:to-primary hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          type="submit"
          onClick={handleLogout}
        >
          <FiLogOut className="text-xl" />
          <span className="">Logout</span>
        </button>
      </div>
    );
  }
}

export default Log;
