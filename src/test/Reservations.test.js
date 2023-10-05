import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import axios from 'axios';
import renderer from 'react-test-renderer';
import myReservations from './reservationsData';
import Reservations from '../components/Reservations';

jest.mock('axios');

const reducer = (state = { reservations: { reservations: myReservations } }) => state;

const store = configureStore({ reducer });

describe('Should render correctly', () => {
  it('It should render Reservations', async () => {
    axios.get.mockResolvedValue({ data: myReservations });
    const tree = renderer
      .create(
        <Provider store={store}>
          <Reservations />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
