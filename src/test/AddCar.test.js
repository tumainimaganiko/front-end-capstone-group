import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import AddCar from '../pages/AddCar';

it('Render a AddCar', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <MemoryRouter>
          <AddCar />
        </MemoryRouter>
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
