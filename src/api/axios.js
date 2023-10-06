import axios from 'axios';

export default axios.create({
  baseURL: 'https://car-rental-api-91yl.onrender.com/users/tokens/sign_in',
  REGISTER_URL: 'https://car-rental-api-91yl.onrender.com/api/v1/users',
  LOGIN_URL: 'https://car-rental-api-91yl.onrender.com/users/tokens/sign_in',
});
