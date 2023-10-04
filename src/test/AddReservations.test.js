import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import axios from 'axios';
import renderer from 'react-test-renderer';
import myReservations from './reservationsData';
import AddReservations from '../components/AddReservations';
import myCars from './carsData';

jest.mock('axios');

const reducer = (state = { reservations: { reservations: myReservations }, cars: { cars: myCars} }) => state;

const store = configureStore({ reducer });

describe('Should render correctly', () => {
  it('It should add Reservations', async () => {
    axios.get.mockResolvedValue({ data: myReservations });
    const tree = renderer
      .create(
        <Provider store={store}>
          <AddReservations />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
