export const TOKENKEY = 'car-token';
export const USERKEY = 'car-user';

export const setToken = (token) => {
  localStorage.setItem(TOKENKEY, JSON.stringify(token));
};

export const setUser = (user) => {
  localStorage.setItem(USERKEY, JSON.stringify(user));
};

export const getToken = () => {
  const storedToken = localStorage.getItem(TOKENKEY);
  return storedToken ? JSON.parse(storedToken) : null;
};

export const getUser = () => {
  const storedUser = localStorage.getItem(USERKEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

export const storeSession = (user, token) => {
  setUser(user);
  setToken(token);
};

export const destroySession = () => {
  localStorage.removeItem(TOKENKEY);
  localStorage.removeItem(USERKEY);
};
